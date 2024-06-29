import axios from 'axios'
import { error } from 'console'

export const GetVacancies = () => {
    return axios.get('http://127.0.0.1:8000/vacancies_filter').then(response => {
        if (response.status === 200)  
            console.log('Данные получены:', response.data);
            return response.data;
    }).catch(error => console.error(error))
}