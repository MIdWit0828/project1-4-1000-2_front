import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import {callProductListAPI, callProductsAPI} from "../../../apis/ProductAPICalls";
import {callProductTotalAPI, callStocksAPI, callTotalStockAPI} from "../../../apis/StockAPICalls";
import "../../../Products.css"
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import ProductSave from "../../../modals/products/ProductSave";
import StockRatio from "../../../chart/StockRatio";
import DestroyRatio from "../../../chart/DestroyRatio";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../../apis/StorageAPICalls";
import PagingBar from "../../../components/common/PagingBar";

function Products() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab,setActiveTab] = useState('products');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);

    const products = useSelector(state => state.productReducer.products);
    const stocks = useSelector(state => state.stockReducer.stocks);
    const total = useSelector(state => state.stockReducer.total);
    const productTotal = useSelector(state => state.stockReducer.productTotal);
    const productList = useSelector(state => state.productReducer.productList);
    const totalDestroy = useSelector(state => state.storageReducer.destroys);
    const productDestroy = useSelector(state => state.storageReducer.productDestroy);



    const productColumns = [
        {
            Header: '코드',
            accessor: 'productCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '출시일',
            accessor: 'launchDate'
        },
        {
            Header: '가격',
            accessor: 'price'
        },
        {
            Header: '단위',
            accessor: 'unit'
        },
        {
            Header: '생산 상태 변화 일',
            accessor: 'updatedAt'
        },
        {
            Header: '생산 상태',
            accessor: 'status'
        }
    ]
    const stockColumns = [
        {
            Header: '코드',
            accessor: 'stockCode'
        },
        {
            Header: '수량',
            accessor: 'quantity'
        },
        {
            Header: '등록일',
            accessor: 'createdAt'
        },
        {
            Header: '창고배정현황',
            accessor: 'assignmentStatus',
        },
        {
            Header: '종류',
            accessor: 'type'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '',
            accessor: 'isToday',
        }
    ]

    const tableTitle = "상품 리스트";     // 테이블 제목
    const baseLink = "/inventory/product";   // 상세조회 React 주소
    const idAccessor = "productCode";     // id로 사용할 컬럼 지정

    const stockTableTitle = "재고 리스트";     // 테이블 제목
    const stockBaseLink = "/inventory/product";   // 상세조회 React 주소
    const stockIdAccessor = "stockCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(callProductTotalAPI());
            await dispatch(callTotalStockAPI());
            await dispatch(callProductListAPI());

            await dispatch(callDestroysTotalAPI());
            await dispatch(callProductDestroyAPI());
            console.log("버튼 상태 ",activeTab)
            if (activeTab === 'products') {
                await dispatch(callProductsAPI({ currentPage }));
            } else if (activeTab === 'inventory') {
                await dispatch(callStocksAPI({ currentPage }));
            }
            setLoading(false);
        };

        fetchData();
    }, [currentPage, activeTab]);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await dispatch(callProductListAPI());
    //         setLoading(false);
    //     };
    //
    //     fetchData();
    // }, [currentPage, activeTab]);
    // useEffect(() => {
    //     dispatch(callTotalStockAPI());
    // }, [currentPage,activeTab]);





    const processedProducts = products?.data?.content.map(product => ({
        ...product,
        updatedAt: product.updatedAt ? product.updatedAt : '-',
        status: (() => {
            switch(product.status) {
                case 'in_production':
                    return (
                        <div className="status-container">
                            <div className="status-circle green">&#10003;</div>
                            <span className="status-text">생산가능</span>
                        </div>
                    );
                case 'production_discontinued':
                    return (
                        <div className="status-container">
                            <div className="status-circle red">&#10005;</div>
                            <span className="status-text">생산중단</span>
                        </div>
                    );
                default:
                    return product.status;
            }
        })()
    }));

    const processedStocks = stocks?.data?.content.map(stock => ({
        ...stock,
        isToday: stock.isToday ? (
            <div className="today-label">Today!</div>
        ) : <div className="today-label">Today!</div>,
        assignmentStatus: (() => {
            switch(stock.assignmentStatus) {
                case 'partially_assigned':
                    return (
                        <div className="status-container">
                            <div className="status-circle yellow" >!</div>
                            <span className="status-text">일부배정</span>
                        </div>
                    );
                case 'fully_assigned':
                    return (
                        <div className="status-container">
                            <div className="status-circle green">&#10003;</div>
                            <span className="status-text">모두배정</span>
                        </div>
                    );
                case 'not_assignment':
                    return (
                        <div className="status-container">
                            <div className="status-circle red">&#10005;</div>
                            <span className="status-text">미배정</span>
                        </div>
                    );
                default:
                    return null;
            }
        })(),
        type: (() => {
            switch(stock.type) {
                case 'products':
                    return (
                        <div>
                            생산품
                        </div>
                    );
                case 're_inspection':
                    return (
                        <div className="status-container">
                            재생산품
                        </div>
                    );
            }
        })()
    }));


        console.log("products",productList)

    console.log("상품 량",products);
        console.log("total",total);
        console.log("productTotal",productTotal);
        console.log("stocks",stocks)

    console.log("totalDestroy",totalDestroy)
    console.log("productDestroy",productDestroy)

    let productPageInfo={};
    //페이징
    if(products){
    productPageInfo = {
        currentPage:products.data.pageable.pageNumber+1,
        startPage:1,
        endPage:10,
        maxPage:products.data.totalPages
    }
    console.log("페이지정보",productPageInfo);
    }
    return (
        <>
            <div style={{ backgroundColor: '#ffffff', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                {productList && total && productTotal && (
                        <StockRatio products={productList.data} total={total} productTotal={productTotal}/>
                )}
            </div>
            <div style={{ backgroundColor: '#ffffff', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                {totalDestroy &&  productDestroy &&(
                    <DestroyRatio totalDestroy={totalDestroy.data} productDestroy={productDestroy.data}/>
                )}
            </div>
            <div style={{ backgroundColor: '#ffffff', margin: '10px', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="tabs">
                    <button onClick={() => setActiveTab('products')}>상품</button>
                    <button onClick={() => setActiveTab('inventory')}>재고</button>
                    {activeTab === 'products' && (
                        <Button colorScheme="orange" size="sm" onClick={onOpen} float="right">상품 등록</Button>
                    )}
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader color={"navy"}>상품 등록</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ProductSave onClose={onClose} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
                {activeTab === 'products' && products && (
                    <ColumnsTable columnsData={productColumns} tableData={processedProducts} tableTitle={tableTitle}
                                  baseLink={baseLink} idAccessor={idAccessor}/>
                )}
                <PagingBar pageInfo={productPageInfo} setCurrentPage={setCurrentPage} />

                {activeTab === 'inventory' && stocks && (
                    <ColumnsTable columnsData={stockColumns} tableData={processedStocks} tableTitle={stockTableTitle}
                                  baseLink={stockBaseLink} idAccessor={stockIdAccessor}/>
                )}
            </div>
        </>
    );

}

export default Products;