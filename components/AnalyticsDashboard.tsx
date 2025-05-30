import React from 'react';

interface AnalyticsDashboardProps {
  isAdmin?: boolean;
}

export default function AnalyticsDashboard({ isAdmin = false }: AnalyticsDashboardProps) {
  // Never render anything in production
  return null;
}