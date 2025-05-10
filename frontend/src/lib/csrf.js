import api from './axios';

export default async function getCSRF() {
    await api.get('/sanctum/csrf-cookie');
}
