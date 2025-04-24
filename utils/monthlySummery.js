// src/utils/expenseUtils.js

import axios from "axios";

export const fetchMonthlyExpense = async (month, year) => {
  try {
    // Use the environment variable for the API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);
    // Fetch data from your Next.js API route
    const response = await axios.get(
      `${apiUrl}/expenses/monthlySummary?month=${month}&year=${year}`
    );
    

    if (response.data?.message) {
      return { totalExpense: 0, message: response.data.message };
    } else {
      return { totalExpense: response.data?.totalAmount || 0, message: null };
    }
  } catch (error) {
    console.error("Error fetching monthly expense:", error);
    return { totalExpense: 0, message: "Error fetching expense" };
  }
};
