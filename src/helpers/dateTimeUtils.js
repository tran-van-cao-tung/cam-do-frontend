import moment from 'moment';

export const formatDate = (value) => {
    return moment(value).format('YYYY-MM-DD');
};

export const formatTime = (value) => {
    return moment(value).format('HH:mm');
};

export const formatMoney = (value) => {
    if(value){
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }
    return
};
