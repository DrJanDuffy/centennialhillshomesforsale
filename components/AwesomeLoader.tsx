
import React from 'react';
import { motion } from 'framer-motion';

interface AwesomeLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AwesomeLoader: React.FC<AwesomeLoaderProps> = ({ 
  text = "Loading awesome content...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-64', 
    lg: 'h-96'
  };

  return (
    <div className={`${sizeClasses[size]} flex flex-col items-center justify-center`}>
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </motion.div>
      
      <motion.p
        className="mt-4 text-gray-600 font-medium"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        {text}
      </motion.p>
      
      <motion.div
        className="mt-2 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AwesomeLoader;
