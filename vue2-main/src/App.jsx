import Cookies from "js-cookie";
import { CRMSESSID, LAYOUT_MAPPING } from "@/config";
import microApp from "@micro-zoe/micro-app";
import { mapMutations } from "vuex";
import { getProfile } from "@/service";
import PageLoading from "@/components/Loading";

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
    this.fetchGetProfile();
  },

  methods: {
    ...mapMutations({
      setProfile: "SET_PROFILE",
    }),
    fetchGetProfile() {
      this.isLoading = true;
      return getProfile()
        .then((res) => {
          this.setProfile(res);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  render() {
    const Layout = LAYOUT_MAPPING[this.$route.meta?.layout || "blank"];
    return (
      <div id="app">
        {this.isLoading ? <PageLoading fullScreen /> : <Layout />}
        {/* <micro-app name="vue3-child" url="http://localhost:8081/"></micro-app> */}
        {/* <micro-app name="react-child" url="http://localhost:3001/"></micro-app>
        <micro-app
          name="vue3-main"
          iframe
          url="http://localhost:5000/"
        ></micro-app> */}
      </div>
    );
  },
};
