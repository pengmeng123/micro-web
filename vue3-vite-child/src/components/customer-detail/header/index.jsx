import { defineComponent } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import styles from "./index.module.less";

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
  },

  render() {
    const { record } = this;
    const userCustomers =
      record.userCustomers?.filter((v) => v.roleId === 4) || [];
    return (
      <div class={styles.container}>
        <div class={styles.title}>
          <div>{record.name}</div>
          <div class={styles.actions}>
            <a-button>
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
            <span>
              <a>{v.name}</a>
              {index !== userCustomers.length - 1 && <span>, </span>}
            </span>
          ))}
          &nbsp;&nbsp;
        </div>
      </div>
    );
  },
});
