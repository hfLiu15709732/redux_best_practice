import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MovieState {
	list: object;
	userList: Array<object>;
}
const initialState: MovieState = {
	value: 100,
	userList: [
		{
			title: "张明明",
		},
		{
			title: "李来",
		},
		{
			title: "魏韩雪",
		},
	],
};

const getUserListApi = () =>
	fetch(
		"https://mock.presstime.cn/mock/653695baffb279f23e01cefb/remoteUser"
	).then((res) => {
		console.log(res);

		return res.json();
	});

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getRemoteUserData = createAsyncThunk("user/getUser", async () => {
	const res = await getUserListApi();
	console.log(res);

	return res;
});

// 创建一个 Slice
export const UserSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		// 数据请求完触发 loaddataend是自己写得函数名，不是内置的，叫其他名字也行
		// addingRemoteUser: (state, { payload }) => {
		// 	state.list = payload;
		// },
		// 定义一个加的方法
		addingUser: (state, { payload, type }) => {
			console.log(type); //bookData/addingBook
			console.log(payload.value); //{title:"传来的值"}
			const allList = JSON.parse(JSON.stringify(state)).userList; //必须要重新深拷贝一次！！！

			allList.push(payload.value);

			state.userList = allList;
		},
	},
	// extraReducers 字段让 slice 处理在别处定义的 actions，
	// 包括由 createAsyncThunk 或其他slice生成的actions。
	//说白了就是判断action函数在不同状态下做什么不同的逻辑
	extraReducers(builder) {
		builder
			.addCase(getRemoteUserData.pending, () => {
				console.log("🚀 ~ 正在获取用户列表信息！");
			})
			.addCase(getRemoteUserData.fulfilled, (state, { payload }) => {
				console.log("🚀 ~ 获取远程用户列表成功", payload);
				const allList = JSON.parse(JSON.stringify(state)).userList; //必须要重新深拷贝一次！！！
				state.userList = allList.concat(payload.userList);
			})
			.addCase(getRemoteUserData.rejected, (_, err) => {
				console.log("🚀 ~ 获取远程用户列表失败", err);
			});
	},
});

// 导出方法，导出的是reducer，让外面组件使用
export const { addingUser } = UserSlice.actions;

// 默认导出
export default UserSlice.reducer;
