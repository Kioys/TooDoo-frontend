import Parse from "@lib/parse";
import { Table } from "antd";
import { useEffect, useState } from "react";

export default function MiniRetriever() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      render: (text) => {
        const user_type_map = {
          0: "BASIC",
          1: "VIP",
          2: "MEGA VIP",
          3: "ADMIN",
        };
        return (
          <>
            <b>{user_type_map[text]}</b>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const TestCollection = Parse.Object.extend("TestCollection");
      const query = new Parse.Query(TestCollection);
      const results = await query.find();

      if (results.length > 0) {
        let tempDataSource = [];
        for (let result of results) {
          let newObjet = {
            key: result.id,
            name: result.get("name"),
            phone: result.get("phone"),
            user_type: result.get("user_type"),
          };
          tempDataSource = [...tempDataSource, newObjet];
        }
        setDataSource([...tempDataSource]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}
