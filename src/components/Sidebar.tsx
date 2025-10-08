import { Home, ListTodo, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function Sidebar({ isOpen, activeFilter, onFilterChange }: SidebarProps) {
  const menuItems = [
    { id: 'all', icon: Home, label: 'All Tasks' },
    { id: 'active', icon: ListTodo, label: 'Active' },
    { id: 'completed', icon: CheckCircle2, label: 'Completed' },
    { id: 'upcoming', icon: Clock, label: 'Upcoming' },
    { id: 'today', icon: Calendar, label: 'Today' },
  ];

  return (
    <aside
      className={`fixed top-14 left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isOpen ? 'w-60' : 'w-0'
      } overflow-hidden`}
    >
      <nav className="py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center gap-6 px-6 py-3 hover:bg-gray-100 transition-colors ${
                isActive ? 'bg-gray-100 border-r-4 border-red-600' : ''
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} />
              <span className={`text-sm ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
