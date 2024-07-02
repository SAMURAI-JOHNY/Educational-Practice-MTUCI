import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const experience = [
    {
      "id": "noExperience",
      "name": "Нет опыта"
    },
    {
      "id": "between1And3",
      "name": "От 1 года до 3 лет"
    },
    {
      "id": "fullDay",
      "name": "От 3 до 6 лет"
    },
    {
      "id": "moreThan6",
      "name": "Более 6 лет"
    }
];

const schedule = [
{
"id": "fullDay",
"name": "Полный день",
"uid": "full_day"
},
{
"id": "shift",
"name": "Сменный график",
"uid": "shift"
},
{
"id": "flexible",
"name": "Гибкий график",
"uid": "flexible"
},
{
"id": "remote",
"name": "Удаленная работа",
"uid": "remote"
},
{
"id": "flyInFlyOut",
"name": "Вахтовый метод",
"uid": "fly_in_fly_out"
}
];

const employment = [
{
"id": "full",
"name": "Полная занятость"
},
{
"id": "part",
"name": "Частичная занятость"
},
{
"id": "project",
"name": "Проектная работа"
},
{
"id": "volunteer",
"name": "Волонтерство"
},
{
"id": "probation",
"name": "Стажировка"
}
]

type FormData = {
  text: string;
  experience: string;
  schedule: string;
  employment: string;
};


function Parser() {
  const [data, setData] = useState<FormData>({
    text: '',
    experience: '',
    schedule: '',
    employment: ''
  });

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
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h1>Моя страница</h1>
      <select name="employment" onChange={handleEmploymentChange}>
        <option value="">Занятость</option>
        {employment.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="schedule" onChange={handleScheduleChange}>
        <option value="">График</option>
        {schedule.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <select name="experience" onChange={handleExperienceChange}>
        <option value="">Опыт работы</option>
        {experience.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}

export default Parser;