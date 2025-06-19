import styles from "./index.module.less";
import { Form, Input, Button, Icon, Divider } from "ant-design-vue";
import Header from "../Introduce/header";
import microApp from "@micro-zoe/micro-app";

export default {
  name: "PageLogin",
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          console.log("登录信息:", values);
          setTimeout(() => {
            this.loading = false;
            microApp.setGlobalData({
              token: "ce3885e2743e4432a651ddd381bc0b43",
            });
            this.$message.success("登录成功");
            // 登录成功后跳转
            this.$router.push("/");
          }, 1500);
        }
      });
    },
  },
  render() {
    const { getFieldDecorator } = this.form;
    return (
      <div class={styles.loginPage}>
        <Header />

        <div class={styles.container}>
          <div class={styles.loginCard}>
            <h2 class={styles.title}>账号登录</h2>
            <Divider />

            <Form onSubmit={this.handleSubmit} class={styles.loginForm}>
              <Form.Item>
                {getFieldDecorator("phone", {
                  rules: [
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
                  ],
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="mobile" style="color: rgba(0,0,0,.25)" />
                    }
                    placeholder="请输入手机号"
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "请输入密码" },
                    { min: 6, message: "密码长度不能少于6位" },
                  ],
                })(
                  <Input.Password
                    size="large"
                    prefix={<Icon type="lock" style="color: rgba(0,0,0,.25)" />}
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={this.loading}
                  class={styles.loginButton}
                  onClick={this.handleSubmit}
                >
                  立即登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  },
};
