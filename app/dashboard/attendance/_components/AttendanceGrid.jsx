import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
// import { toast } from 'sonner';
// import GlobalApi from '@/app/_services/GlobalApi';

// const pagination = true;
// const paginationPageSize = 10;
// const paginationPageSizeSelector = [25, 50, 100];

export default function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'id'},
        { field: 'name'},
    ]);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberofdays = daysInMonth(moment(selectedMonth).format('YYYY'), moment(selectedMonth).format('MM'));
    const daysArrays = Array.from({ length: numberofdays }, (_, i) => i + 1);

    useEffect(() => {
        // console.log("Received attendanceList:", attendanceList);
        if (attendanceList) {
            const userList = getUniqueRecord();
            console.log(userList);
            setRowData(userList);

            daysArrays.forEach((date) => {
                setColDefs((prevData) => [
                    ...prevData,
                    { field: date.toString(), width: 50, editable: true },
                ]);

                userList.forEach((obj) => {
                    const dayString = moment(selectedMonth)
                        .date(date) // Set the day in the selected month
                        .format('DD'); // Get the day in 'DD' format
                    obj[date] = isPresent(obj.id, dayString);
                });
            });
        }
    }, [attendanceList, selectedMonth]);

    const isPresent = (id, day) => {
        const result = attendanceList.find((item) => item.day === day && item.id === id);
        return result ? true : false;
    };

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attendanceList?.forEach((record) => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push({
                    id: record.studentId,
                    name: record.name
                });
            }
        });
        return uniqueRecord;
    };

    // const onMarkAttendance = (day, id, presentStatus) => {
    //     const date = moment(selectedMonth).format('MM/YYYY');
    //     if (presentStatus) {
    //         const data = {
    //             id: id,
    //             present: presentStatus,
    //             date: date,
    //         };
    //         GlobalApi.MarkAttendance(data).then((resp) => {
    //             console.log(resp);
    //             toast(`Student Id:${id} Marked as present`);
    //         });
    //     } else {
    //         GlobalApi.MarkAbsent(id, date).then((resp) => {
    //             toast(`Student Id:${id} Marked as absent`);
    //         });
    //     }
    // };

    return (
        <div>
             <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
        </div>
    );
}

