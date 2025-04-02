export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: Author;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Creating Immersive 3D Experiences with React Three Fiber",
    excerpt: "Learn how to build interactive 3D web experiences using React Three Fiber and Three.js.",
    content: `
# Creating Immersive 3D Experiences with React Three Fiber

React Three Fiber is a powerful library that brings Three.js to React, making it easier than ever to create immersive 3D experiences on the web. In this comprehensive guide, we'll explore how to set up a React Three Fiber project, create basic 3D scenes, and add interactivity.

## Getting Started

First, let's set up a new React project and install the necessary dependencies. We'll need @react-three/fiber and three.js as our core dependencies.

\`\`\`bash
npm create vite@latest my-3d-app -- --template react-ts
cd my-3d-app
npm install three @react-three/fiber @react-three/drei
\`\`\`

## Creating Your First Scene

Once we have our dependencies installed, we can create our first 3D scene. We'll start with a simple cube that rotates when the user interacts with it.

\`\`\`jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'

function Cube(props) {
  const [hovered, setHover] = useState(false)
  
  return (
    <mesh
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Cube position={[-1.2, 0, 0]} />
      <Cube position={[1.2, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
\`\`\`

## Adding Interactivity

One of the great things about React Three Fiber is how easily we can add interactivity to our 3D objects. We can use hooks like useFrame for animations and respond to user events just like we would in regular React components.

## Optimizing Performance

When working with 3D graphics, performance is crucial. We'll look at various optimization techniques including proper use of useMemo, buffer geometries, and implementing level of detail (LOD).

## Advanced Techniques

Finally, we'll explore some advanced techniques like implementing custom shaders, working with textures, and creating complex animations using React Spring.
    `,
    image: "/placeholder.svg?height=600&width=800",
    date: "March 15, 2023",
    readTime: "8 min read",
    category: "Development",
    tags: ["React", "Three.js", "WebGL"],
    author: {
      name: "Ram Rajurkar",
      avatar: "/images/avatar.jpg",
      role: "Full Stack Developer"
    }
  },
  {
    id: 2,
    title: "Building a Full-Stack Application with MERN Stack",
    excerpt: "A comprehensive guide to creating a full-stack application using MongoDB, Express, React, and Node.js.",
    content: `
# Building a Full-Stack Application with MERN Stack

The MERN stack is a powerful combination of MongoDB, Express, React, and Node.js that allows developers to build complete web applications with JavaScript throughout the entire stack.

## Setting Up Your Development Environment

Before we begin, let's make sure we have all the necessary tools installed:

- Node.js and npm
- MongoDB
- A code editor (VS Code recommended)

## Creating the Backend API

We'll start by setting up our Express server and connecting it to MongoDB:

\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
\`\`\`

## Building the React Frontend

Next, we'll create our React application with modern hooks and context API for state management.

## Connecting Frontend to Backend

Finally, we'll connect our React frontend to our Express API using Axios for HTTP requests.
    `,
    image: "/placeholder.svg?height=600&width=800",
    date: "February 28, 2023",
    readTime: "12 min read",
    category: "Development",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    author: {
      name: "Ram Rajurkar",
      avatar: "/images/avatar.jpg",
      role: "Full Stack Developer"
    }
  }
  // Add more blog posts as needed
];