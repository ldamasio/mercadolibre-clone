all:
  children:
    masters:
      hosts:
%{ for node in master_nodes ~}
        ${node.name}:
          ansible_host: ${node.ip_address}
          ansible_user: root
          node_role: master
          private_ip: ${node.private_ip}
%{ endfor ~}
    workers:
      hosts:
%{ for node in worker_nodes ~}
        ${node.name}:
          ansible_host: ${node.ip_address}
          ansible_user: root
          node_role: worker
          private_ip: ${node.private_ip}
%{ endfor ~}
    proxies:
      hosts:
%{ for idx, ip in proxy_nodes ~}
        proxy-${idx + 1}:
          ansible_host: ${ip}
          ansible_user: ubuntu
          node_role: proxy
%{ endfor ~}
  vars:
    ansible_ssh_common_args: '-o StrictHostKeyChecking=no'
    ansible_python_interpreter: /usr/bin/python3
    cluster_name: mercadolibre-cluster
    cluster_domain: cluster.local

