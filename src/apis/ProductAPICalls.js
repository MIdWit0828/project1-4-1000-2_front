import {authRequest, request} from "./api";
import {
    getBomPaging,
    getInventoryMaterials,
    getInventoryProduct,
    getInventoryProductBom,
    getInventoryProductList,
    getInventoryProducts, getProductClient, getSimpleProducts, getSpec, getSpecPaging,
    success
} from "../modules/ProductModules";
import {getStore} from "../modules/StorageModules";
import {statusToastAlert} from "../utils/ToastUtils";


const DEFAULT_URL = `/api/v1/product`;

export const callSimpleProductsAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`${DEFAULT_URL}/simple`);
        console.log("callSimpleProductsAPI result : ", result);
        if(result.status === 200) {
            dispatch(getSimpleProducts(result));
        }
    }
}


export const callProductsAPI = ({ currentPage = 1, searchText = '' }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`${DEFAULT_URL}?page=${currentPage}&productName=${searchText}`);

        console.log("result : ", result);
        if (result.status === 200) {
            dispatch(getInventoryProducts(result));
        }
    }
}

export const callProductAPI =({productCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/${productCode}`);

        console.log("callProductAPI : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProduct(result));
        }
    }
}

export const callProductRegistAPI = ({ registRequest,onSuccess }) => {

    return async (dispatch, getState) => {
        try {
        const result = await authRequest.post(`${DEFAULT_URL}`,registRequest);
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
            const result = await authRequest.post(`/api/v1/bom/product/${productCode}`, registRequest);
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

export const callProductSpecRegistAPI = ({ registRequest,onSuccess,productCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/productSpec/product/${productCode}`,registRequest);
            console.log('callProductSpecRegistAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('spec 등록 실패:', result);
            }
        } catch (error) {
            console.error('spec 등록 중 오류 발생:', error);
        }
    }
};


export const callProductUpdateAPI = ({ updateRequest,onSuccess,productCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`${DEFAULT_URL}/${productCode}`,updateRequest);
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

export const callBomUpdateAPI = ({ updateRequest,onSuccess,bomCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/bom/${bomCode}`,updateRequest);
            console.log('callBomUpdateAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('bom 수정 실패:', result);
            }
        } catch (error) {
            const title = '값을 모두 입력해주세요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
};

export const callSpecUpdateAPI = ({ updateRequest,onSuccess,specCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/productSpec/${specCode}`,updateRequest);
            console.log('callSpecUpdateAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('스펙 수정 실패:', result);
            }
        } catch (error) {
            console.error('스펙 수정 중 오류 발생:', error);
        }
    }
};

export const callProductUpdateStatusAPI = ({ onSuccess,selectedProduct }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`${DEFAULT_URL}/${selectedProduct}`);
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

export const callBomDeleteAPI = ({ onSuccess,selectedBom }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/bom/${selectedBom}`);
            console.log('callBomDeleteAPI result : ',result);

            if(result.status === 204) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('BOM 삭제 실패:', result);
            }
        } catch (error) {
            console.error('BOM 삭제 중 오류 발생:', error);
        }
    }
};

export const callSpecDeleteAPI = ({ onSuccess,selectedSpec }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest(`/api/v1/productSpec/${selectedSpec}`);
            console.log('callSpecDeleteAPI result : ',result);

            if(result.status === 204) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('스펙 삭제 실패:', result);
            }
        } catch (error) {
            console.error('스펙 삭제 중 오류 발생:', error);
        }
    }
};


export const callProductListAPI = () => {
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `/api/v1/products`);

        console.log("상품리스트 : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProductList(result));
        }
    }
}


export const callProductBomAPI = ({currentPage = 1, productCode}) => {
    return async (dispatch, getState) => {
        try {
            const results = await authRequest.get( `/api/v1/bom/product/page/${productCode}?page=${currentPage}`);
            const realResult = results.data.data.map(result =>(
                {
                    bomCode:result.bomCode,
                    materialName:result.materialSpec.materialName,
                    quantity:result.quantity,
                    sequence:result.sequence
                }
            ))
            console.log("callProductBomAPI",realResult)
            if (results.status === 200) {
                dispatch(getInventoryProductBom(realResult));
                dispatch(getBomPaging(results.data.pageInfo));
            }

        } catch (error) {
            console.error("Error fetching BOM data: ", error);
        }
    }
}

export const callProductSpecAPI = ({specCurrentPage = 1, productCode}) => {
    return async (dispatch, getState) => {
        try {
            const results = await authRequest.get( `/api/v1/productSpec/product/${productCode}?page=${specCurrentPage}`);
            const realResult = results.data.data.map(result =>(
                {
                    specCode:result.specCode,
                    type:result.type,
                    size:result.size,
                    color:result.color
                }
            ))
            console.log("callProductSpecAPI",realResult)
            console.log("callProductSpecAPI PAGING",results.data.pageInfo)
            if (results.status === 200) {
                dispatch(getSpec(realResult));
                dispatch(getSpecPaging(results.data.pageInfo));
            }

        } catch (error) {
            console.error("Error fetching BOM data: ", error);
        }
    }
}

export const callMaterailsAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `/api/v1/material/spec/list`);

        console.log("callMaterailsAPI : ", result);
        if(result.status === 200) {
            dispatch(getInventoryMaterials(result.data));
        }
    }
}

export const callProductClient =({productCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/client/${productCode}`);

        console.log("callProductClient : ", result);
        if(result.status === 200) {
            dispatch(getProductClient(result));
        }
    }
}




