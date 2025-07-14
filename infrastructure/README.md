# Infrastructure as Code - MercadoLibre Clone

Este diretório contém toda a infraestrutura como código (IaC) e configurações de deployment para o projeto MercadoLibre Clone.

## 📋 Visão Geral da Arquitetura

### Componentes Principais

1. **Contabo VPS Cluster (5 máquinas)**
   - 3 Master nodes (VPS-L: 8 vCPU, 30GB RAM)
   - 2 Worker nodes (VPS-M: 6 vCPU, 16GB RAM)
   - MicroK8s como distribuição Kubernetes

2. **Huawei Cloud Proxy Layer**
   - 2 instâncias ECS com Nginx
   - Load balancing e SSL termination
   - Ocultação do cluster real

3. **Kubernetes Stack**
   - **Istio Service Mesh** (Ambient Mode)
   - **ArgoCD** para GitOps
   - **Cert-Manager** para certificados SSL
   - **Traefik** como Ingress Controller alternativo

4. **CI/CD Pipeline**
   - GitHub Actions
   - Docker Hub como registry
   - Deploy Blue-Green com zero downtime

## 🚀 Quick Start

### Pré-requisitos

- Terraform >= 1.0
- kubectl
- Helm
- Conta Contabo
- Conta Huawei Cloud
- Docker Hub account
- Domínio configurado

### 1. Configurar Terraform

```bash
cd infrastructure/terraform/environments/prod
cp terraform.tfvars.example terraform.tfvars
# Edite terraform.tfvars com suas credenciais
```

### 2. Provisionar Infraestrutura

```bash
# Inicializar Terraform
terraform init

# Planejar mudanças
terraform plan

# Aplicar infraestrutura
terraform apply
```

### 3. Configurar Cluster MicroK8s

```bash
# Usar o inventário gerado pelo Terraform
cd infrastructure/ansible
ansible-playbook -i inventories/prod/hosts.yml playbooks/setup-microk8s.yml
```

### 4. Instalar Componentes do Kubernetes

```bash
# Instalar Istio (Ambient Mode)
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
./bin/istioctl install --set profile=ambient

# Instalar Cert-Manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Instalar ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Aplicar configurações
kubectl apply -k k8s/overlays/prod
```

### 5. Configurar ArgoCD

```bash
# Port forward para acessar ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Obter senha inicial
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Login via CLI
argocd login localhost:8080

# Adicionar aplicações
kubectl apply -f k8s/argocd/projects/
kubectl apply -f k8s/argocd/applications/
```

## 📁 Estrutura de Diretórios

```
infrastructure/
├── terraform/
│   ├── environments/       # Configurações por ambiente
│   │   ├── dev/
│   │   └── prod/
│   └── modules/           # Módulos reutilizáveis
│       ├── contabo-vps/
│       ├── huawei-proxy/
│       └── microk8s-cluster/
│
└── ansible/               # Configuração dos servidores
    ├── inventories/
    ├── playbooks/
    └── roles/
```

## 🔧 Configurações

### Domínios

- Frontend: `merli.leandrodamasio.com`
- Backend API: `backend.merli.leandrodamasio.com`

### Portas

- HTTP: 80 (redirect para HTTPS)
- HTTPS: 443
- Kubernetes API: 6443
- Istio Gateway: 15021
- ArgoCD: 8080

## 🚦 Deploy Blue-Green

O deploy blue-green é automatizado via script:

```bash
# Deploy manual
./scripts/blue-green-deploy.sh

# Via GitHub Actions (automático no push para main)
# O workflow cd-deploy.yaml cuida disso
```

### Como funciona:

1. Identifica versão ativa (blue/green)
2. Deploy da nova versão na inativa
3. Testes de saúde
4. Switch do tráfego
5. Scale down da versão antiga

## 🔐 Segurança

### SSL/TLS

- Certificados gerenciados pelo Cert-Manager
- Let's Encrypt como CA
- Auto-renovação a cada 90 dias

### Network Policies

- Istio controla tráfego entre serviços
- Deny all por padrão
- Whitelist específico por serviço

### Secrets Management

- Secrets do Kubernetes
- Rotação manual (pode ser automatizada com Sealed Secrets)

## 📊 Monitoramento

### Métricas

- Prometheus (via Istio)
- Grafana dashboards

### Logs

- Fluentd para coleta
- ElasticSearch para armazenamento
- Kibana para visualização

## 🛠️ Manutenção

### Backup

```bash
# Backup do etcd (estado do cluster)
microk8s kubectl get all --all-namespaces -o yaml > backup.yaml
```

### Updates

```bash
# Update MicroK8s
sudo snap refresh microk8s

# Update Istio
istioctl upgrade
```

### Troubleshooting

```bash
# Verificar status do cluster
microk8s status

# Logs do Istio
kubectl logs -n istio-system deployment/istiod

# Verificar certificados
kubectl get certificates -A

# Status do ArgoCD
argocd app list
argocd app get <app-name>
```

## 📝 Variáveis de Ambiente Necessárias

### GitHub Secrets

```yaml
DOCKER_USERNAME: seu-usuario-dockerhub
DOCKER_PASSWORD: sua-senha-dockerhub
CONTABO_CLIENT_ID: client-id-da-api-contabo
CONTABO_CLIENT_SECRET: client-secret-da-api-contabo
HUAWEI_ACCESS_KEY: access-key-huawei
HUAWEI_SECRET_KEY: secret-key-huawei
HUAWEI_IMAGE_ID: id-da-imagem-ubuntu-22.04
HUAWEI_KEY_PAIR_NAME: nome-do-keypair
SSH_PUBLIC_KEY: sua-chave-ssh-publica
ARGOCD_SERVER: servidor-argocd
ARGOCD_AUTH_TOKEN: token-de-autenticacao
SLACK_WEBHOOK_URL: webhook-do-slack (opcional)
```

## 🔄 Workflow de Deploy

1. **Developer** faz push para `main`
2. **GitHub Actions** roda testes e build
3. **Docker images** são enviadas para Docker Hub
4. **ArgoCD** detecta mudanças e sincroniza
5. **Blue-Green deployment** é executado
6. **Health checks** validam o deploy
7. **Rollback automático** em caso de falha

## 📚 Documentação Adicional

- [Arquitetura detalhada](../docs/ARCHITECTURE.md)
- [Guia de troubleshooting](../docs/TROUBLESHOOTING.md)
- [Runbook de produção](../docs/RUNBOOK.md)

## 🤝 Contribuindo

1. Crie uma branch feature
2. Faça suas alterações
3. Teste localmente
4. Abra um Pull Request
5. Aguarde aprovação e merge

## ⚠️ Notas Importantes

1. **Custos**: Monitore os custos de infraestrutura
2. **Segurança**: Mantenha credenciais seguras
3. **Backup**: Configure backups automáticos
4. **Monitoramento**: Configure alertas para problemas
5. **Documentação**: Mantenha este README atualizado
