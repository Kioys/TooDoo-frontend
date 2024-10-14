"use client";
import Image from "next/image";
import MiniRetriever from "@components/MiniRetriever";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Parse from "parse";

export default function UserPage() {
  const items = [
    {
      key: "home",
      label: `Home`,
    },
    {
      key: "aboutme",
      label: `About me`,
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className="min-h-screen flex flex-col">
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/toodoologowhite.png"
            alt="logo toodoo app"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
          <span style={{ color: "white", fontSize: "18px" }}>
            {Parse.User.current().get("username")} ·{" "}
            <LogoutOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                Parse.User.logOut();
                location.reload();
              }}
            />
          </span>
        </Header>
        <Content className="flex-grow">
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
            className="flex flex-col justify-center items-center"
          >
            <MiniRetriever />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <a
            href="https://www.linkedin.com/in/matias-arratibel/"
            target="_blank"
          >
            Matias Arratibel
          </a>{" "}
          ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
}
