import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onRetry}
        className="ml-4 underline font-semibold"
      >
        Tentar novamente
      </button>
    </div>
  );
}
