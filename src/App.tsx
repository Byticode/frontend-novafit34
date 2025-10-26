import { BrowserRouter } from 'react-router-dom';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { AppRoutes } from './routes/routes';

const convex = new ConvexReactClient(import.meta.env['VITE_CONVEX_URL']!);

function App() {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}

export default App;
