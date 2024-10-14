"use client";
import Image from "next/image";
import MiniRetriever from "@components/MiniRetriever";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import Login from "./Login";

export default function MainPage() {
  const [open, setOpen] = useState(false);
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
        <Login open={open} setOpen={setOpen} />
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
          <span
            style={{ color: "white", fontSize: "18px", cursor: "pointer" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Login
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
            {/* Section 1 */}
            <div className="flex flex-col md:flex-row items-center mb-8 max-w-screen-2xl">
              <div className="flex-1 p-4 ">
                <h2 className="text-2xl font-bold mb-4">Section 1 Title</h2>
                <p className="text-lg">
                  This is the content for section 1. Here you can add any
                  information related to this section. LoremThis is the content
                  for section 1. Here you can add any information related to
                  this section. LoremThis is the content for section 1. Here you
                  can add any information related to this section. LoremThis is
                  the content for section 1. Here you can add any information
                  related to this section. LoremThis is the content for section
                  1. Here you can add any information related to this section.
                  Lorem
                </p>
              </div>
              <div className="flex-1">
                <Image
                  src="/toodoologo.png"
                  alt="Section 1 Image"
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              </div>
            </div>
            <hr></hr>
            {/* Section 2 */}
            <div className="flex flex-col md:flex-row items-center mb-8 max-w-screen-2xl">
              <div className="flex-1 p-4">
                <h2 className="text-2xl font-bold mb-4">Section 2 Title</h2>
                <p className="text-lg">
                  This is the content for section 2. You can also add more
                  details here.This is the content for section 2. You can also
                  add more details here.This is the content for section 2. You
                  can also add more details here.This is the content for section
                  2. You can also add more details here.This is the content for
                  section 2. You can also add more details here.This is the
                  content for section 2. You can also add more details here.
                </p>
              </div>
              <div className="flex-1">
                <Image
                  src="/toodoologo.png"
                  alt="Section 2 Image"
                  width={500}
                  height={500}
                  className="rounded-lg"
                />
              </div>
            </div>
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
