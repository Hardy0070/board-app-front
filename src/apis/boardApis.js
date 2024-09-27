import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const post = createAsyncThunk(
  "boards/post",
  async (formData, thunkApi) => {
    try {
      const response = await axios.post(
        "http://223.130.150.189:9090/boards",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (searchObj, thunkApi) => {
    try {
      const response = await axios.get("http://223.130.150.189:9090/boards", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
        params: {
          searchCondition: searchObj.searchCondition,
          searchKeyword: searchObj.searchKeyword,
          page: searchObj.page,
        },
      });

      //   console.log(response.data); // <= 오류가 날 때 이렇게 찍어 볼 줄 알아야 함. // <= 이거 찍어서 오타 찾음.
      return response.data; // 백에서 보내준 데이터가 전달 될 거임.
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
