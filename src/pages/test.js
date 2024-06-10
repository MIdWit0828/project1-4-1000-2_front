import {
    Box,
    Button, Divider,
    IconButton, Input,
    InputGroup,
    InputLeftAddon, InputRightAddon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Stack
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import ColumnsTable from "../components/table/ComplexTable";
import OrderStatusBadge from "../components/badge/OrderStatusBadge";

function TestPage() {

    const data = [
        {
            name: 'dh',
            phone: '010-1234-1234',
            email: 'dhkang@naver.com',
            status: 'ORDER_RECEIVED'
        },
        {
            name: 'mike',
            phone: '010-1234-1234',
            email: 'mike@naver.com',
            status: 'ORDER_RECEIVED'
        },
        {
            name: 'dsfd',
            phone: '010-3233-2222',
            email: 'mike@naver.com',
            status: 'ORDER_RECEIVED'
        }
    ];

    const columns = [
        {
            Header: '이름',
            accessor: 'name'
        },
        {
            Header: '이메일',
            accessor: 'email'
        },
        {
            Header: '상태',
            accessor: 'status',
            Cell: (cell) => OrderStatusBadge(cell.value)
        },
        {
            Header: '연락처',
            accessor: 'phone'
        }
    ]


    return (
        <>

            <div>
                <ColumnsTable columnsData={columns} tableData={data}/>
            </div>

        </>


    );
}

export default TestPage;