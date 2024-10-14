"use client";

import { LockOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Tabs,
  Checkbox,
  Flex,
  Select,
  InputNumber,
  AutoComplete,
  Row,
  Col,
  Alert,
} from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import Parse from "parse";
import { delay } from "@/app/utils/tools";

export default function Login(props) {
  const { open, setOpen } = props;
  const [selectedTab, setSelectedTab] = useState("login");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      label: `Login`,
      key: "login",
      children: <LoginTab setSelectedTab={setSelectedTab} />,
    },
    {
      label: `Register`,
      key: "register",
      children: <RegisterTab />,
    },
  ];

  return (
    <>
      <Drawer
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Tabs
          defaultActiveKey={selectedTab}
          activeKey={selectedTab}
          onTabClick={(key) => {
            setSelectedTab(key);
          }}
          type="card"
          size={100}
          items={items}
        />
      </Drawer>
    </>
  );
}

const LoginTab = (props) => {
  const { setSelectedTab } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await Parse.User.logIn(values.username, values.password);
      location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      await delay(2000);
    }

    setLoading(false);
  };

  return (
    <div className="flex-col content-center sm:pl-40">
      <Form
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        labelAlign="right"
        initialValues={{
          remember: true,
        }}
        style={{}}
        onFinish={onFinish}
      >
        <Form.Item>
          {errorMessage && <Alert message={errorMessage} type="error" />}
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={loading}
            loading={loading}
            block
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          or{" "}
          <a
            onClick={() => {
              setSelectedTab("register");
            }}
          >
            Register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

const RegisterTab = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { nickname, password, email } = values;
      const user = new Parse.User();
      user.set({ username: nickname, password, email });
      await user.signUp();
      location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      await delay(2000);
    }
    setLoading(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      {errorMessage && (
        <Form.Item>
          <Alert message={errorMessage} type="error" />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            min: 6,
            message: "Please input your 6 or more digit password",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
