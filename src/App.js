import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import TestPage from "./pages/test";
import Clients from "./pages/sales/client/Clients";
import WorkOrders from "./pages/workOrder/WorkOrders";
import WorkOrderRegist from "./pages/workOrder/WorkOrderRegist";
import React from "react";
import * as PropTypes from "prop-types";
import ProtectedRoute from "./components/router/ProtectedRoute";
import ClientDetail from "./pages/sales/client/ClientDetail";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AdminLayout/>}>
                  <Route index element={<TestPage/>}/> {/* 나중에 Main 컴포넌트 만들면 그걸로 바꿔주삼 */}
                  <Route path="sales">
                      <Route path="client">
                          <Route index element={<Clients/>}/>
                          <Route path=":clientCode" element={<ClientDetail/>}/>
                      </Route>
                  </Route>
                  <Route path="production">
                      <Route path="work-order">
                          <Route index element={<WorkOrders/>}/>
                      </Route>
                      <Route path="work-order-regist" element={<ProtectedRoute authCheck={false}><WorkOrderRegist/></ProtectedRoute>}/>
                  </Route>
              </Route>
              <Route path="/login">
                  {/* 로그인 화면은 레이아웃 달라서 따로 만들어야댐 */}
              </Route>
              <Route path="*" element={ <TestPage/> }/> {/* Error 컴포넌트 만들면 그걸로 바꿔주삼 */}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
