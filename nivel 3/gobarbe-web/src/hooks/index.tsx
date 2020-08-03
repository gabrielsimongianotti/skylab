import React from 'react';

import { AutoProvider } from './auto';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AutoProvider>
    <ToastProvider>{children}</ToastProvider>
  </AutoProvider>
);

export default AppProvider
