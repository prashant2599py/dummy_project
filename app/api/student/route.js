// Import necessary modules and configuration
import { NextResponse } from "next/server";
import { db } from '../../../utils/dbConfig'; // Confirm this path is correct
import { students } from "@/utils/schema";
import { eq } from 'drizzle-orm'; // Import `eq` for use in DELETE queries

// POST handler to insert a new student record
export async function POST(req,res) {
  try {
    // console.log("POST request received at app/api/student/route.js");
    const data = await req.json();
    console.log("Received data:", data);

    // Insert student data into the `students` table
    const result = await db.insert(students).values({
      name: data.name,
      email: data.email,
      batchId: data.batch,       // `batch` should map to a valid batch ID
      id: data.id,
      createdBy: 1,              // Set `createdBy` to a fixed or dynamic value
    });

    console.log("Insert result:", result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting student:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// GET handler to fetch all students
export async function GET(req) {
  try {
    console.log("GET request received at app/api/student");
    const result = await db.select().from(students);
    console.log("Fetch result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching students in API:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message || error }, { status: 500 });
  }
}


// DELETE handler to delete a student record by ID
export async function DELETE(req) {
  try {
    console.log("DELETE request received at app/api/student");
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log("ID to delete:", id);

    if (!id) {
      console.log("No ID provided for deletion");
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

    // Delete the student record where the ID matches
    const result = await db.delete(students).where(eq(students.id, id));
    console.log("Delete result:", result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
