import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface GCoinChartProps {
  data: Array<number>;
  width: number;
}

export default function GCoinChart({ data, width }: GCoinChartProps) {

  React.useEffect(() => {
    getData()
  }, [width])


  function getData() {
    var newData: { date: string; value: number; }[] = [];
    data.forEach((value, index) => {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - 30 + index)
      newData.push({ "date": newDate.toLocaleDateString('en-AU'), "value": value });
    })
    return newData;
  }

  return (
    <ResponsiveContainer width={width} height={400}>
      <LineChart data={getData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}