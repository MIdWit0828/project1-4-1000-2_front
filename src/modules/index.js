import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import releaseReducer from "./ReleaseModules";
import estimateReducer from "./EstimateModules";
import orderReducer from "./OrderModules";
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialOrderReducer from "./MaterialOrderModules";
import materialDropReducer from "./MaterialStockDDModules";
import materialUsageReducer from "./MaterialUsageModules";

const rootReducer = combineReducers({

    //예원
    clientReducer,
    authReducer,
    estimateReducer,
    orderReducer,

    //동환
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    releaseReducer,

    //한결
    materialDropReducer,
    materialOrderReducer,
    materialSpecReducer,
    materialStockReducer,
    materialUsageReducer
});

export default rootReducer;