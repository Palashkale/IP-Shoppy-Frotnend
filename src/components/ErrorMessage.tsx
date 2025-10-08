import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Connection Error</h3>
            <p className="text-sm text-red-700">{message}</p>
            <p className="text-xs text-red-600 mt-2">
              Make sure your Spring Boot API is running on http://localhost:8080
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
