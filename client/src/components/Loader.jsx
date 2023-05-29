import React from 'react';
import { Dna, FidgetSpinner } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  return (
    <div className='loaderWrapper'>
      {/* <Dna
        visible={true}
        height='220'
        width='220'
        ariaLabel='dna-loading'
        wrapperStyle={{}}
        wrapperClass='dna-wrapper'
      /> */}
      <FidgetSpinner
        visible={true}
        height='320'
        width='320'
        ariaLabel='dna-loading'
        wrapperStyle={{}}
        wrapperClass='dna-wrapper'
        ballColors={['#000000', '#000000', '#000000']}
        backgroundColor='#351ad1'
      />
    </div>
  );
};

export default Loader;
