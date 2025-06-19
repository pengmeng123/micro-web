import styles from "./index.module.less";
import Header from "@/components/Header";

export default {
  name: "DefaultLayout",
  mounted() {},
  render() {
    return (
      <div class={styles.container}>
        <Header />
        <div class={styles.content}>
          <a-layout>
            <a-layout-sider width="200" style="background: #fff">
              <a-menu theme="dark">
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
              </a-menu>
            </a-layout-sider>
          </a-layout>
        </div>
        <router-view />
      </div>
    );
  },
};
