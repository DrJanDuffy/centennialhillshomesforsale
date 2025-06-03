
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
import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface AwesomeLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AwesomeLoader: React.FC<AwesomeLoaderProps> = ({ 
  text = "Loading awesome content...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerVariants = {
    start: { opacity: 0, scale: 0.8 },
    end: { opacity: 1, scale: 1 }
  };

  const spinVariants = {
    start: { rotate: 0 },
    end: { rotate: 360 }
  };

  const pulseVariants = {
    start: { scale: 1 },
    end: { scale: 1.1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="end"
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="relative mb-4">
        <motion.div
          variants={spinVariants}
          animate="end"
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} text-blue-600`}
        >
          <HomeIcon className="w-full h-full" />
        </motion.div>
        
        <motion.div
          variants={pulseVariants}
          animate="end"
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-1 -right-1"
        >
          <SparklesIcon className="w-6 h-6 text-purple-600" />
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-center font-medium"
      >
        {text}
      </motion.p>
      
      <motion.div
        className="flex gap-1 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AwesomeLoader;
