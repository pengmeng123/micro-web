import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld";

export default defineComponent({
  name: "App",
  setup() {
    const name = ref("pengmeng");
    return {
      name,
    };
  },
  render() {
    return (
      <div
        style={{
          background: "#eee",
        }}
      >
        <div>Vue3-child 子应用</div>
        dsfsdsdfsdffdf==={this.name}
        <HelloWorld />
      </div>
    );
  },
});
