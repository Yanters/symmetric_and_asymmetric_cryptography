import React, { useContext } from 'react';
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return <CryptoCard crypto={payload[0]?.payload} />;
  }

  return null;
};

const Statistic = () => {
  const { crypto } = useContext(CryptoContext);

  //  0 - alg AES, 1 - alg Blowfish, 2 - RSA, 3 - alg ECC
  const AESData = crypto.filter((crypto) => crypto.alg === 'AES');
  const BlowfishData = crypto.filter((crypto) => crypto.alg === 'Blowfish');
  const RSAData = crypto.filter((crypto) => crypto.alg === 'RSA');
  const ECCData = crypto.filter((crypto) => crypto.alg === 'ECC');

  return (
    <div>
      <h1>Statistics</h1>
      {AESData.length > 0 ||
      BlowfishData.length > 0 ||
      RSAData.length > 0 ||
      ECCData.length > 0 ? (
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
          <XAxis type='number' dataKey='fileSize' name='size' unit='bytes' />
          <YAxis
            yAxisId='left'
            type='number'
            dataKey='totalTime'
            name='time'
            unit='ms'
            stroke='#8884d8'
          />

          <Tooltip
            // cursor={{ strokeDasharray: '3 3' }}
            content={<CustomTooltip />}
          />
          <Scatter yAxisId='left' name='AES' data={AESData} fill='#8884d8' />
          <Scatter
            yAxisId='left'
            name='Blowfish'
            data={BlowfishData}
            fill='#82ca9d'
          />
          <Scatter yAxisId='left' name='RSA' data={RSAData} fill='#ffc658' />
          <Scatter yAxisId='left' name='ECC' data={ECCData} fill='#ff0000' />
          <Legend />
        </ScatterChart>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default Statistic;
