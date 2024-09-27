import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BoardListTable from "../components/BoardListTable";

const BoardList = () => {
    const isLogin = useSelector(state => state.memberSlice.isLogin);
    const navi = useNavigate();

    useEffect(() => {
        if(!isLogin) {
            alert('로그인이 필요합니다.');
            navi('/login');
        }
    }, []);
  return (
    <>
      <SearchBar />
      <BoardListTable />
    </>
  );
};

export default BoardList;
