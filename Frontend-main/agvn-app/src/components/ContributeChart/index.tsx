import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ContributeChartProps {
  data: Array<number>;
  width: number;
}

export default function ContributeChart({ data, width }: ContributeChartProps) {

  React.useEffect(() => {
    getData()
  }, [width])


  function getData() {
    var newData: { date: string; contribution: number; }[] = [];
    data.forEach((value, index) => {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - 30 + index)
      newData.push({ "date": newDate.toLocaleDateString('en-AU'), "contribution": value });
    })
    return newData;
  }

  return (
    <ResponsiveContainer width={width} height={400}>
      <BarChart data={getData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="contribution" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}