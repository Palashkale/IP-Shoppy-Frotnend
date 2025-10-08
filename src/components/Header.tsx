import { Menu, Video, Bell, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1">
          <Video className="w-8 h-8 text-red-600" />
          <span className="text-xl font-semibold">Task Manager</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
