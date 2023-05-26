import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import API from '../../API';
import { AuthContext } from '../../helpers/AuthContext';
import moment from 'moment/moment';
import 'moment/locale/vi';
import { useNavigate } from 'react-router-dom';

const NOTI_TYPE = {
    END_DATE: 1,
};
const NotiDropdown = () => {
    const { currentBranchId } = useContext(AuthContext);
    const [notiList, setNotiList] = useState([]);
    useEffect(() => {
        if (currentBranchId) {
            API({
                method: 'GET',
                url: '/notification/notificationList/' + currentBranchId,
            }).then((res) => {
                setNotiList(res.data);
            });
        }
    }, [currentBranchId]);

    function handleOnclickNoti(notiItem) {
        API({
            method: 'put',
            url: `/notification/updateNotification/${notiItem.notificationId}?isRead=true`,
        }).then((res) => {
            console.log('first');
            if (notiItem?.type === NOTI_TYPE.END_DATE) {
                window.location.href = '/detaipawn?contractId=' + notiItem.contractId;
            }
        });
    }
    return (
        <Box>
            <Box sx={{ padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px' }}>
                <h3>Thông Báo</h3>
            </Box>
            <Box>
                <List component="div" disablePadding>
                    {notiList.map((item) => (
                        <ListItem
                            key={item.key}
                            disablePadding
                            sx={{
                                display: 'block',
                                borderBottom: '2px solid #f7f7f7',
                                background: item.isRead ? 'transparent' : 'rgba(255, 188, 64, 0.2)',
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 1 ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => handleOnclickNoti(item)}
                            >
                                <ListItemText
                                    primary={
                                        <Box fontWeight={600} fontSize={14} paddingBottom={'8px'}>
                                            {item.header}
                                        </Box>
                                    }
                                    secondary={
                                        <Box display={'flex'} flexDirection={'column'} gap={'8px'} width={500}>
                                            <Box fontSize={13} color={'#333333'}>
                                                {item.content}
                                            </Box>
                                            <Box fontSize={12}>{moment(item.createdDate).fromNow(false)}</Box>
                                        </Box>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default NotiDropdown;
