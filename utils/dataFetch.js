import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchExpenses = async ({ category, startDate, endDate, sortBy, order }) => {
  const params = {};
  if (category) params.category = category;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const response = await axios.get(API_BASE_URL + '/expenses', {
    params,
    withCredentials: true,
  });

  return response.data;
};
