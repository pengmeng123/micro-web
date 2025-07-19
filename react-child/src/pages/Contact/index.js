import React, { useState, useEffect } from "react";
import { Table, Card, Alert, message } from "antd";
import { contactSearch } from "../../services/api";
import { openDrawerDetail } from "../../utils/drawer";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
  });

  useEffect(() => {
    fetchContacts();
  }, [pagination.current]);

  const fetchContacts = () => {
    setLoading(true);
    return contactSearch({
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        setDataSource(res?.data || []);
        setPagination({
          ...pagination,
          total: res?.page?.total || 0,
        });
      })
      .catch((error) => {
        console.error("获取联系人列表失败:", error);
        message.error("获取联系人列表失败");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setPagination({
      ...pagination,
      current: 1,
    });
    fetchContacts();
  };

  const handleTableChange = (paginationConfig) => {
    setPagination({
      ...pagination,
      current: paginationConfig.current,
    });
  };

  const handleViewDetail = (record) => {
    message.info(`查看联系人详情: ${record.name}`);
    openDrawerDetail({
      title: "联系人详情",
      width: 800,
      iframe: true,
      contactId: record.contactId,
      microName: "vue3-vite-child-contact-detail",
      microUrl: "http://z.local.greatld.com:5003/contact-detail",
      refresh: () => {
        fetchContacts();
      },
    });
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      ),
    },
    {
      title: "对应客户",
      width: 200,
      render: (text, record) => (
        <a
          onClick={() => {
            openDrawerDetail({
              title: "客户详情",
              iframe: true,
              customerId: record.customerId,
              microName: "vue3-vite-child-customer-detail",
              microUrl: "http://z.local.greatld.com:5003/customer-detail",
              refresh: () => {
                fetchContacts();
              },
            });
          }}
        >
          {record?.customer?.name || "-"}
        </a>
      ),
    },
    {
      title: "职位",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (text) => text || "-",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (text) => text || "-",
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
      render: (text) => text || "-",
    },
  ];

  return (
    <div>
      <Alert message="这是React子应用的联系人管理列表" banner />

      <Card bordered={false} style={{ boxShadow: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 500 }}>
            <span>共 {pagination.total} 条记录</span>
          </div>
        </div>

        <Table
          rowKey="contactId"
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
        />
      </Card>
    </div>
  );
}

export default Contact;
