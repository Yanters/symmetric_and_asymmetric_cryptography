import React from 'react';
import { motion } from 'framer-motion';

const SubmitButton = ({ text }) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, height: 0 }}
      className='submitButtonWrapper'
      key='submitButtonWrapper'
    >
      <motion.button
        type='submit'
        className='submitButton'
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {text}
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;
