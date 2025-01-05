export default function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform hover:scale-105">
      <div className="w-12 h-12 rounded-full bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  );
}
