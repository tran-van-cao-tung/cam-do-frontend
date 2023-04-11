import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Paper from "@mui/material/Paper";
import search from './../../../asset/img/search.png';
import edit from './../../../asset/img/edit.png';
import "./ViewProduct.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../API';
import moment from 'moment';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
function ViewProduct() {
    const params = useParams();
    const history = useNavigate();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: "22px 19px 22px 27px",
        borderRadius: "10px",
        color: theme.palette.text.secondary,
    }));

    const columns = [
        { field: "contractAssetId", headerName: "STT", align: "center" },
        {
            field: "pawnableProductId",
            headerName: "Mã TS",
            align: "center",
        },
        {
            field: "contractAssetName",
            headerName: "Tên sản phẩm",
            align: "center",
            minWidth: 125,
        },
        {
            field: "status",
            headerName: "Tình Trạng",
            valueGetter: (params) =>
                `${params.row.status === 1
                    ? "Lưu kho"
                    : params.row.status === 2
                        ? "Thanh lý"
                        : params.row.status === 3
                            ? "Đóng hợp đồng" : ""
                }`,
            width: 140,
        },
        {
            field: "description",
            headerName: "Mô tả",
            minWidth: 300,
            align: "center",
        },
    ];
    const [listProduct, setListProduct] = useState([]);
    const [warehouse, setwarehouse] = useState([]);

    // Axios
    useEffect(() => {
        API({
            method: 'get',
            url: `/contractAsset/assets/${params.id}`,
        }).then((res) => {
            setListProduct(res.data);
        }).catch((err) => {
            alert('Ko thấy product trong warehouse');
        });
        
        API({
            method: 'get',
            url: `/warehouse/GetAllDetail/${params.id},0`,
        }).then((res) => {
            setwarehouse(res.data);
        }).catch((err) => {
            alert('KO thấy tên warehouse');
        });
    }, []);
    
return (
    <div className="box_employee">
        <h1 className="employee_heading">{warehouse.warehouseName}</h1>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>
                    <form className="employee_search">
                        <div>
                            <div className="employee_search-check">
                                <span className="employee_search-heading">Tình trạng:</span>
                                <input type="radio" name="radio" value="all" checked="checked" />
                                <label className="check1">Tất cả</label>
                                <input type="radio" name="radio" value="all" />
                                <label className="check2">Lưu kho</label>
                                <input type="radio" name="radio" value="all" />
                                <label className="check3">Thanh lý</label>
                            </div>
                            <div className="employee_search-select">
                                <input type="text" placeholder="Tìm kiếm..." className="employee_search-input" />
                            </div>
                        </div>
                    </form>
                    <div style={{ height: 510, width: "99%", paddingTop: 10 }}>
                        <DataGrid
                            // rows={contractList.map((item,index)=>{return {id:index+1,...item}})}
                            rows={listProduct
                                .filter((item) => item.status !== 4)
                                .map((item, index) => {
                                    return { id: index + 1, ...item };
                                })}
                            columns={columns}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            style={{ textAlign: "center" }}
                        />
                    </div>

                </Item>
            </Grid>
        </Grid>
    </div>
);
}

export default ViewProduct