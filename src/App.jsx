import StorePage from './pages/StorePage';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StorePage />
    </ThemeProvider>
  );
}

export default App;
