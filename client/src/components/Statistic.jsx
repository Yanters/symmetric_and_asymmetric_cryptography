import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import CryptoCard from './CryptoCard';
import { motion } from 'framer-motion';
import CustomSelect from './CustomSelect';

import '../styles/Statistic.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return <CryptoCard crypto={payload[0]?.payload} />;
  }

  return null;
};

const Statistic = ({ algSelected, setAlgSelected }) => {
  const { crypto } = useContext(CryptoContext);
  // const [algSelected, setAlgSelected] = useState('All'); // ['All', 'AES', 'Blowfish', 'RSA', 'ECC']

  //  0 - alg AES, 1 - alg Blowfish, 2 - RSA, 3 - alg ECC
  const AESData = crypto.filter((crypto) => crypto.alg === 'AES');
  const BlowfishData = crypto.filter((crypto) => crypto.alg === 'Blowfish');
  const RSAData = crypto.filter((crypto) => crypto.alg === 'RSA');
  const ECCData = crypto.filter((crypto) => crypto.alg === 'ECC');
  const RSAStarData = crypto.filter((crypto) => crypto.alg === 'RSA*');

  const checkIfSelectedDataIsEmpty = () => {
    if (algSelected === 'All') {
      return (
        AESData.length > 0 ||
        BlowfishData.length > 0 ||
        RSAData.length > 0 ||
        ECCData.length > 0 ||
        RSAStarData.length > 0
      );
    } else if (algSelected === 'AES') {
      return AESData.length > 0;
    } else if (algSelected === 'Blowfish') {
      return BlowfishData.length > 0;
    } else if (algSelected === 'RSA') {
      return RSAData.length > 0;
    } else if (algSelected === 'ECC') {
      return ECCData.length > 0;
    } else if (algSelected === 'RSA*') {
      return RSAStarData.length > 0;
    }
  };

  return (
    <motion.div
      className='cryptoHistoryWrapper'
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1>Statistics</h1>
      <CustomSelect
        id='statAlgorithm'
        label='Pick algorithm'
        labels={['All', 'AES', 'Blowfish', 'RSA', 'RSA*', 'ECC']}
        defaultOption='All'
        setOption={setAlgSelected}
      />
      {checkIfSelectedDataIsEmpty() ? (
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            height={550}
            width={1000}
          >
            <CartesianGrid />
            <XAxis
              type='number'
              dataKey='fileSize'
              name='size'
              unit='KB'
              tickFormatter={(value) => (value / 1024).toFixed(0)}
            />
            <YAxis
              yAxisId='left'
              type='number'
              dataKey='totalTime'
              name='time'
              unit='ms'
              stroke='#8884d8'
            />

            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={<CustomTooltip />}
            />
            {algSelected === 'All' ? (
              <>
                <Scatter
                  yAxisId='left'
                  name='AES'
                  data={AESData}
                  fill='#8884d8'
                />
                <Scatter
                  yAxisId='left'
                  name='Blowfish'
                  data={BlowfishData}
                  fill='#82ca9d'
                />
                <Scatter
                  yAxisId='left'
                  name='RSA'
                  data={RSAData}
                  fill='#ffc658'
                />
                <Scatter
                  yAxisId='left'
                  name='RSA*'
                  data={RSAStarData}
                  fill='#ef1ab9'
                />
                <Scatter
                  yAxisId='left'
                  name='ECC'
                  data={ECCData}
                  fill='#3481f6'
                />
              </>
            ) : algSelected === 'AES' ? (
              <Scatter
                yAxisId='left'
                name='AES'
                data={AESData}
                fill='#8884d8'
              />
            ) : algSelected === 'Blowfish' ? (
              <Scatter
                yAxisId='left'
                name='Blowfish'
                data={BlowfishData}
                fill='#82ca9d'
              />
            ) : algSelected === 'RSA' ? (
              <Scatter
                yAxisId='left'
                name='RSA'
                data={RSAData}
                fill='#ffc658'
              />
            ) : algSelected === 'ECC' ? (
              <Scatter
                yAxisId='left'
                name='ECC'
                data={ECCData}
                fill='#3481f6'
              />
            ) : algSelected === 'RSA*' ? (
              <Scatter
                yAxisId='left'
                name='RSA*'
                data={RSAStarData}
                fill='#ef1ab9'
              />
            ) : null}
            <Legend />
          </ScatterChart>
        </motion.div>
      ) : (
        <motion.div
          className='noStatsDataContainer'
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className='noStatsDataText'
            // forever animation
            animate={{
              textShadow: ['0px 0px 0px #dcdcdc', '200px 20px 20px #dcdcdc'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            No data to display
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Statistic;
