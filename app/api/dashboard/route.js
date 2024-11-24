import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { attendance, students } from "../../../utils/schema";
import { db } from "../../../utils/dbConfig";


export async function GET(req) {
    const searchParams=req.nextUrl.searchParams;
    const monthYear=searchParams.get('monthYear')
    const batch=searchParams.get('batch')
    const result=await db.select({

        day:attendance.day,
        presentCount:sql`count(${attendance.day})`
    }).from(attendance)
    .innerJoin(students, eq(attendance.studentId,students.id))
    .groupBy(attendance.day)
    .where(eq(students.batchId,batch), eq(attendance.monthYear, monthYear))
    .orderBy(desc(attendance.day))
    .limit(7)
    return NextResponse.json(result);
}