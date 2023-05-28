import React from 'react';
import './CustomSelect.css';

const CustomSelect = ({ label, labels, setOption, id }) => {
  return (
    <div className='CustomSelectWrapper'>
      <div className='SelectTitle'>{label}</div>
      <div className='CustomSelect'>
        {labels.map((l, index) => (
          <div className='CustomSelectItem' key={index}>
            <input
              type='radio'
              name={ id ? id : label}
              id={l}
              value={l}
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor={l}>{l}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
