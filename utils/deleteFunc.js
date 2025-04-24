import axios from 'axios';
import { fetchExpenses } from './dataFetch';

const deleteExpense = async (id, filters = {}) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`, {
      withCredentials: true, // Enables sending cookies/session
    });

    const updatedExpenses = await fetchExpenses(filters);
    return updatedExpenses;

  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error('Failed to delete expense');
  }
};

export default deleteExpense;
