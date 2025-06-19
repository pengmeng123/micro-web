import styles from "./index.module.less";
import Header from "@/components/Header";
import { Layout, Menu, Icon, Breadcrumb } from "ant-design-vue";
import { mapState } from "vuex";
import { menuOptions, nameMap } from "@/config";

export default {
  name: "DefaultLayout",

  data() {
    return {
      collapsed: false,
      menuItems: menuOptions,
      breadcrumbItems: [],
    };
  },

  computed: {
    ...mapState({
      profile: (state) => state.profile,
    }),

    currentPath() {
      return this.$route.path;
    },

    selectedKeys() {
      const currentPath = this.currentPath;
      const menuItem = this.menuItems.find((item) =>
        currentPath.startsWith(item.path)
      );
      return menuItem ? [menuItem.key] : [];
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        // 更新面包屑
        this.updateBreadcrumb(route);
      },
    },
  },

  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    handleMenuClick(item) {
      this.$router.push(
        this.menuItems.find((menuItem) => menuItem.key === item.key)?.path ||
          "/"
      );
    },

    updateBreadcrumb(route) {
      const pathSnippets = route.path.split("/").filter((i) => i);
      const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return {
          path: url,
          breadcrumbName: this.getBreadcrumbName(snippet),
        };
      });

      this.breadcrumbItems = breadcrumbItems;
    },

    getBreadcrumbName(path) {
      return nameMap[path] || path;
    },
  },

  render() {
    const { Sider, Content } = Layout;

    return (
      <div class={styles.container}>
        <Header />

        <Layout class={styles.mainLayout}>
          {/* 左侧菜单 */}
          <Sider
            width="240"
            theme="dark"
            collapsible
            collapsed={this.collapsed}
            onCollapse={this.toggleCollapsed}
            class={styles.sider}
          >
            <div class={styles.userInfo}>
              <div class={styles.avatar}>
                {this.profile?.name?.charAt(0) || "U"}
              </div>
              {!this.collapsed && (
                <div class={styles.userMeta}>
                  <div class={styles.userName}>
                    {this.profile?.name || "用户"}
                  </div>
                  <div class={styles.userRole}>管理员</div>
                </div>
              )}
            </div>
            {/* 菜单 */}
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={this.selectedKeys}
              onClick={this.handleMenuClick}
            >
              {this.menuItems.map((item) => (
                <Menu.Item key={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

          {/* 右侧内容区 */}
          <Layout class={styles.contentLayout}>
            {/* 面包屑导航 */}
            <div class={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Icon type="home" />
                  <span>主应用</span>
                </Breadcrumb.Item>
                {this.breadcrumbItems.map((item) => (
                  <Breadcrumb.Item key={item.path}>
                    {item.breadcrumbName}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>

            {/* 内容区 */}
            <Content class={styles.content}>
              <router-view />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  },
};
