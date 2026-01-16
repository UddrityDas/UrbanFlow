# UrbanFlow 🚌

UrbanFlow is a modern, real-time transit tracking application designed for Hamilton, Ontario. It provides a seamless "Uber-like" experience for tracking buses, visualizing routes, and monitoring live transit data.

![UrbanFlow Badge](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **Real-Time Tracking**: Live vehicle positions updated every 2 seconds.
- **Interactive Map**: Full-screen Leaflet map with CartoDB Dark Matter tiles for a premium aesthetic.
- **Route Visualization**: Color-coded route paths overlay.
- **Sidebar Navigation**: "Active Routes" panel to filter and zoom to specific bus lines.
- **Custom Markers**: Distinct bus icons with popup details (Route ID, Vehicle ID).
- **Responsive Design**: Built with Tailwind CSS for a clean, mobile-friendly interface.

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web server framework.
- **SQLite3**: Lightweight, file-based relational database.
- **CORS**: Middleware for cross-origin resource sharing.

### Frontend
- **React**: UI library (bootstrapped with Vite).
- **Leaflet / React-Leaflet**: Interactive maps.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Next-generation frontend tooling.

## 📂 Project Structure

```
UrbanFlow/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # MapComponent, Sidebar
│   │   ├── App.jsx         # Main layout
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles (Tailwind)
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── database.js             # SQLite connection & seeding
├── server.js               # Express server & simulation logic
├── package.json            # Backend dependencies
└── urbanflow.db            # SQLite database file (generated)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+ recommended)
- **npm** (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd UrbanFlow
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

## 🏃‍♂️ Running the Application

You need to run the backend and frontend in separate terminal windows.

### 1. Start the Backend Server
The backend runs on port `3001`. It handles the API and the background vehicle simulation.

```bash
# From the root directory
node server.js
```
*Output should indicate: `Server running on http://localhost:3001`*

### 2. Start the Frontend Client
The frontend runs on port `5173` (default Vite port).

```bash
# From the root directory
cd client
npm run dev
```
*Open your browser to: `http://localhost:5173`*

## 📡 API Documentation

### Get All Routes
Returns a list of all static bus routes.

- **Endpoint**: `GET /api/routes`
- **Response**:
  ```json
  [
    {
      "id": "1",
      "name": "1 KING",
      "color": "#FF0000",
      "path": [[43.2580, -79.9000], ...]
    },
    ...
  ]
  ```

### Get Live Vehicles
Returns the current real-time positions of all vehicles.

- **Endpoint**: `GET /api/vehicles`
- **Response**:
  ```json
  [
    {
      "id": "v-1",
      "route_id": "1",
      "lat": 43.2581,
      "lng": -79.9001,
      "heading": 0
    },
    ...
  ]
  ```

## 🧠 Simulation Logic
The backend includes a background worker that runs every **2 seconds**. It updates the latitude and longitude of every vehicle in the `vehicles` table by a small random factor to simulate movement.

## 📄 License
This project is licensed under the MIT License.
