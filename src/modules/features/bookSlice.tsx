import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
	value: number;
	bookList: Array<object>;
}
const initialState: CounterState = {
	value: 100,
	bookList: [
		{
			title: "西游记",
		},
		{
			title: "水浒传",
		},
		{
			title: "红楼梦",
		},

		{
			title: "三国演义",
		},
	],
};

const getBookListApi = () =>
	fetch(
		"https://mock.presstime.cn/mock/653695baffb279f23e01cefb/remoteBook"
	).then((res) => {
		console.log(res);

		return res.json();
	});

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getRemoteBookData = createAsyncThunk("book/getBook", async () => {
	const res = await getBookListApi();
	console.log(res);

	return res;
});

// 创建一个 Slice
export const BookSlice = createSlice({
	name: "bookData",
	initialState,
	// 定义 reducers 并生成关联的操作
	reducers: {
		// 定义一个加的方法
		addingBook: (state, { payload, type }) => {
			console.log(type); //bookData/addingBook
			console.log(payload.value); //{title:"传来的值"}
			const allList = JSON.parse(JSON.stringify(state)).bookList; //必须要重新深拷贝一次！！！

			allList.push(payload.value);

			state.bookList = allList;
		},
	},
	// extraReducers 字段让 slice 处理在别处定义的 actions，
	// 包括由 createAsyncThunk 或其他slice生成的actions。
	//说白了就是判断action函数在不同状态下做什么不同的逻辑
	extraReducers(builder) {
		builder
			.addCase(getRemoteBookData.pending, () => {
				console.log("🚀 ~ 正在获取用户列表信息！");
			})
			.addCase(getRemoteBookData.fulfilled, (state, { payload }) => {
				console.log("🚀 ~ 获取远程用户列表成功", payload);
				const allList = JSON.parse(JSON.stringify(state)).bookList; //必须要重新深拷贝一次！！！
				state.bookList = allList.concat(payload.bookList);
			})
			.addCase(getRemoteBookData.rejected, (_, err) => {
				console.log("🚀 ~ 获取远程用户列表失败", err);
			});
	},
});
// 导出加减的方法
export const { addingBook } = BookSlice.actions;

// 默认导出
export default BookSlice.reducer;
