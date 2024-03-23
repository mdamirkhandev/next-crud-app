import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
        await ConnectDB();
}

LoadDB();

export async function GET(request) {
    const todos = await TodoModel.find({});
    return NextResponse.json({ todos: todos });
}
export async function POST(request) {
    const { title, description } = await request.json();
    await TodoModel.create({ title, description });
    return NextResponse.json({ msg: "Todo Created" });
}

export async function DELETE(request) {
    const mongoID = request.nextUrl.searchParams.get("mongoID");
    await TodoModel.findByIdAndDelete(mongoID);
    return NextResponse.json({ msg: "Todo Deleted" });
}

export async function PUT(request) {
    const mongoID = request.nextUrl.searchParams.get("mongoID");
    await TodoModel.findByIdAndUpdate(mongoID, { $set: { isCompleted: true } });
    return NextResponse.json({ msg: "Todo Completed" });
}