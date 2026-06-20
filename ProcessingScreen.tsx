import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  "Analyzing document...",
  "Extracting financial information...",
  "Identifying deadlines...",
  "Finding support resources..."
];

export function ProcessingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 1000); // faster
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-canvas">
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Subtle, calm pulsing indicator */}
        <div className="w-12 h-12 mb-8 relative">
          <motion.div 
            className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-2 bg-blue-100 rounded-full flex items-center justify-center">
             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="h-8 relative w-full text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 text-lg absolute inset-0 font-medium"
            >
              {MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

