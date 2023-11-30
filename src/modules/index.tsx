// index.ts 文件

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import bookSlice from "./features/bookSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["userSlice"], //一般的黑名单，只能达到一级的禁止，要想实现更深层级的禁止或允许持久化，可使用嵌套持久化实现，下面就是
};

const userPersistConfig = {
	key: "user",
	storage,
	blacklist: ["value"],
}; //实现嵌套持久化，重写user的持久化配置

const reducers = combineReducers({
	userSlice: persistReducer(userPersistConfig, userSlice), //实现嵌套持久化，原理是在localstorage中再开辟一个空间专门存储user相关的数据，在user里面在限制黑名单即可，这样子就实现了仅仅黑名单（user里面的value数据）
	bookSlice: bookSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// configureStore创建一个redux数据仓库
const store = configureStore({
	// 合并多个Slice
	reducer: persistedReducer,
});

//创建一个redux持久化仓库
export const persistor = persistStore(store);

export default store;
