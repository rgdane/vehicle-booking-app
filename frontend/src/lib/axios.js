import axios from 'axios';

// Ambil token dari cookie
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    //withCredentials: true,
});

// Interceptor: sebelum request dikirim, pasang header CSRF
// api.interceptors.request.use((config) => {
//     const token = getCookie('XSRF-TOKEN');
//     if (token) {
//         config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
//     }
//     return config;
// });

export default api;
