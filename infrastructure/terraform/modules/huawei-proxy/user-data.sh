#!/bin/bash
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y nginx certbot python3-certbot-nginx ufw fail2ban

# Configure firewall
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

# Configure Nginx as reverse proxy
cat > /etc/nginx/sites-available/mercadolibre <<EOF
upstream backend_servers {
    least_conn;
%{ for ip in backend_ips ~}
    server ${ip}:443 max_fails=3 fail_timeout=30s;
%{ endfor ~}
}

# Rate limiting
limit_req_zone \$binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone \$binary_remote_addr zone=api:10m rate=30r/s;

# Backend API
server {
    listen 80;
    server_name backend.${domain_name};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name backend.${domain_name};
    
    # SSL will be configured by certbot
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Rate limiting for API
    limit_req zone=api burst=50 nodelay;
    
    location / {
        proxy_pass https://backend_servers;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
        
        # Health check endpoint pass-through
        location /health {
            proxy_pass https://backend_servers/health;
            access_log off;
        }
    }
}

# Frontend
server {
    listen 80;
    server_name ${domain_name};
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name ${domain_name};
    
    # SSL will be configured by certbot
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Rate limiting
    limit_req zone=general burst=20 nodelay;
    
    location / {
        proxy_pass https://backend_servers;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/mercadolibre /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx

# Configure fail2ban
cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
action = iptables-multiport[name=ReqLimit, port="http,https"]
logpath = /var/log/nginx/error.log
EOF

systemctl restart fail2ban

# Setup certbot (will need manual DNS validation or HTTP challenge)
# certbot --nginx -d ${domain_name} -d backend.${domain_name} --non-interactive --agree-tos -m admin@${domain_name}

echo "Proxy setup completed!"
