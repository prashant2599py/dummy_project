"use client";
// import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import moment from "moment";
import MonthSelection from "../_comp/MonthSelection"; // Updated path
import BatchSelection from "../_comp/BatchSelection"; // Updated path
import StatusList from "./_components/StatusList"; // Updated path
import BarChartComponent from "./_components/BarChartComponent"; // Updated path
import PieChartComponent from "./_components/PieChartComponent"; // Updated path
import GlobalApi from "@/app/_services/GlobalApi"; // Import GlobalApi

function Dashboard() {
  // const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedBatch, setSelectedBatch] = useState(1);
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState();

  useEffect(() => {
    getStudentAttendance();
    GetTotalPresentCountByDay();
  }, [selectedBatch]);

  useEffect(()=> {
    getStudentAttendance();
    GetTotalPresentCountByDay();
  },[selectedMonth])

  const getStudentAttendance = async () => {
    try {
      const resp = await GlobalApi.GetAttendanceList(selectedBatch, moment(selectedMonth).format("YYYY/MM"))
      setAttendanceList(resp);
    } catch (error) {
      console.error("Error fetching attendance list:", error);
    }
  };

  const GetTotalPresentCountByDay = async () => {
    try {
      const resp = await GlobalApi.TotalPresentCountByDay(
        moment(selectedMonth).format("YYYY/MM"),
        selectedBatch
      );
      // console.log(resp);
      setTotalPresentData(resp);
    } catch (error) {
      console.error("Error fetching total present data:", error);
    }
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection
            selectedMonth={(value) => {setSelectedMonth(value);}}
            // setSelectedMonth={selectedMonth}
          />
          <BatchSelection 
            selectedBatch={(value) => {setSelectedBatch(value);}}
            // setSelectedBatch={selectedBatch}
          />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />   

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <BarChartComponent  attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />

        </div>  
      </div>  
    </div>
  );
}

export default Dashboard;
