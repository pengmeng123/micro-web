import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {});
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
