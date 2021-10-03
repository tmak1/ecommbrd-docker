import { BrowserRouter as Router } from 'react-router-dom';

import MainFooter from './components/shared/navigation/MainFooter';
import MainHeader from './components/shared/navigation/MainHeader';
import MainLayout from './components/shared/ui/MainLayout';

import Routes from './Routes';

import MuiThemeProvider from './MuiThemeProvider';
import ProductMetaDataContextProvider from './components/shared/contexts/ProductMetaDataContextProvider';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Router>
          <ProductMetaDataContextProvider>
            <MainHeader />
            <MainLayout>
              <Routes />
            </MainLayout>
            <MainFooter />
          </ProductMetaDataContextProvider>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
