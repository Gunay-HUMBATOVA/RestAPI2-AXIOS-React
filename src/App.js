import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Loading from "./components/Loading";

const Login = lazy(() => import("./components/Login"));
const Employees = lazy(() => import("./components/Employees"));
const ChangePSW = lazy(() => import("./components/ChangePSW"));

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employees-table" element={<Employees />} />
            <Route path="/change-password" element={<ChangePSW />} />
          </Routes>
        </Suspense>
      </header>
    </div>
  );
}
