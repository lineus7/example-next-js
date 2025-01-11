import pool from "@/lib/postgres";
import { NextResponse } from "next/server";

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todo_list (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const insertDataQuery = `
  INSERT INTO todo_list (title, description, is_completed, created_at)
  VALUES
    ('Buy Groceries', 'Milk, Bread, Eggs, and Fruits', FALSE, NOW()),
    ('Read a Book', 'Finish reading the novel', FALSE, NOW()),
    ('Workout', '30-minute cardio session', TRUE, NOW());
`;

export async function GET() {
  try {
    // Create the table if it doesn't exist
    await pool.query(createTableQuery);

    // Insert mock to-do items
    await pool.query(insertDataQuery);

    return NextResponse.json(
      { status: 200, message: "To-Do list table created and items inserted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { status: 500, message: "Database operation failed." },
      { status: 500 }
    );
  }
}
