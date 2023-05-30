import React from 'react';
import { motion } from 'framer-motion';

import '../styles/CustomSelect.css';

const CustomSelect = ({ label, labels, setOption, id, defaultOption }) => {
  return (
    <motion.div
      className='CustomSelectWrapper'
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='SelectTitle'
        // animate text
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {label}
      </motion.div>
      <div className='CustomSelect'>
        {labels.map((l, index) => (
          <div className='CustomSelectItem' key={index}>
            <input
              type='radio'
              name={id ? id : label}
              id={l+label}
              value={l}
              defaultChecked={defaultOption === l}
              onChange={(e) => setOption(e.target.value)}
            />
            <label htmlFor={l+label}>{l}</label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomSelect;
