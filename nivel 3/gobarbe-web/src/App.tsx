import React from 'react';
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import GlobalStyle from './styles/global';
import ToastContainer from './components/ToustContainer';
import { AutoProvider } from './hooks/AutoContext';

const App: React.FC = () => (
  <>
    <AutoProvider>
      <SignIn />
    </AutoProvider>
    <ToastContainer />
    <GlobalStyle />

  </>
)

export default App;
