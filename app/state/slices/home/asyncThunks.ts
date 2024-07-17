import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoints } from "../../../networking/endpoints";

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.genres);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.message
      });
    }
  }
);
