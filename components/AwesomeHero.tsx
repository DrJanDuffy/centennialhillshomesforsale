
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AwesomeHero: React.FC = () => {
  return (
    <motion.section 
      className="awesome-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="hero-content">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title gradient-text float-animation">
            🌟 Centennial Hills Homes For Sale ✨
          </h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            🏡 Discover your <span className="awesome-highlight">dream home</span> in Las Vegas's most prestigious community! 
            From luxury estates to family-friendly neighborhoods. 🌴
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/listings" className="awesome-btn pulse-animation">
              🔍 Browse Homes
            </Link>
            <Link href="/contact" className="awesome-btn">
              📞 Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .awesome-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .awesome-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%);
          animation: float 6s ease-in-out infinite;
        }
        
        .hero-content {
          max-width: 1200px;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 2rem;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          color: white;
          line-height: 1.6;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default AwesomeHero;
