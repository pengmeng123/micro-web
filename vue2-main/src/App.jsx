import Cookies from "js-cookie";
import { CRMSESSID, LAYOUT_MAPPING } from "@/config";
import microApp from "@micro-zoe/micro-app";
import { mapMutations } from "vuex";
import { getProfile } from "@/service";

export default {
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
      return getProfile().then((res) => {
        this.setProfile(res);
      });
    },
  },
  render() {
    const Layout = LAYOUT_MAPPING[this.$route.meta?.layout || "blank"];
    return (
      <div id="app">
        <Layout />
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
