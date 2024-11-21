// Attendance/page.js
"use client";
import { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi"; // Adjust this if the path is different
import AttendanceGrid from "./_components/AttendanceGrid";
import MonthSelection from "../../_comp/MonthSelection.jsx";
import BatchSelection from "../../_comp/BatchSelection.jsx";
import { Button } from "@/components/ui/button.jsx";
import moment from "moment";

export default function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedBatch, setSelectedBatch] = useState();

  // const [attendanceData, setAttendanceData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [attendanceList, setAttendanceList] = useState();

  function onSearchHandler(){
    // console.log(selectedMonth, selectedBatch);
    const month = moment(selectedMonth).format('YYYY-MM-DD');
    // console.log(selectedMonth);
    console.log(selectedBatch);
    console.log(month);
    GlobalApi.GetAttendanceList(selectedBatch,month).then(response => {
      console.log(response);
      setAttendanceList(response);
    })
    
  }
  
  return (
    <div>

      <h2>Student Attendance</h2>

      <div className="flex gap-5 p-5 border rounded-lg shadow-sm mx-2 my-2">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Batch:</label>
          <BatchSelection selectedBatch={(value) => setSelectedBatch(value)} />
        </div>
        <Button onClick={() => onSearchHandler()} className="text-white mt-2" >Search</Button>
      </div>

       <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} /> 
      
    </div>
  );
}

// {attendanceData ? (
//   <div>
//     {/* Render your attendance data */}
//     <ul>
//       {attendanceData.map((attendance) => (
//         <li key={attendance.id}>
//           {attendance.studentName} -{" "}
//           {attendance.isPresent ? "Present" : "Absent"}
//         </li>
//       ))}
//     </ul>
//   </div>
// ) : (
//   <div>No data available</div>
// )}
