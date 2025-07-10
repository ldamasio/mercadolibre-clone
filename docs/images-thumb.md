# Thumbnails Adaptivos - ProductGallery

## Algoritmo Central

O componente `ProductGallery` implementa dimensionamento adaptivo de thumbnails baseado na proporção das imagens. O algoritmo analisa as dimensões naturais de cada imagem e aplica regras de dimensionamento para manter a qualidade visual.

### Lógica de Dimensionamento

```typescript
const getImageStyle = (index: number) => {
  const dimensions = imageDimensions[index];
  if (!dimensions) {
    return { width: '54px', height: '54px' }; // Default durante carregamento
  }

  const isPortrait = dimensions.height > dimensions.width;
  
  if (isPortrait) {
    return { height: '54px', width: 'auto' }; // Imagens verticais
  } else {
    return { width: '54px', height: 'auto' }; // Imagens horizontais/quadradas
  }
};
```

### Regras de Aplicação

| Condição | Dimensão Fixa | Dimensão Automática | Resultado |
|----------|---------------|-------------------|-----------|
| `altura > largura` | `height: 54px` | `width: auto` | Preserva proporção vertical |
| `largura ≥ altura` | `width: 54px` | `height: auto` | Preserva proporção horizontal |
| Sem dimensões | `width: 54px` | `height: 54px` | Placeholder durante carregamento |

## Implementação

### Estruturas de Dados

```typescript
interface ImageDimensions {
  width: number;
  height: number;
}

const [imageDimensions, setImageDimensions] = useState<{ [key: number]: ImageDimensions }>({});
```

### Captura de Dimensões

```typescript
const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  setImageDimensions(prev => ({
    ...prev,
    [index]: {
      width: img.naturalWidth,
      height: img.naturalHeight
    }
  }));
};
```

### Aplicação no JSX

```typescript
<img
  src={`http://localhost:3000${image}`}
  alt={`${title} - ${index + 1}`}
  className="object-cover"
  style={getImageStyle(index)}
  onLoad={(e) => handleImageLoad(index, e)}
/>
```

## Arquivo Modificado

**Localização**: `frontend/src/components/product/ProductGallery.tsx`

**Componentes adicionados**:
- Interface `ImageDimensions`
- Estado `imageDimensions`
- Função `handleImageLoad`
- Função `getImageStyle`
- Event handler `onLoad`
- Layout container com `flex items-center justify-center`

## Comportamento

### Fluxo de Execução
1. Thumbnail é renderizada com dimensões padrão (54px × 54px)
2. Evento `onLoad` captura dimensões naturais da imagem
3. Estado `imageDimensions` é atualizado
4. Função `getImageStyle` recalcula dimensões baseadas na proporção
5. Thumbnail é re-renderizada com novas dimensões

### Casos de Uso
- **Imagem 800×1200px**: `height: 54px, width: 36px`
- **Imagem 1200×800px**: `width: 54px, height: 36px`
- **Imagem 1000×1000px**: `width: 54px, height: 54px`

## Características Técnicas

- **Performance**: Usa `naturalWidth/naturalHeight` sem processamento adicional
- **Estado**: Memoização por índice evita recálculos desnecessários
- **TypeScript**: Tipagem completa para dimensões e eventos
- **Layout**: Centralização automática com flexbox

## Testes Recomendados

- Teste unitário para `getImageStyle()` com diferentes proporções
- Teste de integração para o fluxo `onLoad → setState → re-render`
- Teste visual com imagens de proporções extremas
- Teste de performance com galeria de 20+ imagens 