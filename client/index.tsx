import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Auth0Provider } from '@auth0/auth0-react'

import AppLayout from './components/AppLayout/AppLayout'
import ProtectedComponent from './components/UI/ProtectedComponent'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Cart from './user/pages/Cart/Cart'
import Shop from './pages/Shop/Shop'
import ThankYouPage from './pages/ThankYouPage/ThankYouPage'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import ErrorPage from './pages/ErrorPage/ErrorPage'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
    <Route index element={<ProtectedComponent component={Home} />} />
    <Route path="about" element={<ProtectedComponent component={About} />} />
    <Route path="cart" element={<ProtectedComponent component={Cart} />} />
    <Route path="shop" element={<ProtectedComponent component={Shop} />} />
    <Route
      path="shop/:id"
      element={<ProtectedComponent component={Product} />}
    />
    <Route
      path="thankyoupage"
      element={<ProtectedComponent component={ThankYouPage} />}
    />
    <Route
      path="contact"
      element={<ProtectedComponent component={Contact} />}
    />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient()
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      domain="daniel-g.au.auth0.com"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientId="aIGYkqO3IqkivZ75hgkU5kk7DTvBjjuL"
      cacheLocation="localstorage"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audience="https://bnanas/api"
      redirectUri={window.location.origin + '/'}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})