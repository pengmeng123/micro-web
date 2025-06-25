import { defineComponent, ref, onMounted } from "vue";
import { getPersonalDetail } from "@/service/index";
import styles from "./index.module.less";
import moment from "moment";

export default defineComponent({
  props: {
    userId: {
      type: Number,
    },
  },
  setup(props) {
    const loading = ref(true);
    const userInfo = ref({});

    onMounted(() => {
      const data = window.microApp?.getData?.();
      console.log("微前端全局数据:", data);
      const userId = props.userId || data?.userId;
      if (userId) {
        fetchPersonalDetail(userId);
      }
    });

    const fetchPersonalDetail = (userId) => {
      loading.value = true;
      getPersonalDetail(userId)
        .then((res) => {
          userInfo.value = res.data || {};
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      userInfo,
      loading,
    };
  },
  render() {
    const { userInfo } = this;
    if (this.loading) {
      return (
        <div style={{ padding: "20px 15px 15px" }}>
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
          <a-skeleton />
        </div>
      );
    }

    return (
      <div class={styles.personalDetailContainer}>
        <div class={styles.userCard}>
          {/* 头部区域 */}
          <div class={styles.cardHeader}>
            <div class={styles.avatarSection}>
              <img
                src={userInfo.faceimg || userInfo.faceImg}
                alt="用户头像"
                class={styles.avatar}
              />
              <div
                class={`${styles.statusBadge} ${
                  styles[`status${userInfo.active ? "Active" : "Inactive"}`]
                }`}
              >
                {userInfo.active ? "在职" : "离职"}
              </div>
            </div>
            <div class={styles.basicInfo}>
              <h2 class={styles.userName}>{userInfo.name}</h2>
              <p class={styles.department}>
                {userInfo.departments?.map((item) => item.name)?.join(",")}
              </p>
            </div>
          </div>

          {/* 详细信息区域 */}
          <div class={styles.cardBody}>
            <a-alert message="这是vue3+vite_child子应用的用户详情页" banner />
            <div class={styles.infoGrid}>
              <div class={styles.infoItem}>
                <div class={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div class={styles.infoContent}>
                  <span class={styles.infoLabel}>邮箱</span>
                  <span class={styles.infoValue}>{userInfo.email || "-"}</span>
                </div>
              </div>

              <div class={styles.infoItem}>
                <div class={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div class={styles.infoContent}>
                  <span class={styles.infoLabel}>电话</span>
                  <span class={styles.infoValue}>{userInfo.phone || "-"}</span>
                </div>
              </div>

              <div class={styles.infoItem}>
                <div class={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                </div>
                <div class={styles.infoContent}>
                  <span class={styles.infoLabel}>开通时间</span>
                  <span class={styles.infoValue}>
                    {userInfo.createDate
                      ? moment(userInfo.createDate).format("YYYY-MM-DD HH:mm")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
