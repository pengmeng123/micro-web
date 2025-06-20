import styles from "./index.module.less";

export default {
  name: "PageLoading",
  props: {
    size: {
      type: String,
      default: "default", // 可选值: small, default, large
    },
    tip: {
      type: String,
      default: "数据加载中...",
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const loadingClass = [
      styles.loadingContainer,
      styles[this.size],
      this.fullScreen ? styles.fullScreen : "",
    ].join(" ");

    return (
      <div class={loadingClass}>
        <div class={styles.spinner}>
          <div class={styles.bounce1}></div>
          <div class={styles.bounce2}></div>
          <div class={styles.bounce3}></div>
        </div>
        {this.tip && <div class={styles.loadingText}>{this.tip}</div>}
      </div>
    );
  },
};
