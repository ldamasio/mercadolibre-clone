# Gateway API vs Ingress - MercadoLibre Clone

## Por que Gateway API?

Este projeto usa **Gateway API** em vez do Ingress tradicional pelos seguintes motivos:

### 1. Recursos Avançados

**Gateway API oferece:**
- Traffic splitting nativo (essencial para blue-green)
- Header-based routing
- Request/Response transformations
- Melhor integração com service mesh (Istio)
- Configuração mais expressiva e type-safe

**Ingress tradicional:**
- Limitado a roteamento básico
- Depende de annotations específicas do controller
- Não suporta traffic splitting nativo

### 2. Arquitetura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│Gateway (Istio)│────▶│  HTTPRoute │
└─────────────┘     └──────────────┘     └─────────────┘
                            │                      │
                            ▼                      ▼
                    ┌───────────────┐     ┌──────────────┐
                    │  Certificates │     │   Services   │
                    └───────────────┘     └──────────────┘
```

### 3. Configuração Blue-Green

Com Gateway API, o blue-green deployment é nativo:

```yaml
backendRefs:
- name: backend
  port: 8080
  weight: 100  # Blue (stable)
- name: backend-green
  port: 8080
  weight: 0    # Green (new version)
```

### 4. Migração do Ingress

Se você tinha um Ingress assim:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        backend:
          service:
            name: my-service
            port: 80
```

Com Gateway API fica:

```yaml
# Gateway
apiVersion: gateway.networking.k8s.io/v1beta1
kind: Gateway
metadata:
  name: my-gateway
spec:
  gatewayClassName: istio
  listeners:
  - name: https
    hostname: example.com
    port: 443
    protocol: HTTPS
    tls:
      certificateRefs:
      - name: my-cert

# HTTPRoute
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: my-route
spec:
  parentRefs:
  - name: my-gateway
  hostnames:
  - example.com
  rules:
  - backendRefs:
    - name: my-service
      port: 80
```

### 5. Comandos Úteis

```bash
# Verificar Gateways
kubectl get gateways -A

# Verificar HTTPRoutes
kubectl get httproutes -A

# Ver status do Gateway
kubectl describe gateway mercadolibre-gateway -n istio-system

# Troubleshooting de rotas
kubectl get httproute -n mercadolibre -o yaml

# Verificar certificados
kubectl get certificates -n istio-system

# Logs do Istio Gateway
kubectl logs -n istio-system deployment/istio-ingressgateway
```

### 6. Vantagens para este Projeto

1. **Blue-Green Native**: Traffic splitting sem gambiarras
2. **Observabilidade**: Métricas detalhadas via Istio
3. **Segurança**: mTLS e políticas avançadas
4. **Flexibilidade**: Fácil adicionar canary, A/B testing
5. **Standards**: Seguindo a evolução do Kubernetes

### 7. Troubleshooting

**Problema: Gateway não está aceitando tráfego**
```bash
# Verificar se o Gateway está programado
kubectl get gateway -n istio-system mercadolibre-gateway -o jsonpath='{.status.conditions}'

# Verificar listeners
kubectl get gateway -n istio-system mercadolibre-gateway -o jsonpath='{.status.listeners}'
```

**Problema: Certificado não está sendo gerado**
```bash
# Verificar Certificate
kubectl describe certificate -n istio-system frontend-tls-cert

# Verificar challenges do cert-manager
kubectl get challenges -A
```

**Problema: HTTPRoute não está funcionando**
```bash
# Verificar status da rota
kubectl describe httproute -n mercadolibre frontend-route

# Verificar se o parent Gateway aceita a rota
kubectl get httproute -n mercadolibre frontend-route -o jsonpath='{.status.parents}'
```

## Conclusão

Gateway API é o futuro do ingress no Kubernetes e já está maduro o suficiente para produção, especialmente quando usado com Istio. Para este projeto, oferece todas as funcionalidades necessárias de forma nativa e padronizada.
