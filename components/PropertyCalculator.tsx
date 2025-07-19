
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CalculatorProps {
  homePrice?: number;
  className?: string;
}

const PropertyCalculator: React.FC<CalculatorProps> = ({ homePrice = 750000, className = '' }) => {
  const [price, setPrice] = useState(homePrice);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculatePayment();
  }, [price, downPayment, interestRate, loanTerm]);

  const calculatePayment = () => {
    const principal = price - (price * downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
    }
  };

  return (
    <motion.div 
      className={`calculator-widget ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="calculator-header">
        <h3>Mortgage Calculator</h3>
        <p>Calculate your monthly payments</p>
      </div>
      
      <div className="calculator-inputs">
        <div className="input-group">
          <label htmlFor="home-price">Home Price</label>
          <input 
            id="home-price"
            type="number" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))}
            className="calculator-input"
            aria-label="Enter home price in dollars"
            placeholder="Enter home price"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="down-payment">Down Payment (%)</label>
          <input 
            id="down-payment"
            type="range" 
            min="5" 
            max="50" 
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="slider"
            aria-label="Select down payment percentage"
          />
          <span className="slider-value" aria-live="polite">{downPayment}%</span>
        </div>
        
        <div className="input-group">
          <label htmlFor="interest-rate">Interest Rate (%)</label>
          <input 
            id="interest-rate"
            type="number" 
            step="0.1" 
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="calculator-input"
            aria-label="Enter interest rate percentage"
            placeholder="Enter interest rate"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="loan-term">Loan Term (years)</label>
          <select 
            id="loan-term"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="calculator-select"
            aria-label="Select loan term in years"
          >
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>
      </div>
      
      <div className="calculator-results">
        <div className="result-item">
          <span className="result-label">Monthly Payment</span>
          <span className="result-value">${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Down Payment</span>
          <span className="result-value">${(price * downPayment / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Loan Amount</span>
          <span className="result-value">${(price - (price * downPayment / 100)).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCalculator;
