import { Box, Grid, Pagination, Stack, StyledEngineProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from './../../../asset/img/edit.png';

import './WareHouse.css';
import API from '../../../API';
import CustomizedTables from '../../../helpers/CustomizeTable';
import { isAvailableArray } from '../../../helpers/utils';
import PageHeader from '../../../helpers/PageHeader';
import CustomizeButton from '../../../helpers/CustomizeButton';

const DEFAULT = {
    pageNumber: 1,
    pageSize: 6,
    totalPage: 1,
};

const WareHouse = () => {
    const navigate = useNavigate();

    const [logContract, setLogContract] = useState([]);
    const [page, setPage] = useState(DEFAULT.pageNumber);
    const [pageSize] = useState(DEFAULT.pageSize);
    // Axios

    useEffect(() => {
        API({
            method: 'get',
            url: '/warehouse/GetAll/1',
        }).then((res) => {
            setLogContract(res.data);
            console.log('aaaaa', res.data);
        });
    }, []);

    const totalPage = useMemo(() => {
        const result = Math.ceil(logContract.length / pageSize);
        return result;
    }, [logContract?.length, pageSize]);

    const renderedData = useMemo(() => {
        if (!isAvailableArray(logContract)) return [];

        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        return logContract.slice(start, end);
    }, [logContract, page, pageSize]);
    const handlePagination = (e, value) => {
        setPage(value);
    };

    const dataTable = [
        {
            nameHeader: 'STT',
            dataRow: (element) => {
                return element.warehouseId;
            },
        },
        {
            nameHeader: 'Tên kho',
            dataRow: (element) => {
                return <Link to={`/viewproduct/${element.warehouseId}`}>{element.warehouseName}</Link>;
            },
        },
        {
            nameHeader: 'Địa chỉ',
            dataRow: (element) => {
                return element.warehouseAddress;
            },
        },
        {
            nameHeader: 'Tình trạng',
            dataRow: (element) => {
                return element.status === 0 ? (
                    <div className="MuiTableBody_root-status activity">Đang hoạt động</div>
                ) : (
                    <div className="MuiTableBody_root-status">Đã tạm dừng</div>
                );
            },
        },
        {
            nameHeader: 'Chức năng',
            dataRow: (element) => {
                return (
                    <div className="MuiTableBody_root-itemLast">
                        <Link to={`/editwarehouse/edit/${element.warehouseId}`}>
                            <img src={editIcon} alt="Edit" />
                        </Link>
                    </div>
                );
            },
        },
    ];
    const hanldeAddWareHouse = () => {
        navigate('/warehouse/add');
    };
    return (
        <>
            <StyledEngineProvider injectFirst>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={12}>
                        <PageHeader title="Danh sách kho" />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomizeButton title="Thêm mới" handleClick={hanldeAddWareHouse} />

                        <Box
                            padding="20px"
                            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                            borderRadius="8px"
                            bgcolor="#fff"
                            fontSize="14px"
                        >
                            <CustomizedTables renderedData={renderedData} dataTable={dataTable} />
                            <Box marginTop="14px">
                                <Stack spacing={2}>
                                    <Pagination
                                        style={{ margin: '0 auto' }}
                                        count={totalPage}
                                        page={page}
                                        onChange={handlePagination}
                                        color="primary"
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </StyledEngineProvider>
        </>
    );
};

export default WareHouse;
