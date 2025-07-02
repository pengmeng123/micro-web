import { defineComponent } from "vue";
import { LikeFilled, LikeOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import styles from "./index.module.less";

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
    showReply: {
      type: Boolean,
      default: true,
    },
    like: {
      type: Function,
    },
  },
  render() {
    const { record } = this;

    return (
      <div class={styles.item}>
        <a-avatar
          size="large"
          shape="square"
          slot="avatar"
          src="https://crm.qcc.com/crm/images/default_avatar.png"
        />
        <div class={styles.content}>
          <div class={styles.header}>
            {record.createName}{" "}
            <span class={styles.date}>
              {record.createDate
                ? moment(record.createDate).format("YYYY-MM-DD HH:mm")
                : "-"}
            </span>
          </div>
          <div v-html={record.richText}></div>
          <div class={styles.actions}>
            <span
              onClick={() => {
                this.like?.(record);
              }}
            >
              {record.likes > 0 ? (
                <span class={styles.like}>
                  <LikeFilled />
                </span>
              ) : (
                <span class={styles.like}>
                  <LikeOutlined />
                </span>
              )}
            </span>
            {/* {this.showReply ? <span class={styles.reply}>Reply to</span> : null} */}
          </div>
        </div>
      </div>
    );
  },
});
