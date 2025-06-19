import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld";
import LogoImg from "./assets/xx.svg";

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
        <img src={LogoImg} alt="logo" />
        <HelloWorld />
      </div>
    );
  },
});
