import styles from "./index.module.less";
import { MICRO_MAPPER } from "@/config";

export default {
  name: "PageContact",
  render() {
    return (
      <div class={styles.container}>
        <micro-app
          clear-data
          name={MICRO_MAPPER.REACT_CHILD.name + "-contact"}
          url={`${MICRO_MAPPER.REACT_CHILD.host}/contact`}
        ></micro-app>
      </div>
    );
  },
};
