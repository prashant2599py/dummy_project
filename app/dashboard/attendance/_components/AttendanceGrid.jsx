import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from 'moment';
import { toast } from 'sonner';
import GlobalApi from '@/app/_services/GlobalApi';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

export default function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'id', filter: true },
        { field: 'name', filter: true },
    ]);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberofdays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'));
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
                    obj[date] = isPresent(obj.id, date);
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
        attendanceList.forEach((record) => {
            if (!existingUser.has(record.id)) {
                existingUser.add(record.id);
                uniqueRecord.push(record);
            }
        });
        return uniqueRecord;
    };

    const onMarkAttendance = (day, id, presentStatus) => {
        const date = moment(selectedMonth).format('MM/YYYY');
        if (presentStatus) {
            const data = {
                id: id,
                present: presentStatus,
                date: date,
            };
            GlobalApi.MarkAttendance(data).then((resp) => {
                console.log(resp);
                toast(`Student Id:${id} Marked as present`);
            });
        } else {
            GlobalApi.MarkAbsent(id, date).then((resp) => {
                toast(`Student Id:${id} Marked as absent`);
            });
        }
    };

    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) =>
                        onMarkAttendance(e.colDef.field, e.data.id, e.newValue)
                    }
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

