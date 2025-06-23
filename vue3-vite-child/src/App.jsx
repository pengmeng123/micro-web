import { defineComponent } from "vue";

export default defineComponent({
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
