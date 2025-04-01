import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// MongoDB connection string
const uri = process.env.MONGODB_URI

// Form validation
const validateForm = (data: any) => {
  const errors = []

  if (!data.name || data.name.length < 2) {
    errors.push("Name must be at least 2 characters")
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push("Valid email is required")
  }

  if (!data.subject || data.subject.length < 5) {
    errors.push("Subject must be at least 5 characters")
  }

  if (!data.message || data.message.length < 10) {
    errors.push("Message must be at least 10 characters")
  }

  return errors
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const data = await request.json()

    // Validate form data
    const validationErrors = validateForm(data)
    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 })
    }

    // Check if MongoDB URI is configured
    if (!uri) {
      console.error("MONGODB_URI is not defined")
      return NextResponse.json({ success: false, message: "Database configuration error" }, { status: 500 })
    }

    // Connect to MongoDB
    const client = new MongoClient(uri)
    await client.connect()

    // Access database and collection
    const database = client.db("portfolio")
    const collection = database.collection("messages")

    // Create message document
    const message = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date(),
    }

    // Insert message into collection
    await collection.insertOne(message)

    // Close connection
    await client.close()

    // Return success response
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error submitting contact form:", error)

    // Return error response
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 },
    )
  }
}

