import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface MortgageCalculation {
  homePrice: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  propertyTax: number;
  insurance: number;
  pmi: number;
  totalMonthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  interestRate: number;
  loanTerm: number;
}

const MortgageCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    homePrice: 650000,
    downPaymentPercent: 20,
    interestRate: 7.5,
    loanTerm: 30,
  });

  const [calculation, setCalculation] = useState<MortgageCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateMortgage = useCallback(async () => {
    setIsLoading(true);

    const downPayment = inputs.homePrice * (inputs.downPaymentPercent / 100);

    try {
      const response = await fetch('/api/mortgage-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homePrice: inputs.homePrice,
          downPayment,
          interestRate: inputs.interestRate,
          loanTerm: inputs.loanTerm,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCalculation(data.calculation);
      }
    } catch (error) {
      console.error('Mortgage calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputs]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          💳 Mortgage Calculator
        </h2>
        <p className="text-gray-600">Calculate your monthly payment for Centennial Hills homes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="home-price-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Home Price
            </label>
            <input
              id="home-price-input"
              type="number"
              value={inputs.homePrice}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, homePrice: Number(e.target.value) }))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="100000"
              step="10000"
              aria-label="Enter home price in dollars"
              placeholder="Enter home price"
            />
          </div>

          <div>
            <label
              htmlFor="down-payment-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Down Payment ({inputs.downPaymentPercent}%)
            </label>
            <input
              id="down-payment-input"
              type="range"
              min="5"
              max="30"
              value={inputs.downPaymentPercent}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, downPaymentPercent: Number(e.target.value) }))
              }
              className="w-full"
              aria-label="Select down payment percentage"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>5%</span>
              <span className="font-semibold">
                {formatCurrency(inputs.homePrice * (inputs.downPaymentPercent / 100))}
              </span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="interest-rate-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Interest Rate (%)
            </label>
            <input
              id="interest-rate-input"
              type="number"
              value={inputs.interestRate}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, interestRate: Number(e.target.value) }))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="3"
              max="12"
              step="0.1"
              aria-label="Enter interest rate percentage"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label
              htmlFor="loan-term-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Loan Term (years)
            </label>
            <select
              id="loan-term-input"
              value={inputs.loanTerm}
              onChange={(e) => setInputs((prev) => ({ ...prev, loanTerm: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select loan term in years"
            >
              <option value={15}>15 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Calculating...</p>
            </div>
          ) : calculation ? (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Monthly Payment</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(calculation.totalMonthlyPayment)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Principal & Interest</span>
                  <span className="font-semibold">
                    {formatCurrency(calculation.monthlyPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property Taxes</span>
                  <span className="font-semibold">{formatCurrency(calculation.propertyTax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-semibold">{formatCurrency(calculation.insurance)}</span>
                </div>
                {calculation.pmi > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PMI</span>
                    <span className="font-semibold">{formatCurrency(calculation.pmi)}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Loan Amount</p>
                    <p className="font-semibold">{formatCurrency(calculation.loanAmount)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Total Interest</p>
                    <p className="font-semibold">{formatCurrency(calculation.totalInterest)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 rounded-lg p-3 mt-4">
                <p className="text-sm text-green-800 text-center">
                  💡 <strong>Tip:</strong> In Centennial Hills, homes in this price range typically
                  see 8.2% annual appreciation!
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          📧 Get Pre-approved
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          🏠 View Properties in Budget
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          📞 Speak with Lender
        </button>
      </div>
    </div>
  );
};

export default MortgageCalculator;
