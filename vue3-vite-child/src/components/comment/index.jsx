import { defineComponent, onMounted, ref } from "vue";
import { getTrackingReplyList, likeAction } from "@/service";
import { message } from "ant-design-vue";
import Item from "./item";

import styles from "./index.module.less";

export default defineComponent({
  name: "Comment",
  setup() {
    const data = ref([]);
    const fetchData = () => {
      return getTrackingReplyList().then((res) => {
        data.value = res.data;
      });
    };
    const handleLike = (item) => {
      likeAction(item.id, {
        userId: 1429,
      }).then((res) => {
        if (res.data?.affected === 1) {
          item.likes === 0
            ? message.success("点赞成功")
            : message.success("已取消点赞");
          data.value = data.value.map((v) => {
            if (v.id === item.id) {
              v.likes = item.likes === 1 ? 0 : 1;
            }
            return v;
          });
        }
      });
    };
    onMounted(() => {
      fetchData();
    });

    return {
      data,
      handleLike,
    };
  },
  render() {
    const { data, handleLike } = this;

    return (
      <div class={styles.container}>
        {data.map((v) => {
          return (
            <div class={styles.comment}>
              <Item record={v} like={handleLike} />
              <div
                class={styles.replayList}
                vShow={v.trackingPlanAppraiseResponseList?.length > 0}
              >
                {v.trackingPlanAppraiseResponseList.map((v) => (
                  <Item record={v} like={handleLike} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
