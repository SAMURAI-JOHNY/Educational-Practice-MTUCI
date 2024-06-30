import React, { useState } from 'react';
import axios from 'axios';

function Parser() {
  const [data, setData] = useState({
    text: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/', data);
      console.log('Успешно:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h1>Моя страница</h1>
      <input name="text" value={data.text} onChange={handleChange}/>
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
}

export default Parser;