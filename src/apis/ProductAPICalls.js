import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {
    getInventoryProduct,
    getInventoryProductBom,
    getInventoryProductList,
    getInventoryProducts,
    success
} from "../modules/ProductModules";

const DEFAULT_URL = `/api/v1/product`;
export const callProductsAPI =({currentPage = 1}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProducts(result));
        }
    }
}

export const callProductAPI =({productCode}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/${productCode}`);

        console.log("프로덕트 : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProduct(result));
        }
    }
}

export const callProductRegistAPI = ({ registRequest,onSuccess }) => {

    return async (dispatch, getState) => {
        try {
        const result = await request('POST',`${DEFAULT_URL}`,{'Content-Type':'application/json'}, JSON.stringify(registRequest));
        console.log('callProductRegistAPI result : ',result);

        if(result.status === 201) {
            dispatch(success());
            onSuccess && onSuccess();
        }else {
            console.error('상품 등록 실패:', result);
        }
        } catch (error) {
            console.error('상품 등록 중 오류 발생:', error);
        }
    }
};

export const callProductBomRegistAPI = ({ registRequest,onSuccess,productCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('POST',`/api/v1/bom/product/${productCode}`,{'Content-Type':'application/json'}, JSON.stringify(registRequest));
            console.log('callProductBomRegistAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('bom 등록 실패:', result);
            }
        } catch (error) {
            console.error('bom 등록 중 오류 발생:', error);
        }
    }
};

export const callProductUpdateAPI = ({ updateRequest,onSuccess,productCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('PUT',`${DEFAULT_URL}/${productCode}`,{'Content-Type':'application/json'}, JSON.stringify(updateRequest));
            console.log('callProductUpdateAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('상품 수정 실패:', result);
            }
        } catch (error) {
            console.error('상품 수정 중 오류 발생:', error);
        }
    }
};

export const callProductUpdateStatusAPI = ({ onSuccess,selectedProduct }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE',`${DEFAULT_URL}/${selectedProduct}`,{'Content-Type':'application/json'});
            console.log('callProductUpdateStatusAPI result : ',result);

            if(result.status === 204) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('상품 삭제 실패:', result);
            }
        } catch (error) {
            console.error('상품 삭제 중 오류 발생:', error);
        }
    }
};

export const callProductListAPI = () => {
    return async (dispatch, getState) =>{
        const result = await request('GET', `/api/v1/products`);

        console.log("상품리스트 : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProductList(result));
        }
    }
}


export const callProductBomAPI = ({currentPage = 1, productCode}) => {
    return async (dispatch, getState) => {
        try {
            const results = await request('GET', `/api/v1/bom/product/page/${productCode}?page=${currentPage}`);
            const realResult = results.data.data.map(result =>(
                {
                    bomCode:result.bomCode,
                    materialName:result.materialSpec.materialName,
                    quantity:result.quantity,
                    sequence:result.sequence
                }
            ))
            console.log("real",realResult)
            if (results.status === 200) {
                dispatch(getInventoryProductBom(realResult));
            }

        } catch (error) {
            console.error("Error fetching BOM data: ", error);
        }
    }
}





