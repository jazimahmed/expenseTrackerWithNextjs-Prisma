import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchExpensesData } from "../redux/slices/expenseSlice";
import { toast } from 'react-toastify';

const EditExpenseForm = ({ expense, setShowForm, onUpdate }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(new Date(expense.createdAt).toISOString().split('T')[0]);
    }
  }, [expense]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category || !date) {
      setError('Please fill in all fields');
      return;
    }

    const updatedData = {
      description,
      amount: Number(amount),
      category,
      updatedAt : new Date(date),
    };

    try {
      //console.log(expense,'expense');
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/${expense.id}`,
        updatedData,
        {
          withCredentials: true, // If using session-based auth
        }
      );

      toast.success("Expense edited successfully!");
      dispatch(fetchExpensesData({}));
      onUpdate(res.data);
      setShowForm(false);
    } catch (err) {
      toast.error("Editing expense failed.");
      console.error('Error updating expense:', err);
      setError('Failed to update expense');
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600/50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-md w-[400px] dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Category</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Bills">Bills</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
