import React, { useState } from 'react';

import './FilePicker.css';

const FilePicker = ({ label, setFile }) => {
  const [fileInfo, setFileInfo] = useState({
    name: '',
    size: '',
  });

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
    <div className='fileUploadWrapper'>
      <label htmlFor='file' className='fileUploadTitle'>
        {label}
      </label>
      <div className='fileUpload'>
        <input type='file' name='file' id='file' onChange={onFileChange} />
        <label htmlFor='file'>Upload</label>
        <div className='fileInfoContainer'>
          <div className='fileName'>
            {fileInfo.name ? fileInfo.name : 'NoFile.txt'}
          </div>
          <div className='fileSize'>
            {fileInfo.size ? fileInfo.size : '0 KB'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
