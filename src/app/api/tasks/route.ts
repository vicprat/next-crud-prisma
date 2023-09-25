import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'
export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data)
    const newTask = await prisma.task.create({
        data: data
    })
    return NextResponse.json(newTask)
}   