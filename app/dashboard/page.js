"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import moment from "moment";
import MonthSelection from "../_comp/MonthSelection"; // Updated path
import BatchSelection from "../_comp/BatchSelection"; // Updated path
import StatusList from "./_components/StatusList"; // Updated path
import BarChartComponent from "./_components/BarChartComponent"; // Updated path
import PieChartComponent from "./_components/PieChartComponent"; // Updated path
import GlobalApi from "@/app/_services/GlobalApi"; // Import GlobalApi

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MM/YYYY"));
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    if (selectedBatch && selectedMonth) {
      fetchAttendanceData();
    }
  }, [selectedMonth, selectedBatch]);

  // Fetch Attendance List
  const fetchAttendanceData = async () => {
    try {
      await Promise.all([getStudentAttendance(), GetTotalPresentCountByDay()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStudentAttendance = async () => {
    try {
      const resp = await GlobalApi.GetAttendanceList(
        selectedBatch,
        moment(selectedMonth, "MM/YYYY").format("MM/YYYY")
      );
      setAttendanceList(resp.data);
    } catch (error) {
      console.error("Error fetching attendance list:", error);
    }
  };

  const GetTotalPresentCountByDay = async () => {
    try {
      const resp = await GlobalApi.TotalPresentCountByDay(
        moment(selectedMonth, "MM/YYYY").format("MM/YYYY"),
        selectedBatch
      );
      setTotalPresentData(resp.data);
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
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <BatchSelection
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
          />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} /> {/* Updated path */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartComponent
            attendanceList={attendanceList}
            totalPresentData={totalPresentData}
          />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
