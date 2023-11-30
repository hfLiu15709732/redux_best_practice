import {
	Input,
	Avatar,
	List,
	Button,
	Popconfirm,
	Divider,
	Select,
	message,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingBook, getRemoteBookData } from "./modules/features/bookSlice";
import { addingUser, getRemoteUserData } from "./modules/features/userSlice";

const { Option } = Select;

function App() {
	const dispatch = useDispatch();

	const [iptValue, setIptValue] = useState<string>("");
	const [typeValue, setTypeValue] = useState<string>("book");
	const { userList } = useSelector((store: any) => store.userSlice);
	const { bookList } = useSelector((store: any) => store.bookSlice);

	const handleAddingData = () => {
		if (iptValue !== "") {
			const preObject: any = { title: iptValue };
			if (typeValue === "user") {
				dispatch(addingUser({ value: preObject })); //这里要求，必须专递对象数据，reducer的payload来接
				message.success("用户添加成功"); //简便起见，就这么加了，实际应该放在操作完成之后
			} else if (typeValue === "book") {
				dispatch(addingBook({ value: preObject })); //这里要求，必须专递对象数据，reducer的payload来接
				message.success("书籍添加成功"); //简便起见，就这么加了，实际应该放在操作完成之后
			}
		}
	};

	const handleAddingRemoteUser = () => {
		dispatch(getRemoteUserData());
		message.success("获取远程用户列表成功"); //简便起见，就这么加了，实际应该放在操作完成之后
	};

	const handleAddingRemoteBook = () => {
		dispatch(getRemoteBookData());
		message.success("获取远程用户列表成功"); //简便起见，就这么加了，实际应该放在操作完成之后
	};

	return (
		<>
			<div style={{ display: "flex" }}>
				<div
					style={{
						width: "670px",
						display: "flex",
						flexDirection: "column",
						margin: "0 auto",
						marginTop: "10px",
					}}
				>
					<div style={{ marginBottom: "40px", display: "flex" }}>
						<Input
							addonAfter={
								<Select
									defaultValue="book"
									onChange={(value) => {
										setTypeValue(value);
									}}
								>
									<Option value="book">书籍信息</Option>
									<Option value="user">用户信息</Option>
								</Select>
							}
							placeholder="输入一些相关的数据吧"
							size="large"
							onChange={(value) => {
								setIptValue(value.target.value);
							}}
						/>
						<Button
							size="large"
							style={{ marginLeft: "10px" }}
							type="primary"
							onClick={() => {
								handleAddingData();
							}}
						>
							提交
						</Button>
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
						}}
					>
						<Button
							type="primary"
							style={{ marginRight: "30px" }}
							onClick={() => {
								handleAddingRemoteUser();
							}}
						>
							远程用户列表
						</Button>
						<Button
							type="primary"
							onClick={() => {
								handleAddingRemoteBook();
							}}
						>
							远程书籍列表
						</Button>
					</div>

					<Divider>用户列表</Divider>

					<div>
						<List
							itemLayout="horizontal"
							dataSource={userList}
							renderItem={(item, index) => (
								<List.Item
									actions={[
										<Popconfirm
											title="删除日程确认"
											description="你确定要删除这个日程?"
											okText="确认"
											cancelText="取消"
										>
											<Button danger type="primary" size="small">
												删除用户
											</Button>
										</Popconfirm>,
									]}
								>
									<List.Item.Meta
										avatar={
											<Avatar
												src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
											/>
										}
										title={<a href="https://ant.design">{item.title}</a>}
										description="Ant Design, a design language for background applications, is refined by Ant UED Team"
									/>
								</List.Item>
							)}
						/>
					</div>

					<Divider>书籍列表</Divider>

					<div>
						<List
							itemLayout="horizontal"
							dataSource={bookList}
							renderItem={(item, index) => (
								<List.Item
									actions={[
										<Popconfirm
											title="删除日程确认"
											description="你确定要删除这个日程?"
											okText="确认"
											cancelText="取消"
										>
											<Button danger type="primary" size="small">
												删除书籍
											</Button>
										</Popconfirm>,
									]}
								>
									<List.Item.Meta
										avatar={
											<Avatar
												src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
											/>
										}
										title={<a href="https://ant.design">{item.title}</a>}
										description="Ant Design, a design language for background applications, is refined by Ant UED Team"
									/>
								</List.Item>
							)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
