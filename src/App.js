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
import ProductDetail from "./pages/inventory/product/ProductDetail";
import Release from "./pages/inventory/release/Release";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AdminLayout/>}>
                  <Route index element={<ProtectedRoute loginCheck={true}><TestPage/></ProtectedRoute>}/> {/* 나중에 Main 컴포넌트 만들면 그걸로 바꿔주삼 */}
                  <Route path="sales">
                      <Route path="client">
                          <Route index element={<ProtectedRoute loginCheck={true}><Clients/></ProtectedRoute>}/>
                          <Route path=":clientCode" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                          <Route index element={<Clients/>}/>
                          <Route path=":clientCode" element={<ClientDetail/>}/>
                      </Route>
                  </Route>
                  <Route path="inventory">
                      <Route path="product">
                          <Route index element={<Products/>}/>
                          <Route path=":productCode"element={<ProductDetail/>}/>
                      </Route>
                      <Route path="warehouse">
                          <Route  index element={<Warehouses/>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="estimate">
                          <Route index element={<ProtectedRoute loginCheck={true}><Clients/></ProtectedRoute>}/>
                          <Route path=":estimateCode" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                  </Route>
                  <Route path="circulation">
                      <Route path="release">
                          <Route index element={<Release/>}/>
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
