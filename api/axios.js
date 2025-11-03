
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // غيره حسب رابط الـ backend
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // الوقت الأقصى للاستجابة 5 ثواني
});
// إضافة التوكن تلقائيًا من localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
