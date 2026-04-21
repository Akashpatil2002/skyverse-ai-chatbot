import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 text-white px-6 py-16 lg:px-8">
      <div className="text-center max-w-md mx-auto space-y-8">
        {/* 404 Header */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent mb-6 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
            Page Not Found
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          The page you are looking for does not exist. It may have been moved or deleted.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/chatpage"
          className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl border border-indigo-500/50 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          aria-label="Return to SkyVerse AI Chat"
        >
          <span className="mr-2">←</span>
          Back to SkyVerse Chat
        </motion.a>

        {/* Subtle Footer */}
        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          SkyVerse AI © 2026
        </motion.p>
      </div>
    </div>
  );
}