// app/dashboard/page.tsx
"use client";

import React from 'react';
import MonthDropdown from '@/components/MonthDropdown';
import ProfilePart from '@/components/ProfilePart';
import Header from '@/components/Header'; 
import ExpenseList from '@/components/ExpenseList';
import AddExpenseButton from '@/components/AddExpenseButton';
import ExpenseLineChart from '@/components/ExpenseLineChart';
import { useSelector } from 'react-redux';

const page = () => {
  const { expenses, loading } = useSelector((state) => state.expenses);
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const chartData = safeExpenses.map(exp => ({
    date: new Date(exp.createdAt).toISOString().split('T')[0],
    amount: exp.amount
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <Header />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 p-4 md:h-screen md:sticky md:top-0 bg-gray-100 dark:bg-gray-950 dark:text-white space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900">
            <ProfilePart />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900">
            <MonthDropdown />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5 p-4 space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900">
            <AddExpenseButton />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900">
            <ExpenseList />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading chart...</p>
            ) : (
              <ExpenseLineChart data={chartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
