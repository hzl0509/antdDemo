import { Layout, Menu, Button, Form, Input } from "antd";
import { React, useState } from "react";
import "./App.css";

const { Header, Content, Sider } = Layout;
const items = [
  {
    label: "菜单一",
    key: "item-1",
    children: [
      { label: "子菜单1-1", key: "子菜单1-1" },
      { label: "子菜单1-2", key: "子菜单1-2" },
    ],
  },
  {
    label: "菜单二",
    key: "item-2",
    children: [
      { label: "子菜单2-1", key: "子菜单2-1" },
      { label: "子菜单2-2", key: "子菜单2-2" },
    ],
  },
];
const App = () => {
  const [menuKey, setMenuKey] = useState("");
  const [menuData, setMenuData] = useState(items);
  const [form] = Form.useForm();
  const onClick = (item) => {
    setMenuKey(item.key);
    form.setFieldsValue({ username: item.key });
  };

  const onFinish = (values) => {
    const { username } = values;
    var arr = menuData.map((item) => {
      item.children.map((v) => {
        if (v.key === menuKey) {
          v.label = username;
          v.key = username;
        }
      });
      return item;
    });
    setMenuData(arr);
  };
  //console.log(menuData, "menuData");
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible>
        <Menu
          theme="dark"
          onClick={onClick}
          style={{
            width: "100%",
          }}
          mode="inline"
          items={menuData}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />

        {/* form */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Form
            layout="inline"
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              username: menuKey,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Content>
        {/* form end */}
      </Layout>
    </Layout>
  );
};

export default App;
