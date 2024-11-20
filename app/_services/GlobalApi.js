import axios from "axios";

// Create an axios instance with a base URL if needed
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Update with your actual base URL
});

// Fetch all batches
const GetAllBatch = async () => {
  try {
    const resp = await axiosInstance.get(`/api/auth/${kindeAuthParam}/batch`); // Adjusted path
    if (resp?.data && Array.isArray(resp.data)) {
      return resp.data;
    } else {
      throw new Error('Invalid response format from GetAllBatch');
    }
  } catch (error) {
    console.error("Failed to fetch batches:", error);
    throw error;
  }
};

// Create a new student
const CreateNewStudent = async (data) => {
  try {
    const resp = await axiosInstance.post('/api/student', data); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to add new student:", error);
    throw error;
  }
};

// Get all students
const GetAllStudents = async () => {
  try {
    const resp = await axiosInstance.get('/api/student'); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw error;
  }
};

// Delete a student record by ID
const deleteStudentRecord = async (id) => {
  try {
    const resp = await axiosInstance.delete(`/api/student/route?id=${id}`); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to delete student:", error);
    throw error;
  }
};

// Fetch attendance list based on batch and month
const GetAttendanceList = async (batch, month) => {
  try {
    // console.log("Route")
    const resp = await axiosInstance.get(`/api/attendance?batch=${batch}&month=${month}`); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to fetch attendance:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Mark attendance for a student
const MarkAttendance = async (data) => {
  try {
    const resp = await axiosInstance.post('/api/attendance/route', data); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to mark attendance:", error);
    throw error;
  }
};

// Mark a student absent by ID and date
const MarkAbsent = async (id, date) => {
  try {
    const resp = await axiosInstance.delete(`/api/attendance/route?id=${id}&date=${date}`); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to mark absent:", error);
    throw error;
  }
};

// Fetch total present count by day and batch
const TotalPresentCountByDay = async (date, batch) => {
  try {
    const resp = await axiosInstance.get(`/api/dashboard/route?date=${date}&batch=${batch}`); // Adjusted path
    return resp.data;
  } catch (error) {
    console.error("Failed to fetch present count:", error);
    throw error;
  }
};

export default {
  GetAllBatch,
  CreateNewStudent,
  GetAllStudents,
  deleteStudentRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay,
};
