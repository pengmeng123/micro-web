import { defineComponent, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import { deleteCustomer } from "@/service";
import PersonalDetail from "@/components/personal-detail";
import styles from "./index.module.less";

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const loading = ref(false);
    const showPersonalDrawer = ref(false);
    const currentUserId = ref(undefined);

    const handleDelete = () => {
      Modal.confirm({
        title: "确认删除",
        content: `确定要删除客户"${props.record.name}"吗？此操作不可恢复。`,
        okText: "确定",
        cancelText: "取消",
        okType: "danger",
        onOk: async () => {
          try {
            loading.value = true;
            // await deleteCustomer(props.record.customerId);
            // message.success("删除成功");

            // 通知主应用关闭详情页面
            if (window.microApp) {
              window.microApp.dispatch({
                type: "dr:close-refresh",
              });
            }
          } catch (error) {
            message.error("删除失败，请重试");
          } finally {
            loading.value = false;
          }
        },
      });
    };

    const handlePersonalDrawer = (userId) => {
      currentUserId.value = userId;
      showPersonalDrawer.value = true;
    };
    const handleClosePersonalDrawer = () => {
      currentUserId.value = undefined;
      showPersonalDrawer.value = false;
    };

    return {
      loading,
      handleDelete,
      handlePersonalDrawer,
      handleClosePersonalDrawer,
      showPersonalDrawer,
      currentUserId,
    };
  },

  render() {
    const {
      record,
      loading,
      handleDelete,
      showPersonalDrawer,
      handlePersonalDrawer,
      handleClosePersonalDrawer,
      currentUserId,
    } = this;
    const userCustomers =
      record.userCustomers?.filter((v) => v.roleId === 4) || [];

    return (
      <div class={styles.container}>
        <div class={styles.title}>
          <div>{record.name}</div>
          <div class={styles.actions}>
            <a-button loading={loading} onClick={handleDelete}>
              <DeleteOutlined />
              删除客户
            </a-button>
          </div>
        </div>
        <div>
          <span class={styles.label}>客户编号：</span>
          {record.code}&nbsp;&nbsp;&nbsp;&nbsp;
          <span class={styles.label}>负责人：</span>
          {userCustomers.map((v, index) => (
            <span key={v.userId}>
              <a
                onClick={() => {
                  handlePersonalDrawer(v.userId);
                }}
              >
                {v.name}
              </a>
              {index !== userCustomers.length - 1 && <span>, </span>}
            </span>
          ))}
          &nbsp;&nbsp;
        </div>

        <a-drawer
          visible={showPersonalDrawer}
          placement="right"
          closable={false}
          bodyStyle={{
            padding: 0,
          }}
          onClose={handleClosePersonalDrawer}
        >
          {showPersonalDrawer && <PersonalDetail userId={currentUserId} />}
        </a-drawer>
      </div>
    );
  },
});
