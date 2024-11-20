import React, { useEffect, useState } from 'react';
import { getUniqueRecord } from '../../_services/service';
import moment from 'moment';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import Card from './Card';  // Import the Card component

function StatusList({ attendanceList }) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPerc, setPresentPerc] = useState(0);

    useEffect(() => {
        if (attendanceList) {
            const totalSt = getUniqueRecord(attendanceList);
            setTotalStudent(totalSt.length);

            const presentCount = attendanceList.filter(record => record.isPresent).length;
            const PresentPrec = (presentCount / totalSt.length) * 100;
            setPresentPerc(PresentPrec);
        }
    }, [attendanceList]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card icon={<GraduationCap />} title='Total Student' value={totalStudent} />
            <Card icon={<TrendingUp />} title='Total Present' value={presentPerc.toFixed(1) + '%'} />
            <Card icon={<TrendingDown />} title='Total Absent' value={(100 - presentPerc).toFixed(1) + "%"} />
        </div>
    );
}

export default StatusList;
