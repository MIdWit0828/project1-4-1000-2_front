import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import TestPage from "./pages/test";
import Clients from "./pages/sales/client/Clients";
import React from "react";
import * as PropTypes from "prop-types";
import ProtectedRoute from "./components/router/ProtectedRoute";
import ClientDetail from "./pages/sales/client/ClientDetail";
import AuthLayout from "./layouts/AuthLayout";
import LogIn from "./pages/auth/LogIn";
import Estimates from "./pages/sales/estimate/Estimates";
import EstimateDetail from "./pages/sales/estimate/EstimateDetail";
import Orders from "./pages/sales/order/Orders";
import OrderDetail from "./pages/sales/order/OrderDetail";
import WorkOrderRegist from "./pages/Production/workOrder/WorkOrderRegist";
import WorkOrders from "./pages/Production/workOrder/WorkOrders";
import Plans from "./pages/Production/plan/Plans";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AdminLayout/>}>
                  <Route index element={<ProtectedRoute loginCheck={true}><TestPage/></ProtectedRoute>}/> {/* 나중에 Main 컴포넌트 만들면 그걸로 바꿔주삼 */}
                  <Route path="sales">
                      <Route path="client">
                          <Route index element={<ProtectedRoute loginCheck={true}><Clients/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="estimate">
                          <Route index element={<ProtectedRoute loginCheck={true}><Estimates/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><EstimateDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="order">
                          <Route index element={<ProtectedRoute loginCheck={true}><Orders/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><OrderDetail/></ProtectedRoute>}/>
                      </Route>
                  </Route>
                  <Route path="production">
                      <Route path="work-order">
                          <Route index element={<WorkOrders/>}/>
                      </Route>
                      <Route path="plan">
                          <Route index element={<Plans/>}/>
                      </Route>
                  </Route>
              </Route>
              <Route path="/login" element={<AuthLayout/>}>
                  <Route index element={<ProtectedRoute loginCheck={false}><LogIn/></ProtectedRoute>}/>
              </Route>
              <Route path="*" element={ <TestPage/> }/> {/* Error 컴포넌트 만들면 그걸로 바꿔주삼 */}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
