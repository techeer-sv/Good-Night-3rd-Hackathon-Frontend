import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WishTreePage from './page/WishTreePage.tsx';
import WishAddPage from './page/WishAddPage.tsx';
import WishGetPage from './page/WishGetPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <WishTreePage></WishTreePage> */}
    {/* <WishAddPage></WishAddPage> */}
    <WishGetPage></WishGetPage>
  </StrictMode>,
);
