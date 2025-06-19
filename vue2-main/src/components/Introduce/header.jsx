import styles from "./index.module.less";
import { Icon } from "ant-design-vue";

export default {
  name: "IntroduceHeader",
  render() {
    return (
      <div class={styles.header}>
        <div class={styles.logo}>
          <Icon type="apartment" style="font-size: 24px; margin-right: 8px;" />
          <span class={styles.title}>Micro-App 框架演示</span>
        </div>
        <div class={styles.action}>
          <a-button type="primary" icon="user">
            登录
          </a-button>
        </div>
      </div>
    );
  },
};
