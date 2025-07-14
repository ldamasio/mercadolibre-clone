Resumo das Mudanças

Para resolver o conflito entre Ingress tradicional e Gateway API:

Removido: O arquivo ingress.yaml não é mais necessário e foi removido do kustomization
Atualizado: Gateway API com configuração completa de TLS via cert-manager
Adicionado: Certificates gerenciados pelo cert-manager no namespace istio-system
Implementado: HTTPRoute com suporte nativo para blue-green deployment
Criado: ReferenceGrant para permitir cross-namespace references
Documentado: Guia completo sobre Gateway API vs Ingress

Vantagens desta abordagem:
- Sem conflitos: Apenas um sistema de ingress (Gateway API)
- Mais poderoso: Traffic splitting, header manipulation, etc.
- Integração nativa: Melhor integração com Istio
- Standards-based: Seguindo a direção futura do Kubernetes
- Blue-Green nativo: Sem necessidade de workarounds

O que precisa ser feito no cluster:
￼
bash
# 1. Aplicar os manifestos do Istio com Gateway API
kubectl apply -k k8s/istio/

# 2. Verificar se o Gateway está funcionando
kubectl get gateways -n istio-system
kubectl get httproutes -n mercadolibre

# 3. Verificar certificados
kubectl get certificates -n istio-system

Agora o projeto está usando exclusivamente Gateway API, eliminando qualquer conflito com o Ingress tradicional e aproveitando todos os recursos avançados do Istio!