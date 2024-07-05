import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { experience, employment, schedule } from './FilterId';
import { useNavigate } from 'react-router-dom';
import './Parser.css'

type FormData = {
  text: string;
  experience: string;
  schedule: string;
  employment: string;
  only_with_salary: boolean;
};


function Parser() {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    text: '',
    experience: '',
    schedule: '',
    employment: '',
    only_with_salary: false
  });
  const [error, setError] = useState('');
 
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      text: event.target.value
    }));
  }
  const handleExperienceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedId = value !== '' ? experience.find(option => option.name === value)?.id || '' : '';
    setData(prevData => ({
      ...prevData,
      experience: selectedId
    }));
  };

  const handleScheduleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedId = value !== '' ? schedule.find(option => option.name === value)?.id || '' : '';
    setData(prevData => ({
      ...prevData,
      schedule: selectedId
    }));
  };

  const handleEmploymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedId = value !== '' ? employment.find(option => option.name === value)?.id || '' : '';
    setData(prevData => ({
      ...prevData,
      employment: selectedId
    }));
  };
  

  const handleSubmit = async () => {
    const formData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );
    try {
      const response = await axios.post('http://localhost:8000/', formData);
      console.log('Успешно:', response.data);
      setError('Парсинг окончен')
      navigate('vacancies_filter')
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setError('Ошибка при отправке данных, попробуйте сонова')
    }
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(prevData => ({
      ...prevData,
      only_with_salary: event.target.checked
    }));
  };

  return (
    <div>
      <h1>Парсер вакансий с сайта hh.ru</h1>
      <div className='company-filter-container'>
        <input
          type="text"
          onChange={handleTextChange}
          placeholder="Ключевое слово в вакансии"
          />
        <select name="employment" onChange={handleEmploymentChange}>
          <option value="">Любая занятость</option>
          {employment.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
        <select name="schedule" onChange={handleScheduleChange}>
          <option value="">Дюбой график</option>
          {schedule.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
        <select name="experience" onChange={handleExperienceChange}>
          <option value="">Любой опыт работы</option>
          {experience.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
        <label className='test-label'>
          Только с указанием зарплаты
          <input
            type="checkbox"
            checked={data.only_with_salary}
            onChange={handleSalaryChange}
          />
        </label>
      </div>
      <div className='button-container'>
        <button onClick={handleSubmit}>Начать парсинг</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Parser;