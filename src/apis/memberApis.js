import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk로 만들어진 비동기 통신 함수는 action creator 함수다.
// {type: 'member/join, payload: response.data.item or error 객체}
//  ->
// dispatch(join)을 하면 slice에 작성한 extraReducers의 리듀서 함수가 동작한다.
export const join = createAsyncThunk(
  "members/join", // <= type
  async (member, thunkApi) => {
    // member 객체로 join 시킴
    try {
      const response = await axios.post(
        "http://223.130.150.189:9090/members/join",
        member
      ); // data는 membere

      return response.data.item;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

// -------------- //
// action 생성 함수 //
// -------------- //
export const login = createAsyncThunk(
  "members/login",
  async (member, thunkApi) => {
    try {
      const response = await axios.post(
        "http://223.130.150.189:9090/members/login",
        member
      );

      return response.data.item;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

// -------------- //
// 로그아웃 기능 구현 //
// -------------- //
export const logout = createAsyncThunk(
  "members/logout",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        `http://223.130.150.189:9090/members/logout`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );

      return response.data.item;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
