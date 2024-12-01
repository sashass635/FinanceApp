import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Category = {
  id: string;
  name: string;
  description: string;
  dateAdded?: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.get("http://localhost:8008/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(response.data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string, description: string) => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.post(
        "http://localhost:8008/api/category",
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (err) {
      setError("Failed to create category. Please try again.");
      console.error("Error creating category:", err);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      await axios.delete(`http://localhost:8008/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error("Error deleting category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    deleteCategory,
  };
};
