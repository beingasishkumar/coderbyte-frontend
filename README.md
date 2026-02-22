# Task Management Application - Frontend

A responsive, single-page application (SPA) built to manage tasks efficiently. This frontend consumes the Task API backend and provides a seamless, minimalist user interface for creating, reading, updating, and deleting tasks.

## 🛠 Tech Stack

* **Core:** React 18, TypeScript
* **Build Tool:** Vite (for rapid development and optimized production builds)
* **Routing:** React Router DOM v6
* **State Management:** React Context API
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios

## 🏗 Architectural Decisions

* **State Management:** Opted for a well-structured **Context API** approach over Redux. Given the current scope of the application (managing a single domain of tasks), Redux would introduce unnecessary boilerplate. Context provides a clean, native solution for global state while keeping the bundle size small.
* **TypeScript:** Utilized strictly for enhanced code quality, maintainability, and developer experience. Type interfaces (`src/types.ts`) are decoupled from components to ensure clean imports and compatibility with Vite's Fast Refresh.
* **Component Design:** Followed functional programming principles using React Hooks. The UI components are separated from the API service layer (`src/services/api.ts`) to enforce the Single Responsibility Principle.
* **Payload Structure:** Designed the application to pass identifier data within the `PUT` request body rather than relying on URL parameters, ensuring a cleaner synchronization with the backend contract.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn

### Installation & Setup

1.  **Clone the repository and navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment (Optional):**
    The app is configured to proxy API requests to `http://localhost:8080` via `vite.config.ts`. Ensure your Spring Boot backend is running on this port to avoid CORS issues.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components (TaskList, TaskForm)
├── context/          # React Context providers (TaskContext)
├── services/         # External integrations (Axios API client)
├── App.tsx           # Main application routing and layout
├── main.tsx          # React application entry point
└── types.ts          # Global TypeScript interfaces