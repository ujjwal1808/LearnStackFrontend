import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import url from '../lib/url';
import { useEffect, useState } from 'react';

// #region Sample data
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// #endregion
const AdminPieChart = () => {

    const [pieData, setPieData] = useState([])

    const getData = async () =>{
        const res = await axios.get(`${url}admin/all/category`);
        
        const formatted = res.data.map(item => ({

        name: item.category,

        value: item.nums

    }));

    setPieData(formatted);
        
    }
    useEffect(() => {
      getData();
      console.log(pieData)
    }, [])
    
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={pieData} nameKey="name" fill="#8884d8" label={({ name, value }) => `${name} (${value})`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminPieChart;