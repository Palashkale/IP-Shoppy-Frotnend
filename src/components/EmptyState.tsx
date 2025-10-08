import { ListTodo } from 'lucide-react';

interface EmptyStateProps {
  filter: string;
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const getMessage = () => {
    switch (filter) {
      case 'active':
        return 'No active tasks';
      case 'completed':
        return 'No completed tasks';
      case 'upcoming':
        return 'No upcoming tasks';
      case 'today':
        return 'No tasks due today';
      default:
        return 'No tasks yet';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-8 mb-6">
        <ListTodo className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">{getMessage()}</h3>
      <p className="text-gray-500 text-center max-w-md">
        {filter === 'all'
          ? 'Create your first task to get started with TaskTube'
          : 'Tasks matching this filter will appear here'}
      </p>
    </div>
  );
}
