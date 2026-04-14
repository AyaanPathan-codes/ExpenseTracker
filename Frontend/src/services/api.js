// src/services/api.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getExpenses = () => API.get("/");
export const getExpenseById = (id) => API.get(`/${id}`);
export const addExpense = (data) => API.post("/", data);
export const updateExpense = (id, data) => API.put(`/${id}`, data);
export const deleteExpense = (id) => API.delete(`/${id}`);