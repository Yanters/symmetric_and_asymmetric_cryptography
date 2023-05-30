import React, { useState } from 'react';
import { motion } from 'framer-motion';

import '../styles/FilePicker.css';

const FilePicker = ({ label, setFile }) => {
  const [fileInfo, setFileInfo] = useState({
    name: '',
    size: '',
  });

  const convertFileName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + '...';
    }
    return name;
  };

  const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else {
      bytes = bytes + ' bytes';
    }
    return bytes;
  };

  const onFileChange = (e) => {
    if (!e.target.files[0]) {
      setFile(null);
      setFileInfo({
        name: '',
        size: '',
      });
      return;
    }
    setFile(e.target.files[0]);
    // set file name and size
    setFileInfo({
      name: e.target.files[0].name,
      size: formatSizeUnits(e.target.files[0].size),
    });
  };

  return (
    <motion.div
      className='fileUploadWrapper'
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label
        htmlFor='file'
        className='fileUploadTitle'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {label}
      </motion.label>
      <div className='fileUpload'>
        <input type='file' name='file' id='file' onChange={onFileChange} />
        <label htmlFor='file'>Upload</label>
        <div className='fileInfoContainer'>
          <div className='fileName' title={fileInfo.name}>
            {fileInfo.name ? convertFileName(fileInfo.name) : 'NoFile.txt'}
          </div>
          <div className='fileSize'>
            {fileInfo.size ? fileInfo.size : '0 KB'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilePicker;
