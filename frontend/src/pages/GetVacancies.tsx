import axios from 'axios';

export const GetVacancies = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/vacancies_filter');
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Статус ответа:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        return [];
    }
};