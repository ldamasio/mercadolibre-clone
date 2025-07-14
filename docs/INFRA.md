## Resumo da Implementação

Criei uma infraestrutura completa, robusta e automatizada, com os seguintes componentes-chave:

---

### **1. Estrutura do Projeto**

* **`k8s/` (Kubernetes Manifests):**
    * Deployments **Blue-Green** para **backend** e **frontend**.
    * Services, Ingress com TLS via **cert-manager**.
    * Configurações do Istio (**Gateway API, VirtualServices, DestinationRules**).
    * Aplicações ArgoCD para **GitOps**.

* **`infrastructure/terraform/` (Terraform):**
    * Módulos para provisionamento de Contabo **VPS** (5 máquinas para cluster MicroK8s).
    * Módulo para Huawei Cloud para a **camada de proxy**.
    * Configuração de produção com outputs para **DNS**.

* **`.github/workflows/` (CI/CD Pipelines):**
    * CI para **backend** (Go) com testes e cobertura acima de **80%**.
    * CI para **frontend** (Next.js) com build e testes.
    * CD com deploy **Blue-Green automatizado**.
    * Pipeline Terraform para **IaC** (Infraestrutura como Código).

* **Scripts de Automação:**
    * Script de deploy **Blue-Green** com zero downtime.
    * **Health checks** e **rollback automático**.
    * Integração com Istio para gestão de tráfego.

* **`infrastructure/ansible/` (Ansible):**
    * Playbook para **setup completo do MicroK8s**.
    * Instalação de **Istio, ArgoCD, cert-manager**.
    * Configuração do cluster **multi-node**.

---

### **2. Características Principais**

* **Alta Disponibilidade:**
    * Cluster com **3 master nodes** e **2 worker nodes**.
    * Camada de proxy na Huawei Cloud para ocultar o cluster.
    * Deployments **Blue-Green** para zero downtime.

* **Segurança:**
    * TLS/SSL com **cert-manager** e **Let's Encrypt**.
    * Istio service mesh para segurança entre serviços.
    * Gerenciamento de secrets no Kubernetes.

* **GitOps:**
    * **ArgoCD** para continuous deployment.
    * Versionamento de imagens (sem o uso de `latest`).
    * **Rollback automático** em caso de falha.

* **Observabilidade:**
    * **Health checks** em todos os serviços.
    * Métricas via **Istio** e **Prometheus**.
    * Logs centralizados.

* **Escalabilidade:**
    * **Horizontal Pod Autoscaler** configurável.
    * Load balancing via **Istio**.
    * Cache e otimizações de performance.

---

### **3. Como Usar**

Para começar, siga estes passos:

1.  Configure as credenciais no GitHub Secrets.
2.  Execute o Terraform para provisionar a infraestrutura.
3.  Use o Ansible para configurar o cluster.
4.  Realize um `push` para a branch `main` para acionar o pipeline completo.