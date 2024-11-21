import { attendance, students } from "@/utils/schema";
import { db } from "../../../utils/dbConfig";
import exp from "constants";
import { eq, and, or, isNull } from "drizzle-orm";

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
            date:attendance.date,
            batch:students.batchId,
            studentId: students.id,
            attendanceId:attendance.id
    
        })
        .from(students)
            .leftJoin(
                attendance,
                and(
                    eq(attendance.studentId, students.id), // Match student IDs
                    eq(attendance.date, month)             // Match specific date
                )
            )
            .where(eq(students.batchId, batch)); // Filter by batch
        // .from(attendance)
        //     .innerJoin(
        //         students,
        //         and(
        //             eq(attendance.studentId, students.id), // Match student IDs
        //             eq(students.batchId, batch)          // Filter by batch
        //         )
        //     )
        //     .where(and(
        //         eq(attendance.date, month),               // Filter by date
        //         // eq(attendance.isPresent, true)           // Only present students
        //     ));
        // .from(students)
        // .leftJoin(attendance,and(eq(students.id,attendance.studentId)))
        // .where(eq(students.batchId,batch))
        // .where(eq(attendance.date, month))

        return NextResponse.json(result)
    }catch(err){
        console.log("Error fetching attendance data" + err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export async function POST(req) {
    const data = await req.json();
    const result=await db.insert(attendance)
    .values({
        id:data.id,
        present:data.present,
        date:data.date
    });
    return NextResponse.json({ success: true, result });
}
export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const date = searchParams.get('date');

    const result = await db.delete(attendance)
        .where(
            and(
                eq(attendance.id, id),
                eq(attendance.date, date)
            )
        );

    return NextResponse.json(result);
}