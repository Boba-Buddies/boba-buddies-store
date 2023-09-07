import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Auth0Provider } from '@auth0/auth0-react'

import AppLayout from './user/components/AppLayout/AppLayout'
import Cart from './user/pages/Cart/Cart'
import UnprotectedComponent from './UI/UnprotectedComponent'
import {
  ErrorPage,
  Home,
  Shop,
  ProductPage,
  ThankYou,
  Contact,
  Checkout,
  Profile,
  EditProfile,
  Wishlist,
} from './user/pages/index'
import { Reviews, Dashboard } from './admin/pages/'
import Redirect from './user/pages/Redirect/Redirect'
import { Orders } from './admin/pages/Orders/Orders'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
    <Route index element={<UnprotectedComponent component={Home} />} />
    <Route path="cart" element={<UnprotectedComponent component={Cart} />} />
    <Route path="shop" element={<UnprotectedComponent component={Shop} />} />
    <Route
      path="redirect"
      element={<UnprotectedComponent component={Redirect} />}
    />

    <Route
      path="shop/:id"
      element={<UnprotectedComponent component={ProductPage} />}
    />
    <Route
      path="thankyou"
      element={<UnprotectedComponent component={ThankYou} />}
    />
    <Route
      path="contact"
      element={<UnprotectedComponent component={Contact} />}
    />
    <Route
      path="checkout"
      element={<UnprotectedComponent component={Checkout} />}
    />
    <Route
      path="profile"
      element={<UnprotectedComponent component={Profile} />}
    />
    <Route
      path="edit"
      element={<UnprotectedComponent component={EditProfile} />}
    />
    <Route
      path="wishlist"
      element={<UnprotectedComponent component={Wishlist} />}
    />
    <Route
      path="admin/reviews"
      element={<UnprotectedComponent component={Reviews} />}
    />
    <Route
      path="admin"
      element={<UnprotectedComponent component={Dashboard} />}
    />

    <Route
      path="admin/orders"
      element={<UnprotectedComponent component={Orders} />}
    />
  </Route>,
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
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      cacheLocation="localstorage"
      authorizationParams={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
