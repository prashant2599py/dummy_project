import {NextResponse} from "next/server";
import {db} from "@/utils";
import { batch } from "../../../../../utils/schema";
export async function GET (req){
    const result=await db.select().from(batch);
    return NextResponse.json(result);
}