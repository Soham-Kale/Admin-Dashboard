import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,} from 'react-router-dom'
import { Provider } from 'react-redux'
// import App from './App.tsx'
// import HomeScreeen from './apps/customer/pages/HomeScreeen.tsx'
// import ProductScreen from './apps/customer/pages/ProductScreen.tsx'
// import CartScreen from './apps/customer/pages/CartScreen.tsx' 
// import LoginScreen from './apps/customer/pages/LoginScreen.tsx'
// import RegisterScreen from './apps/customer/pages/RegisterScreen.tsx'
// import ShippingScreen from './apps/customer/pages/ShippingScreen.tsx'
// import PlaceOrderScreen from './apps/customer/pages/PlaceOrderScreen.tsx'
import store from './core/store/store.ts'
import PrivateRoute from './apps/customer/routes/PrivateRoute/PrivateRoute.tsx'
import PaymentScreen from './apps/customer/pages/PaymentScreen.tsx'
import OrderScreen from './apps/customer/pages/OrderScreen.tsx';
import AdminRoute from './apps/admin/routes/AdminRoute.tsx'
import OrderListScreen from './apps/admin/pages/OrderListScreen.tsx'
import ProductListScreen from './apps/admin/pages/ProductListScreen.tsx'
import ProductEditScreen from './apps/admin/pages/ProductEditScreen.tsx'
import OrderStatus from './apps/customer/pages/OrderStatus.tsx'
import AccountScreen from './apps/customer/pages/AccountScreen.tsx'
import ProfileScreen from './apps/customer/pages/ProfileScreen.tsx'
import CustomerSupportScreen from './apps/customer/pages/CustomerSupportScreen.tsx'
import AddressScreen from './apps/customer/pages/AddressScreen.tsx'
import Orders from './apps/customer/components/Orders/Orders.tsx'
import Dashboard from './apps/admin/components/Dashboard/Dashboard.tsx'
import CustomerManagement from './apps/admin/pages/CustomerManagement.tsx'
import DeliveryLocation from './apps/admin/pages/DeliveryLocation.tsx'
import Reports from './apps/admin/pages/Reports.tsx'
import Setting from './apps/admin/pages/Setting.tsx'
import AddProductPage from './apps/customer/pages/AddProductPage.tsx'
import CustomerDetails from './apps/admin/pages/CustomerDetails.tsx'
import posthog from 'posthog-js';
import {PostHogProvider} from 'posthog-js/react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <> 
    {/* <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomeScreeen/>}/>
        <Route  path='/product/:id' element={<ProductScreen _id={''} name={''} image={''} price={0} qty={0} countInStock={0} category={''}/>}/>
        <Route  path='/cart' element={<CartScreen/>}/>
        <Route  path='/login' element={<LoginScreen/>}/>
        <Route  path='/register' element={<RegisterScreen/>}/>
        <Route path='' element={<PrivateRoute/>}>
        <Route  path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        </Route>
    </Route> */}
    
    <Route path='' element={<AdminRoute/>}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/admin/order' element={<OrderListScreen/>}/>
          <Route path='/admin/product' element={<ProductListScreen/>}/>
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path='/admin/customer' element={<CustomerManagement/>}/>
          <Route path='/admin/deliverylocation' element={<DeliveryLocation/>}/>
          <Route path='/admin/reports' element={<Reports/>}/>
          <Route path='/admin/setting' element={<Setting/>}/> 
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/> 
        </Route>

        <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        </Route>
    
    <Route path='' element={<PrivateRoute/>}>
    <Route path='/account' element={<AccountScreen/>}/>
    <Route path='/account/orders' element={<Orders/>}/>
    <Route path='/payment' element={<PaymentScreen/>} />
    <Route path='/orderstatus/' element={<OrderStatus/>} />
    <Route path='/profile' element={<ProfileScreen/>}/>
    <Route path='/support' element={<CustomerSupportScreen/>}/>
    <Route path='/address' element={<AddressScreen/>}/>
    <Route  path='/order/:id' element={<OrderScreen/>}/>
    </Route>
      
    </>
  )
)

posthog.init('phc_bQsC8lOhneXJ4Fpu8o4lWMoaRXEVfhnbri6lCixpdvv', {api_host:'https://us.i.posthog.com', capture_pageview:false,});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </PostHogProvider>
  </StrictMode>
);
