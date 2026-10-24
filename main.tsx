import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupServiceWorker } from './registerServiceWorker';

// Register service worker and warmup browser Cache Storage
setupServiceWorker();

createRoot(document.getElementById('root')!).render(<App />);

