import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

const CollapseList = ({ filesInfo, convertFileName }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className='fileInfoContainer'>
      {filesInfo == null ? (
        <div className='fileElement' key={0}>
          <div className='fileName' title='NoFile.txt'>
            NoFile.txt
          </div>
          <div className='fileSize'>0 KB</div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className='fileElement'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='fileName' title={filesInfo[0].name}>
              {convertFileName(filesInfo[0].name)}
            </div>
            <div className='fileSize'>{filesInfo[0].size}</div>
            {collapsed && filesInfo.length > 1 ? (
              <IoMdArrowDropdown
                className='collapseIcon'
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : filesInfo.length > 1 ? (
              <IoMdArrowDropleft
                className='collapseIcon'
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : null}
          </motion.div>
          {!collapsed &&
            filesInfo.slice(1).map((file, index) => (
              <motion.div
                key={index + 1}
                className='fileElement'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className='fileName' title={file.name}>
                  {convertFileName(file.name)}
                </div>
                <div className='fileSize'>{file.size}</div>
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CollapseList;
