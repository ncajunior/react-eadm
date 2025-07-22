# Mapa EADM - Estrutura Administrativa Municipal

Este projeto apresenta um mapa interativo da estrutura administrativa da Prefeitura de Águia Branca - ES, com popups em Material Design.

## 📋 Características

- **Interface Material Design**: Popups modernos e elegantes seguindo as diretrizes do Google Material Design
- **Mapa Interativo**: Visualização de todos os pontos da estrutura administrativa municipal
- **Layers Organizadas**: Pontos agrupados por secretaria com cores distintas
- **Tooltips Informativos**: Informações rápidas ao passar o mouse sobre os marcadores
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Indicador de Carregamento**: Feedback visual durante o carregamento dos dados
- **Tratamento de Erros**: Mensagens claras em caso de problemas

## 🚀 Como usar

1. **Abra o arquivo `index.html` em um navegador web**
   - O arquivo funciona diretamente no navegador (não requer servidor web)
   - Os dados GeoJSON estão incorporados no HTML para evitar problemas de CORS

2. **Navegue pelo mapa:**
   - Clique nos marcadores para ver informações detalhadas
   - Use os controles de layer no canto superior direito para filtrar por secretaria
   - Passe o mouse sobre os marcadores para ver tooltips rápidos

## 🔧 Resolução de Problemas

### Problema de CORS
**Solucionado**: Os dados GeoJSON foram incorporados diretamente no HTML, eliminando a necessidade de carregar arquivos externos e evitando problemas de CORS.

## 🎨 Recursos do Popup

Cada popup contém:

- **Cabeçalho com gradiente**: Nome e código do departamento
- **Informações organizacionais**: Secretaria e departamento
- **Imagem (quando disponível)**: Foto do local ou equipamento
- **Estatísticas**: Número de departamentos, locais e funcionários
- **Animações suaves**: Transições e efeitos visuais

## 🎨 Cores por Secretaria

- 🔴 **Prefeitura Municipal**: Vermelho (#f44336)
- 🌸 **Gabinete do Prefeito**: Rosa (#e91e63)
- 🟣 **Administração**: Roxo (#9c27b0)
- 🟪 **Assistência Social**: Roxo Escuro (#673ab7)
- 🔵 **Desenvolvimento Rural**: Azul Escuro (#3f51b5)
- 🔷 **Educação, Cultura, Esportes e Lazer**: Azul (#2196f3)
- 🔵 **Finanças**: Azul Claro (#03a9f4)
- 🟢 **Meio Ambiente**: Verde (#4caf50)
- 🟠 **Obras e Serviços Urbanos**: Laranja (#ff9800)
- 🔴 **Saúde**: Vermelho (#f44336)
- 🟤 **UG F.M. Saúde**: Marrom (#795548)

## 📱 Recursos Responsivos

- **Desktop**: Layout completo com sidebar de layers expandida
- **Tablet**: Ajustes de tamanho e espaçamento
- **Mobile**: Popups otimizados e controles adaptados

## 🛠️ Tecnologias Utilizadas

- **Leaflet.js**: Biblioteca para mapas interativos
- **Material Design Components**: Framework de design do Google
- **OpenStreetMap**: Tiles de mapa gratuitos
- **CSS3**: Animações e efeitos visuais
- **JavaScript ES6+**: Funcionalidades modernas

## 📊 Dados

O arquivo `EADMTERMO.geojson` contém 59 pontos representando:
- Prefeitura e secretarias
- Escolas e unidades de saúde
- Departamentos e órgãos municipais
- Equipamentos públicos

Cada ponto inclui:
- Coordenadas geográficas
- Código identificador
- Descrição completa
- Secretaria responsável
- Departamento
- Imagem (quando disponível)
- Estatísticas de estrutura

## 🎯 Funcionalidades Avançadas

### Interatividade
- **Hover Effects**: Marcadores aumentam ao passar o mouse
- **Tooltips**: Informações rápidas sem abrir popup
- **Animações**: Transições suaves em todos os elementos

### Visual
- **Gradientes**: Efeitos visuais modernos
- **Shadows**: Profundidade e hierarquia visual
- **Icons**: Ícones Material Design contextuais

### Usabilidade
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Tratamento de erros com retry
- **Accessibility**: Foco e navegação por teclado

## 🔧 Personalização

Para personalizar o projeto:

1. **Cores**: Edite as variáveis CSS em `material-styles.css`
2. **Ícones**: Substitua os ícones Material Design no HTML
3. **Dados**: Substitua o arquivo GeoJSON por seus próprios dados
4. **Estilos**: Modifique os estilos CSS conforme necessário

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todos os arquivos estão na mesma pasta
2. Certifique-se de que está acessando via servidor web (não file://)
3. Verifique o console do navegador para erros
4. Confirme que o arquivo GeoJSON está válido

## 📄 Licença

Este projeto é de uso livre para fins educacionais e governamentais.

---

Desenvolvido com ❤️ usando Material Design e tecnologias web modernas.
