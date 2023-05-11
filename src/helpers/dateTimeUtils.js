import moment from "moment";

export const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
};

export const formatTime = (value) => {
    return moment(value).format('HH:mm');
};

export const formatMoney = (value) => {
    return value.toLocaleString('vi-VN') + ' VNĐ';
};