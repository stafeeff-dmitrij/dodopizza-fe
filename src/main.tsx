import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { store } from './redux/store.ts';
import router from './router.tsx';

import './styles/styles.scss';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </Provider>
  </StrictMode>,
)
