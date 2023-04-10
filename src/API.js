import axios from 'axios';

const callAPI = axios.create({
    baseURL: 'http://tranvancaotung-001-site1.atempurl.com/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

export default callAPI;
