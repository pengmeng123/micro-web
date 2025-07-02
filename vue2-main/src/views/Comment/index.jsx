import styles from "./index.module.less";
import { MICRO_MAPPER } from "@/config";

export default {
  name: "PageComment",
  render() {
    return (
      <div class={styles.container}>
        <micro-app
          clear-data
          name={MICRO_MAPPER.VUE3_VITE_CHILD.name}
          iframe={true}
          url={`${MICRO_MAPPER.VUE3_VITE_CHILD.host}/comment`}
        ></micro-app>
      </div>
    );
  },
};
