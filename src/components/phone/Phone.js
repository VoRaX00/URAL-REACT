import React, { useState } from 'react';
import './style.css';

const Phone = ({ value, onChange }) => {
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const phone = e.target.value;
        const phonePattern = /^[0-9\-\+]{9,15}$/;

        if (!phonePattern.test(phone)) {
            setError('Введите действительный номер телефона');
        } else {
            setError('');
        }

        onChange(phone);
    };

    return (
        <div className="phone-input">
            <label className="carAdd__form-text" htmlFor="phone">Телефон:</label>
            <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={value}
                onChange={handleChange}
                required
            />
            {error && <small className="text-danger">{error}</small>}
        </div>
    );
};

export default Phone;
