import { Task } from '../types/task';
import { CheckCircle2, Circle, Calendar, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => task.id && onToggle(task.id)}
            className="flex-shrink-0 mt-1 transition-transform hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold mb-2 ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.name}
            </h3>
            <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span
                className={`text-xs ${
                  isOverdue()
                    ? 'text-red-600 font-semibold'
                    : task.completed
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {formatDate(task.dueDate)}
                {isOverdue() && ' (Overdue)'}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => {
                      onEdit(task);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      task.id && onDelete(task.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
