import {createSlice} from '@reduxjs/toolkit';
import {join, login, logout} from '../apis/memberApis';

const memberSlice = createSlice({
    name: 'members', // 객체{} 형태로 값을 넣어준다 ~
    initialState: {
        isLogin: false,
        id: 0,
        username: '', // 다른 건 저장할 필요가 없으니 이 정보까지만 ~
        nickname: ''
    },
    reducers: {
        // 리듀서는 비워둔다 ~
    },
    extraReducers: (builder) => {// 빌더 받아서 처리 ~
        builder.addCase(join.fulfilled, (state, action) => {
            alert(`${action.payload.username}님 가입 축하합니다.`);

            // 왜 navigate 안 써요? => hooks은 함수형 컴포넌트에서만 사용 가능하기 때문에 ~ js의 기본기능 사용!
            window.location.href = '/login'; // 로그인 화면으로 화면 이동 ->
            return state;
        });

        builder.addCase(join.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.username}님 환영합니다.`);
            sessionStorage.setItem('ACCESS_TOKEN', action.payload.token); // session에 토큰 넣어주기 ! //

            return { // 객체 자체를 리턴!
                ...state,
                isLogin: true,
                id:action.payload.id,
                username: action.payload.usernamed,
                nickname: action.payload.nickname
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if(action.payload.response.data.statusMessage === 'username not exist') { // 백단과 메세지가 같아야 함.
                alert('존재하지 않는 아이디입니다.');
                return state;
            }
            if(action.payload.response.data.statusMessage === 'wrong password') { // 백단과 메세지가 같아야 함.
                alert('잘못된 비밀번호입니다.');
                return state;
            }
            
            return state;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            alert("로그아웃 완료.");
            sessionStorage.removeItem("ACCESS_TOKEN");
            
            return {
                ...state,
                isLogin: false,
                id: 0,
                username:'',
            }
        });
        builder.addCase(logout.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });
    }
});

export default memberSlice.reducer;