# RBAC (Role-Based Access Control) - MercadoLibre Clone

## Visão Geral

Este documento descreve a implementação de RBAC no cluster Kubernetes do MercadoLibre Clone, garantindo o princípio do menor privilégio e segregação de responsabilidades.

## Arquitetura de Segurança

### 1. ServiceAccounts

| ServiceAccount | Namespace | Propósito |
|---------------|-----------|-----------|
| `backend-sa` | mercadolibre | Execução do backend com permissões mínimas |
| `frontend-sa` | mercadolibre | Execução do frontend com permissões ainda mais restritas |
| `cicd-sa` | mercadolibre | Deploy de aplicações via CI/CD |
| `developer-sa` | mercadolibre | Acesso de desenvolvimento com debug |
| `monitoring-sa` | mercadolibre | Coleta de métricas e observabilidade |
| `argocd-manager` | argocd | GitOps e sincronização de aplicações |

### 2. Roles e Permissões

#### Backend Role
```yaml
- ConfigMaps: get, list, watch
- Secrets: get (apenas leitura)
- Pods/Services/Endpoints: get, list, watch (service discovery)
```

#### Frontend Role
```yaml
- ConfigMaps: get (apenas específicos)
```

#### CI/CD Role
```yaml
- Deployments: full management
- Services: update, patch
- ConfigMaps/Secrets: create, update
- Pods: view logs
```

#### Developer Role
```yaml
- All resources: read-only
- Pods: port-forward, exec, logs
```

### 3. Network Policies

- **Isolamento padrão**: Todo tráfego é negado por padrão
- **Frontend → Backend**: Permitido na porta 8080
- **Ingress → Frontend**: Permitido na porta 3000
- **Egress**: DNS permitido, metadados bloqueados

### 4. Pod Security

#### Pod Security Standards (PSS)
- Namespace enforça política `restricted`
- Containers executam como non-root (UID 1000)
- Root filesystem é read-only
- Todas as capabilities são removidas

#### Security Context
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop:
    - ALL
```

### 5. Istio Security

#### mTLS
- Modo STRICT enforçado no namespace
- Comunicação encriptada entre todos os serviços

#### Authorization Policies
- Deny all por padrão
- Whitelist específico por serviço
- JWT validation para APIs públicas

## Gestão de Acesso

### Criar Kubeconfig para Usuário

```bash
# Para desenvolvedor
./scripts/create-kubeconfig.sh developer ./kubeconfigs

# Para CI/CD
./scripts/create-kubeconfig.sh cicd ./kubeconfigs

# Para monitoramento
./scripts/create-kubeconfig.sh monitoring ./kubeconfigs
```

### Usar Kubeconfig

```bash
export KUBECONFIG=./kubeconfigs/kubeconfig-developer.yaml
kubectl get pods -n mercadolibre
```

## Auditoria e Compliance

### 1. Audit Logging

Todos os acessos à API são logados:
- Quem acessou
- O que foi acessado
- Quando foi acessado
- Resultado da operação

### 2. Compliance Checks

- [ ] Principle of Least Privilege
- [ ] Separation of Duties
- [ ] Defense in Depth
- [ ] Zero Trust Network
- [ ] Audit Trail

### 3. Emergency Access

Para situações de emergência, existe o `emergency-admin` ClusterRole:
- **NÃO** tem RoleBinding por padrão
- Deve ser criado manualmente quando necessário
- Deve ser removido imediatamente após uso
- Todas as ações são auditadas

```bash
# Criar acesso emergencial (USE COM EXTREMA CAUTELA)
kubectl create rolebinding emergency-access \
  --clusterrole=emergency-admin \
  --user=emergency@company.com \
  -n mercadolibre

# Remover após uso
kubectl delete rolebinding emergency-access -n mercadolibre
```

## Melhores Práticas

1. **Nunca compartilhe ServiceAccount tokens**
2. **Rotacione tokens regularmente**
3. **Use kubeconfig específico por função**
4. **Monitore logs de auditoria**
5. **Revise permissões periodicamente**
6. **Implemente MFA para acesso ao cluster**
7. **Use namespaces para isolamento**
8. **Aplique Network Policies**
9. **Enforce Pod Security Standards**
10. **Mantenha RBAC simples e auditável**

## Troubleshooting

### Verificar Permissões

```bash
# Verificar se pode executar ação
kubectl auth can-i create pods -n mercadolibre

# Verificar todas as permissões
kubectl auth can-i --list -n mercadolibre

# Verificar como outro ServiceAccount
kubectl auth can-i --as=system:serviceaccount:mercadolibre:developer-sa get pods
```

### Problemas Comuns

1. **403 Forbidden**
   - Verifique ServiceAccount
   - Verifique RoleBinding
   - Verifique namespace

2. **Pod não inicia**
   - Verifique SecurityContext
   - Verifique PSP/PSS
   - Verifique ServiceAccount

3. **Sem conectividade**
   - Verifique NetworkPolicy
   - Verifique Istio AuthorizationPolicy
   - Verifique mTLS

## Matriz de Responsabilidades

| Ação | Dev | CI/CD | SRE | Security |
|------|-----|-------|-----|----------|
| View pods | ✓ | ✓ | ✓ | ✓ |
| Deploy app | ✗ | ✓ | ✓ | ✗ |
| Modify RBAC | ✗ | ✗ | ✗ | ✓ |
| Emergency access | ✗ | ✗ | ✓ | ✓ |
| Audit logs | ✗ | ✗ | ✓ | ✓ |

## Referências

- [Kubernetes RBAC Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [Istio Security](https://istio.io/latest/docs/concepts/security/)
- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
