import styles from "./index.module.less";
import { Icon, Avatar, Badge, Dropdown, Menu } from "ant-design-vue";
import { mapState } from "vuex";
import { logout } from "@/utils";

export default {
  name: "PageHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["profile", "messageNum"]),
    isLoggedIn() {
      return !!this.profile?.userId;
    },
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToHome() {
      this.$router.push("/");
    },
    goToMessages() {
      this.$message.info("查看消息列表");
      // 实际应用中可能跳转到消息页面
      // this.$router.push("/messages");
    },
    handleLogout() {
      logout();
    },
    handleMenuClick({ key }) {
      switch (key) {
        case "profile":
          this.$message.info("查看个人资料");
          break;
        case "settings":
          this.$message.info("查看设置");
          break;
        case "logout":
          this.handleLogout();
          break;
      }
    },
  },
  render() {
    // 用户下拉菜单
    const userMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const { profile } = this;

    return (
      <div class={styles.header}>
        <div class={styles.logo} onClick={this.goToHome}>
          <Icon type="apartment" style="font-size: 24px; margin-right: 8px;" />
          {/* <span class={styles.title}>Micro-App 框架演示</span> */}
          <span class={styles.title}>xx</span>
        </div>

        <div class={styles.action}>
          {this.isLoggedIn ? (
            <div class={styles.userSection}>
              {/* 消息按钮 */}
              <Badge
                count={this.messageNum}
                overflowCount={99}
                style={{ marginRight: "20px", cursor: "pointer" }}
              >
                <div onClick={this.goToMessages}>
                  <Icon type="bell" style="font-size: 18px;" />
                </div>
              </Badge>

              {/* 用户信息 */}
              <Dropdown overlay={userMenu} placement="bottomRight">
                <div class={styles.userInfo}>
                  <span class={styles.userName}>{profile?.name || "用户"}</span>
                  <Avatar
                    src={profile?.faceimg}
                    icon="user"
                    size="small"
                    class={styles.avatar}
                  />
                  <Icon
                    type="down"
                    style="font-size: 12px; margin-left: 4px;"
                  />
                </div>
              </Dropdown>
            </div>
          ) : (
            <a-button type="primary" icon="user" onClick={this.goToLogin}>
              登录
            </a-button>
          )}
        </div>
      </div>
    );
  },
};
