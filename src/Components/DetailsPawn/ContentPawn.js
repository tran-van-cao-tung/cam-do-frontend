import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import callAPI from '../../API.js';
import { AuthContext } from '../../helpers/AuthContext.js';

const ContentPawn = () => {
    const [data, setData] = useState(null);
    const { authState, currentBranchId } = useContext(AuthContext);

    //Lấy username của loginUser dựa vào localStorage
    /* const [branchId, setBranchId] = useState('')
    useEffect(() => {
        callAPI({
            method: 'get',
            url: `user/getAll/0`,
        }).then((res) => {
            if (localStorage.getItem('userName') != "Admin") {
                setBranchId(res.data.filter(log => {
                    return log.userName === localStorage.getItem('userName');
                })[0].branchId)
            }
        });
    }, []) */

    const [homePage, setHomePage] = useState();
    useEffect(() => {
        if (currentBranchId) {
            callAPI({
                method: 'get',
                url: `contract/homepage/` + currentBranchId,
            }).then((res) => {
                setHomePage(res.data);
            });
        }
    }, [currentBranchId]);
    const formatMoney = (value) => {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
    }));

    return (
        <div className="content-details">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={5.7}>
                        <Item>
                            <p className="details-content">Tổng số vốn</p>
                            <span className="details-content">{homePage ? formatMoney(homePage.fund) : ''}</span>
                        </Item>
                    </Grid>
                    <Grid item xs={0.6}></Grid>
                    <Grid item xs={5.7}>
                        <Item>
                            <p className="details-content">Tiền cho vay</p>
                            <span className="details-content">
                                {homePage ? formatMoney(homePage.loanLedger) : '0 VNĐ'}
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <p className="details-content">Tiền nợ</p>
                            <span className="details-content">
                                {homePage ? formatMoney(homePage.ransomTotal) : '0 VNĐ'}
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <p className="details-content">Lãi dự kiến</p>
                            <span className="details-content">
                                {homePage ? formatMoney(homePage.totalProfit) : '0 VNĐ'}
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <p className="details-content">Lãi đã thu</p>
                            <span className="details-content">
                                {homePage ? formatMoney(homePage.recveivedInterest) : '0 VNĐ'}
                            </span>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ContentPawn;
