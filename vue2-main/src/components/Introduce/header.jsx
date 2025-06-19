import styles from "./index.module.less";
import { Icon } from "ant-design-vue";

export default {
  name: "IntroduceHeader",
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToHome() {
      this.$router.push("/");
    },
  },
  render() {
    return (
      <div class={styles.header}>
        <div class={styles.logo} onClick={this.goToHome}>
          <Icon type="apartment" style="font-size: 24px; margin-right: 8px;" />
          <span class={styles.title}>Micro-App 框架演示</span>
        </div>
        <div class={styles.action}>
          <a-button type="primary" icon="user" onClick={this.goToLogin}>
            登录
          </a-button>
        </div>
      </div>
    );
  },
};
