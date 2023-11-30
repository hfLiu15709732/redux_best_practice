// index.ts 文件

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import bookSlice from "./features/bookSlice";

// configureStore创建一个redux数据
const store = configureStore({
	// 合并多个Slice
	reducer: {
		userSlice: userSlice,
		bookSlice: bookSlice,
	},
});

export default store;
