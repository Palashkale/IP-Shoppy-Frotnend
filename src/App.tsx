import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import EmptyState from './components/EmptyState';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { taskService } from './services/taskService';
import { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter]);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to connect to the API. Please ensure your backend is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (activeFilter) {
      case 'active':
        filtered = filtered.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter((task) => task.completed);
        break;
      case 'upcoming':
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate > today && !task.completed;
        });
        break;
      case 'today':
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
        break;
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      await taskService.createTask(taskData);
      await loadTasks();
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id'>) => {
    if (!editingTask?.id) return;
    try {
      await taskService.updateTask(editingTask.id, taskData);
      await loadTasks();
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await taskService.toggleTaskStatus(id);
      await loadTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
      alert('Failed to toggle task status. Please try again.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      await loadTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar
        isOpen={isSidebarOpen}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main
        className={`pt-14 transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeFilter === 'all' && 'All Tasks'}
                {activeFilter === 'active' && 'Active Tasks'}
                {activeFilter === 'completed' && 'Completed Tasks'}
                {activeFilter === 'upcoming' && 'Upcoming Tasks'}
                {activeFilter === 'today' && "Today's Tasks"}
              </h1>
              <p className="text-gray-600">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Task</span>
            </button>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : filteredTasks.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        editTask={editingTask}
      />
    </div>
  );
}

export default App;
