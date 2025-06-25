import { defineComponent, onMounted } from "vue";
import Cookies from "js-cookie";

export default defineComponent({
  setup() {
    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getGlobalData() || {};
        console.log("data", data);
        Cookies.set("CRMSESSID", data.token);
      }
    });
  },
  render() {
    return (
      <div>
        <a-config-provider prefixCls={"vue3-vite-child-ant"}>
          <router-view />
        </a-config-provider>
      </div>
    );
  },
});
