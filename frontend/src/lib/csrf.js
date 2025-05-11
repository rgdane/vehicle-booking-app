import api from './axios';

export default async function getCSRF() {
    await api.get('/sanctum/csrf-cookie',{
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
}
