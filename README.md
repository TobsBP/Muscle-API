# Muscle-API

API for managing workout routines, exercises, and user profiles.

## About the Project

This project is a Node.js and Fastify API that provides endpoints for user authentication, creating and managing workout routines, and tracking user progress. It uses Supabase for database and authentication services.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/your_project_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file and add your Supabase credentials. You can use `.env.example` as a template.
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

### Running the project

```sh
npm run dev
```

## API Endpoints

The following are the available API endpoints:

*   **Auth:**
    *   `POST /auth/signup` - Register a new user.
    *   `POST /auth/login` - Login an existing user.
*   **Profile:**
    *   `GET /profile` - Get user profile.
    *   `GET /profile` - Get user profile.
*   **Exercises:**
    *   `GET /exercises` - Get all exercises.
    *   `GET /exercise/:id` - Get a single exercise.
    *   `POST /exercises` - Create a new exercise.
    *   `PUT /exercises/:id` - Update an exercise.
    *   `DELETE /exercises/:id` - Delete an exercise.
*   **Workouts:**
    *   `GET /workouts` - Get all workouts.
    *   `GET /workouts/:id` - Get a single workout.
    *   `POST /workouts` - Create a new workout.
    *   `PUT /workouts/:id` - Update a workout.
    *   `DELETE /workouts/:id` - Delete a workout.

## Technologies Used

*   [Node.js](https://nodejs.org/)
*   [Fastify](https://fastify.io/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Supabase](https://supabase.io/)