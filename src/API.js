import axios from 'axios';

const callAPI = axios.create({
    baseURL: 'http://tranvancaotung2-001-site1.etempurl.com/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

export default callAPI;
