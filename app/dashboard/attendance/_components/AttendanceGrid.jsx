import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import "ag-grid-community/styles/ag-theme-alpine.css";
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'react-toastify';

// const pagination = true;
// const paginationPageSize = 10;
// const paginationPageSizeSelector = [25, 50, 100];

export default function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'studentId'},
        { field: 'name'},
    ]);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberofdays = daysInMonth(moment(selectedMonth).format('YYYY'), moment(selectedMonth).format('MM'));
    const daysArrays = Array.from({ length: numberofdays }, (_, i) => i + 1);

    useEffect(() => {
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
                    obj[date] = isPresent(obj.studentId, date);
                });
            });
        }
    }, [attendanceList, selectedMonth]);

    // Check if a student was present on a specific day
    const isPresent = (studentId, day) => {
        const result = attendanceList.find(
            (item) => item.studentId === studentId && item.day === day );
        return result ? true : false;
    };

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attendanceList?.forEach((record) => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push({
                    studentId: record.studentId,
                    name: record.name
                });
            }
        });
        return uniqueRecord;
    };

    const onMarkAttendance = (day,studentId, presentStatus) => {
        const date = moment(selectedMonth).format('yyyy/MM');
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                monthYear: date,
            };
            GlobalApi.MarkAttendance(data).then(resp => {
                console.log("marked present");
                toast("Student id: " + studentId + "marked as present");
                
            });
        } else {
            GlobalApi.MarkAbsent(studentId, date, day).then(resp => {
                toast(`Student Id:${studentId} Marked as absent`);
            });
        }
    };

    return (
        <div>
             <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
                />
            </div>
        </div>
    );
}

