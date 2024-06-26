import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouse, getInventoryWarehouses} from "../modules/WarehouseModules";
import {
    getCompletes,
    getExpectedRelease, getOrderInformations,
    getOrderProducts, getRelease,
    getReleaseExpected, getReleaseLack,
    getReleaseOrders,
    getReleaseOrdersPage, getReleases, getReleasesPage, getShippings
} from "../modules/ReleaseModules";
import {statusToastAlert} from "../utils/ToastUtils";

const DEFAULT_URL = `/api/v1/release`;
export const callReleaseOrdersAPI =({currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/orders?page=${currentPage}`);

        console.log("callReleaseOrdersAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseOrders(result));
            dispatch(getReleaseOrdersPage(result));
        }
    }
}

export const callReleaseWaitAPI =({currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/wait?page=${currentPage}`);

        console.log("callReleaseWaitAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleases(result));
            dispatch(getReleasesPage(result));
        }
    }
}
export const callOrderProduct =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/order/${orderCode}`);

        console.log("callReleaseOrdersAPI : ", result);
        if(result.status === 200) {
            dispatch(getOrderProducts(result));
        }
    }
}

export const callReleaseExpectedAPI =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/storage/${orderCode}`);

        console.log("callReleaseExpectedAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseExpected(result));
        }
    }
}

export const callReleaseLackAPI =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/order/lack/${orderCode}`);

        console.log("callReleaseLackAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseLack(result));
        }
    }
}

export const callReleaseAPI = ({ onSuccess,orderCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`${DEFAULT_URL}/${orderCode}`);
            console.log('callReleaseAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('출고 실패:', result);
            }
        } catch (error) {
            console.error('출고 중 오류 발생:', error);
            const title = '출고 오류';
            const desc = '출고에 실패하였습니다.';
            statusToastAlert(title, desc, 'error');
        }
    }
};


export const callShippingAPI = ({ onSuccess,orderCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`${DEFAULT_URL}/shipping/${orderCode}`);
            console.log('callShippingAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('배송 처리 실패:', result);
            }
        } catch (error) {
            console.error('배송 처리 중 오류 발생:', error);
            const title = '배송 처리 오류';
            const desc = '배송에 실패하였습니다.';
            statusToastAlert(title, desc, 'error');
        }
    }
};
export const callOrderInformation =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `/api/v1/orders/${orderCode}`);

        console.log("callOrderInformation : ", result);
        if(result.status === 200) {
            dispatch(getOrderInformations(result));
        }
    }
}
export const callShippingsRelaseAPI =({currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/shipping?page=${currentPage}`);

        console.log("callShippingsRelaseAPI : ", result);
        if(result.status === 200) {
            dispatch(getShippings(result));
        }
    }
}

export const callCompletesRelaseAPI =({currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/complete?page=${currentPage}`);

        console.log("callCompletesRelaseAPI : ", result);
        if(result.status === 200) {
            dispatch(getCompletes(result));
        }
    }
}

export const callCompleteAPI = ({ onSuccess,orderCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`${DEFAULT_URL}/complete/${orderCode}`);
            console.log('callCompleteAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('주문 완료 처리 실패:', result);
            }
        } catch (error) {
            console.error('주문 완료 중 오류 발생:', error);
            const title = '주문 완료 처리 오류';
            const desc = '주문 완료에 실패하였습니다.';
            statusToastAlert(title, desc, 'error');
        }
    }
};




