import Cookies from "js-cookie";
import { CRMSESSID, LAYOUT_MAPPING } from "@/config";
import microApp from "@micro-zoe/micro-app";
import { mapActions } from "vuex";
import PageLoading from "@/components/Loading";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    const token = Cookies.get(CRMSESSID);
    if (token) {
      microApp.setGlobalData({
        token,
      });
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapActions(["fetchGetProfile"]),
    init() {
      this.isLoading = true;
      return this.fetchGetProfile().finally(() => {
        this.isLoading = false;
      });
    },
  },
  render() {
    const Layout = LAYOUT_MAPPING[this.$route.meta?.layout || "blank"];
    return (
      <div id="app">
        {this.isLoading ? (
          <PageLoading fullScreen />
        ) : (
          <a-locale-provider locale={zhCN}>
            <Layout />
          </a-locale-provider>
        )}
      </div>
    );
  },
};
