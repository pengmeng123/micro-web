import Vue from "vue";
export default Vue.extend({
  name: "Gt4Validator",
  props: {},
  data() {
    return {
      captcha: `captcha-gt-${Date.now()}`,
      extraParams: {},
    };
  },
  mounted() {
    this.loadScript().then(() => {
      this.init();
    });
  },
  beforeDestroy() {
    this.gt?.destroy?.();
  },
  methods: {
    loadScript() {
      return new Promise((resolve, reject) => {
        if (window?.initGeetest4) {
          resolve();
          return;
        }
        const aScript = document.createElement("script");
        aScript.type = "text/javascript";
        aScript.src = "//qcc-static.qcc.com/resources/web/js/gt4.js";
        document.head.appendChild(aScript);
        aScript.onerror = reject;
        aScript.onload = () => {
          resolve();
        };
      });
    },
    init() {
      const captchaId = "90107ad52ca64bb0a2c0b755f927628f"; // gt_id
      window.initGeetest4(
        {
          captchaId,
          product: "bind",
          nextWidth: "280px",
        },
        (gt) => {
          this.gt = gt;
          gt.appendTo("#" + this.captcha)
            .onSuccess(() => {
              const result = gt.getValidate();
              this.$emit("validated", { ...this.extraParams, captcha: result });
            })
            .onClose(() => {
              this.$message.error("验证失败");
            });
        }
      );
    },
    reset() {
      this.gt?.reset?.();
    },
    showCaptcha(params = {}) {
      this.extraParams = params || {};
      this.gt?.showCaptcha?.();
    },
  },
  render() {
    return <div id={this.captcha}></div>;
  },
});
