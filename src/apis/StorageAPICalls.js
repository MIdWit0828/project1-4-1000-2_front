import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouses} from "../modules/WarehouseModules";
import {getDestroys, getProductDestroy, getStorageMove} from "../modules/StorageModules";

const DEFAULT_URL = `/api/v1/storage`;
export const callWarehouseMove =(warehouseCode) =>{
    return async (dispatch, getState) =>{
        console.log("번호",+warehouseCode)
        const result = await request('GET', `${DEFAULT_URL}/warehouse/${warehouseCode}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getStorageMove(result));
        }
    }
}

export const callDestroysTotalAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/destroy`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getDestroys(result));
        }
    }
}

export const callProductDestroyAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/product/destroy`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getProductDestroy(result));
        }
    }
}

export const callStockAssignment = ({ updateRequest,onSuccess,stockCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('POST',`/api/v1/storage/stock/${stockCode}`,{'Content-Type':'application/json'}, JSON.stringify(updateRequest));
            console.log('callStockAssignment result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('창고 배정 실패:', result);
            }
        } catch (error) {
            console.error('창고 배정 중 오류 발생:', error);
        }
    }
};