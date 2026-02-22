import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <TaskProvider>
            <Router>
                <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
                    <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                        <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-tight">TaskFlow</Link>
                        <Link to="/add" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
                            + New Task
                        </Link>
                    </header>

                    <main>
                        <Routes>
                            <Route path="/" element={<TaskList />} />
                            <Route path="/add" element={<TaskForm />} />
                            <Route path="/edit/:id" element={<TaskForm />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </TaskProvider>
    );
}

export default App;
