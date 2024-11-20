import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import { getUniqueRecord } from '../../_services/service';
import moment from 'moment/moment';

function PieChartComponent({attendanceList}) {
    const data01 = [
        {
          "name": "Group A",
          "value": 400
        },
        {
          "name": "Group B",
          "value": 300
        },
    ]
    const [data,setData]=useState([])

    useEffect(()=>{
        if(attendanceList)
        {
            const totalSt=getUniqueRecord(attendanceList);        
            const today=moment().format('D')
            const PresentPrec=(attendanceList.length/(totalSt.length*Number(totalSt))*100)
            setData([
                {
                    name:'Total Present',
                    value:Number  (PresentPrec.toFixed(1)),
                    fill:'#4c8cf8'
                },
                {
                    name:'Total Absent',
                    value:(100-Number(PresentPrec.toFixed(1))),
                    fill:'1fe6d1'
                },
            ])
        }

    },[attendanceList])
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Monthly Attendance </h2>
        <ResponsiveContainer width={'100%'} height={'300'}>
        
        <PieChart width={730} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
        </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent