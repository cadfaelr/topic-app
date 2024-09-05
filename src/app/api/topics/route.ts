import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbconnect";
import { Topic } from "@/models/Topic";
import { TopicContent, TopicContentDocument } from "@/models/TopicContent";
import { decrypt, encrypt } from "@/utils/aes";

const deponents = [
  "Kathryn Murphy",
  "Courtney Henry",
  "Devon Lane",
  "Arlene McCoy",
  "Theresa Webb",
];

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const skip = (page - 1) * size;


  const topics = await Topic.find().populate('topicContents').skip(skip).limit(size).sort({ createdAt: -1 });

  const total = await Topic.countDocuments().exec();

  return NextResponse.json({
    topics: topics.map(topic => ({
      topic: topic.topic,
      topicContents: topic.topicContents.map((content: any) => ({
        deponent: content.deponent,
        content: content.content,
        fromTime: content.fromTime,
        toTime: content.toTime,
        score: content.score,
      })),
    })),
    total,
    page,
    size,
  });
}

export async function POST(request: NextRequest) {
  await dbConnect(); // Connect to the database

  const body = await request.json();
  const { topic } = body;

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const contents = await Promise.all(deponents.map(deponent => TopicContent.create({
    deponent,
    content: `Sample content for ${topic} by ${deponent}`,
    fromTime: `${Math.floor(Math.random() * 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    toTime: `${Math.floor(Math.random() * 10 + 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    score: Math.floor(Math.random() * 100).toString(),
  })));

  await Topic.create({
    topic: topic,
    topicContents: contents.map(content => content._id),
  });

  return NextResponse.json({ topic }, { status: 201 });
}
