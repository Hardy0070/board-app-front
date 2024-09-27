import { configureStore, combineReducers } from "@reduxjs/toolkit";
import memberSlice from "../slices/memberSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import boardSlice from "../slices/boardSlice";

const reducersMethod = combineReducers({
    memberSlice,
    boardSlice
});

const persistConfig = {
    key: 'root',
    storage: sessionStorage
};

const persistReducerMethod = persistReducer(persistConfig, reducersMethod); // 위에서 import한 애(persistReducer랑 이름이 겹치면 안 됌 ~

export const store = configureStore({
    reducer: persistReducerMethod,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
        }
    })
});