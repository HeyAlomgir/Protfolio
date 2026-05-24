import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;


export async function POST(request) {
  try {
    const body = await request.json();

    // মঙ্গোডিবি ডাটাবেসের সাথে কানেক্ট হওয়া
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db("portfolio"); // ডাটাবেসের নাম 'portfolio'

    // 'messages' নামের কালেকশন বা টেবিলে ফর্মের ডাটা সেভ হচ্ছে
    const result = await db.collection("messages").insertOne({
      name: body.username,
      email: body.useremail,
      message: body.usermessage,
      createdAt: new Date()
    });

    await client.close(); // কানেকশন বন্ধ করা হলো

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error("MongoDB Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
