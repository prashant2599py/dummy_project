import { attendance, students } from "@/utils/schema";
import { db } from "../../../utils/dbConfig";
import exp from "constants";
import { eq, and} from "drizzle-orm";

import { NextResponse } from "next/server";
export async function GET(req) {
    try{

        const searchParams=req.nextUrl.searchParams;
        const batch=searchParams.get('batch');
        const month=searchParams.get('month');

        console.log(batch, month);
        if (!batch || !month) {
            // Validate the input parameters
            return NextResponse.json({ error: 'Missing required parameters: batch or month' }, { status: 400 });
        }
        const result =await db.select({
            name:students.name,
            present:attendance.isPresent,
            month_year: attendance.monthYear,
            day: attendance.day,
            batch:students.batchId,
            studentId: students.id,
            attendanceId:attendance.id
    
        })
        .from(students)
            .leftJoin(
                attendance,
                and(
                    eq(attendance.studentId, students.id), // Match student IDs
                    eq(attendance.monthYear, month)             // Match specific date
                )
            )   
            .where(eq(students.batchId, batch)); // Filter by batch

        return NextResponse.json(result)
    }catch(err){
        console.log("Error fetching attendance data" + err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export async function POST(req) {
    const data = await req.json();
    // console.log(data);
    const result=await db.insert(attendance)
    .values({
        studentId:data.studentId,
        isPresent:data.present,
        monthYear:data.monthYear,
        day: data.day
    });
    return NextResponse.json({ success: true, result });
}
export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const monthYear = searchParams.get('monthYear');
    const day = searchParams.get('day');

    const result = await db.delete(attendance)
    .where(
        and(
            eq(attendance.studentId, studentId),
            eq(attendance.monthYear, monthYear),
            eq(attendance.day, day)

        )
    ) 

    return NextResponse.json(result);
}