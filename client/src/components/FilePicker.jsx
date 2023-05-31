import React, { useState } from 'react';
import { motion } from 'framer-motion';

import '../styles/FilePicker.css';

const FilePicker = ({ label, setFile }) => {
  const [filesInfo, setFilesInfo] = useState({
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
    // check if any file is selected
    if (e.target.files.length === 0) {
      setFile(null);
      setFilesInfo({});
      return;
    }

    setFile(e.target.files);
    // get from every file the name and size and store it state
    setFilesInfo([
      ...Array.from(e.target.files).map((file) => {
        return {
          name: convertFileName(file.name),
          size: formatSizeUnits(file.size),
        };
      }),
    ]);
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
        <input
          type='file'
          name='file'
          id='file'
          onChange={onFileChange}
          multiple={true}
        />
        <label htmlFor='file'>Upload</label>
        <div className='fileInfoContainer'>
          {filesInfo.length > 0 ? (
            filesInfo.map((file, index) => (
              <div key={index} className='fileElement'>
                <div className='fileName' title={file.name}>
                  {file.name}
                </div>
                <div className='fileSize'>{file.size}</div>
              </div>
            ))
          ) : (
            <div className='fileElement' key={0}>
              <div className='fileName' title='NoFile.txt'>
                NoFile.txt
              </div>
              <div className='fileSize'>0 KB</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilePicker;
