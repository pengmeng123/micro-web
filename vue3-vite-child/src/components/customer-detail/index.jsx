import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      if (window.microApp) {
        const data = window.microApp.getData();
        console.log("f[[===", data);
      }
    });
    return {};
  },
  render() {
    return <div>customer -detail</div>;
  },
});
