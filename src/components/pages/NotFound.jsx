import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
      {/* Big 404 */}
      <h1
        className="text-[10rem] font-extrabold text-green-200 mb-6 select-none relative z-10"
        aria-label="404"
      >
        404
      </h1>

      {/* Animals container */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Bird */}
        <svg
          className="absolute top-20 left-10 w-16 h-16 animate-flyUpLeft"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 12c-4 0-8 8-12 12 4 4 8 12 12 12s8-8 12-12c-4-4-8-12-12-12z"
            fill="#A7F3D0"
          />
          <path
            d="M22 24l-8-4M42 24l8-4"
            stroke="#065F46"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Butterfly */}
        <svg
          className="absolute bottom-24 right-12 w-14 h-14 animate-flyUpRight"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="10" fill="#4ADE80" />
          <path
            d="M22 32c0-6 10-6 10 0s-10 6-10 0z"
            fill="#166534"
            opacity="0.7"
          />
        </svg>

        {/* Dragonfly */}
        <svg
          className="absolute top-1/2 left-1/2 w-20 h-20 animate-flyUpCenter"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="32" cy="32" rx="14" ry="7" fill="#22C55E" />
          <path
            d="M18 32l-6 4M46 32l6 4"
            stroke="#064E3B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Message */}
      <p className="text-lg text-green-100 mb-8 opacity-0 animate-fadeIn max-w-md z-10">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition-all animate-pulse z-10"
      >
        Go back home
      </Link>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes flyUpLeft {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-100px, -150px) scale(0.5); opacity: 0; }
        }
        @keyframes flyUpRight {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(120px, -140px) scale(0.5); opacity: 0; }
        }
        @keyframes flyUpCenter {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0, -180px) scale(0.5); opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s forwards 0.7s;
        }
        .animate-flyUpLeft {
          animation: flyUpLeft 5s ease-in forwards;
        }
        .animate-flyUpRight {
          animation: flyUpRight 5s ease-in forwards 0.5s;
        }
        .animate-flyUpCenter {
          animation: flyUpCenter 5s ease-in forwards 0.3s;
        }
      `}</style>
    </div>
  );
}
