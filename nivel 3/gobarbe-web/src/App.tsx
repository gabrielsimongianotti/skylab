import React from 'react';
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import GlobalStyle from './styles/global';
import { AutoProvider } from './context/AutoContext';

const App: React.FC = () => (
  <>
    <AutoProvider>
      <SignIn />
    </AutoProvider>
    <GlobalStyle />

  </>
)

export default App;
