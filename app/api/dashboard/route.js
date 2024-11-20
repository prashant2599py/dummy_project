import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { attendance, students } from "../../../utils/schema";
import { db } from "../../../utils/dbConfig";


export async function GET(req) {
    const searchParams=req.nextUrl.searchParams;
    const date=searchParams.get('date')
    const grade=searchParams.get('batch')
    const result=await db.select({

        day:attendance.day,
        presentCount:sql`count(${attendance.day})`
    }).from(attendance)
    .leftJoin(students, and (eq(attendance.studentID,students),eq(attendance.date,date)))
    .groupby(attendance.day)
    .where(eq(students.batch,batch))
    .orderBy(desc(attendance.day))
    .limit(7)
    return NextResponse.json(result);
}