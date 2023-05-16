import axios from 'axios';

async function addToken(config) {
    const token = `Bearer ${localStorage.getItem('accessToken')}`;
    config.headers.Authorization = token;
    return config;
}

const axiosClient = axios.create({
    baseURL: 'https://tranvancaotung2-001-site1.etempurl.com/api/v1',
});

axiosClient.interceptors.request.use(addToken);

export default axiosClient;
