import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import nodemailer from 'nodemailer'

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
    const data = await request.json()

    // Validate form data
    const validationErrors = validateForm(data)
    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 })
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `
    };

    // Connect to MongoDB
    const client = new MongoClient(uri)
    await client.connect()

    // Save to database
    const database = client.db("portfolio")
    const collection = database.collection("messages")

    const message = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      timestamp: new Date()
    }

    // Perform both operations
    await Promise.all([
      collection.insertOne(message),
      transporter.sendMail(mailOptions)
    ]);

    // Close MongoDB connection
    await client.close()

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}

