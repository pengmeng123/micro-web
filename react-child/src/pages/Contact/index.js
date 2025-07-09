import React, { useState, useEffect } from "react";
import { Table, Card, Badge, Button, Alert, message } from "antd";
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
  }, []);

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
      pageSize: paginationConfig.pageSize,
    });

    // 使用新的分页参数获取数据
    setTimeout(() => {
      fetchContacts();
    }, 0);
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
      title: "联系人姓名",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record) => (
        <a onClick={() => handleViewDetail(record)}>{text}</a>
      ),
    },
    {
      title: "所属客户",
      dataIndex: "customerName",
      key: "customerName",
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
          {text || "-"}
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
      title: "手机号码",
      dataIndex: "mobile",
      key: "mobile",
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
      dataIndex: "note",
      key: "note",
      render: (text) => text || "-",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Alert
        message="这是React子应用的联系人管理列表"
        banner
        style={{ marginBottom: "15px" }}
      />

      <Card bordered={false} style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleSearch}>
            刷新
          </Button>
        </div>
      </Card>

      <Card bordered={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 500 }}>
            <Badge status="processing" text="联系人列表" />
            <span
              style={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.45)",
                marginLeft: "12px",
                fontWeight: "normal",
              }}
            >
              共 {pagination.total} 条记录
            </span>
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
