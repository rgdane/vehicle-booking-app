import api from './axios';

export default async function getCSRF() {
    await api.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set:', document.cookie); // ⬅️ Tambahkan ini
}
