import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import TestPage from "./pages/test";
import Clients from "./pages/sales/client/Clients";
import ClientDetail from "./pages/sales/client/ClientDetail";
import Products from "./pages/inventory/product/Products";
import Warehouses from "./pages/inventory/warehouse/Warehouses";
import AuthLayout from "./layouts/AuthLayout";
import LogIn from "./pages/auth/LogIn";
import ProtectedRoute from "./components/router/ProtectedRoute";
import InventoryMaterailAnalyze from "./pages/inventory/material/InventoryMaterailAnalyze";
import Specs from "./pages/inventory/material/Specs";
import MaterialInStock from "./pages/inventory/material/MaterialInStock";
import MaterialStocks from "./pages/inventory/material/MaterialStocks";
import MaterialOrders from "./pages/purchase/material/MaterialOrders";
import MaterialClients from "./pages/purchase/material/MaterialClients";
import Estimates from "./pages/sales/estimate/Estimates";
import EstimateDetail from "./pages/sales/estimate/EstimateDetail";
import Orders from "./pages/sales/order/Orders";
import OrderDetail from "./pages/sales/order/OrderDetail";
import ProductDetail from "./pages/inventory/product/ProductDetail";
import ProductionReports from "./pages/production/productionReport/ProductionReports";
import ProductionReportDetail from "./pages/production/productionReport/ProductionReportDetail";
import DefectDetail from "./pages/production/productionReport/DefectDetail";
import MaterialUsages from "./pages/production/material/MaterialUsages";
import SpecDetail from "./pages/inventory/material/SpecDetail";
import MaterialClientDetail from "./pages/purchase/material/MaterialClientDetail";
import MaterialOrderDetail from "./pages/purchase/material/MaterialOrderDetail";
import StockDetail from "./pages/inventory/material/StockDetail";

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
                  <Route path="inventory">
                      <Route path="product">
                          <Route index element={<Products/>}/>
                          <Route path=":productCode" element={<ProductDetail/>}/>
                      </Route>
                      <Route path="warehouse">
                          <Route index element={<Warehouses/>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="material">
                          <Route path="analyze" element={<InventoryMaterailAnalyze/>}/>
                          <Route path="in-stock" element={<MaterialInStock/>}/>
                          <Route path="Specs">
                              <Route index element={<Specs/>}/>
                              <Route path=":specCode" element={<SpecDetail/>}/>
                          </Route>
                          <Route path="stocks" >
                              <Route index element={<MaterialStocks/>}/>
                              <Route path=":stockCode" element={<StockDetail/>}/>
                          </Route>
                      </Route>
                  </Route>
                  <Route path="purchase">
                      <Route path="material">
                          <Route path="orders" >
                              <Route index element={<MaterialOrders/>}/>
                              <Route path=":orderCode" element={<MaterialOrderDetail/>}/>
                          </Route>
                          <Route path="clients" >
                              <Route index element={<MaterialClients/>}/>
                              <Route path=":clientCode" element={<MaterialClientDetail/>}/>
                          </Route>
                      </Route>
                  </Route>
                  <Route path="production">
                      <Route path="reports">
                          <Route index
                                 element={<ProtectedRoute loginCheck={true}><ProductionReports/></ProtectedRoute>}/>
                          <Route path=":productionStatusCode/detail" element={<ProtectedRoute
                              loginCheck={true}><ProductionReportDetail/></ProtectedRoute>}/>
                          <Route path=":productionDetailCode/defects">
                              <Route index
                                     element={<ProtectedRoute loginCheck={true}><DefectDetail/></ProtectedRoute>}/>
                          </Route>
                      </Route>
                      <Route path="material">
                          <Route path="usage" element={<MaterialUsages/>}/>
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
