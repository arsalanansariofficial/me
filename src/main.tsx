import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/globals.css';
import Home from '@/components/home';
import QueryProvider from '@/components/query-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Home />
    </QueryProvider>
  </StrictMode>
);
