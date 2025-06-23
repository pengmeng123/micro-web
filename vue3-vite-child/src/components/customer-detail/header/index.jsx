import { defineComponent } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import styles from "./index.module.less";

export default defineComponent({
  render() {
    return (
      <div class={styles.container}>
        <div class={styles.title}>
          <div>繁創電子科技（香港）有限公司</div>
          <div class={styles.actions}>
            <a-button>
              <DeleteOutlined />
              删除客户
            </a-button>
          </div>
        </div>
        <div>
          <span class={styles.label}>客户编号：</span>
          CU0005240688&nbsp;&nbsp;&nbsp;&nbsp;
          <span class={styles.label}>负责人：</span>小明&nbsp;&nbsp;
        </div>
      </div>
    );
  },
});
