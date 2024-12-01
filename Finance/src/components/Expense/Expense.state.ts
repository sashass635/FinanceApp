import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Expense = {
  id: string;
  userId: string;
  description: string;
  amount: number;
  dateAdded: string;
  categoryId: string | null;
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.get("http://localhost:8008/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
      navigate("/expenses");
    } catch (err) {
      setError("Failed to load expenses. Please try again.");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (description: string, amount: number, categoryId: string | null) => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.post(
        "http://localhost:8008/api/expense",
        { description, amount, categoryId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (err) {
      setError("Failed to create expense. Please try again");
      console.error("Error creating expense:", err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      await axios.delete(`http://localhost:8008/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
      console.error("Error deleting expense:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    deleteExpense,
  };
};
