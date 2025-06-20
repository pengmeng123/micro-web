import Header from "@/components/Header";
import styles from "./index.module.less";
import { Row, Col, Card, Icon } from "ant-design-vue";

export default {
  name: "PageIntroduce",

  render() {
    return (
      <div>
        <Header />

        <div class={styles.content}>
          {/* 顶部横幅 */}
          <div class={styles.banner}>
            <h1 class={styles.bannerTitle}>微前端解决方案</h1>
            <p class={styles.bannerDesc}>
              基于 micro-app
              的微前端架构，实现多框架共存与协作，提升开发效率与用户体验
            </p>
            <a-button type="primary" size="large">
              开始体验
            </a-button>
          </div>

          {/* 特性介绍 */}
          <div class={styles.featureSection}>
            <h2 class={styles.featureTitle}>核心特性</h2>

            <div class={styles.featureList}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="apartment"
                      style="font-size: 32px; color: #1890ff; margin-bottom: 16px;"
                    />
                    <h3>多框架共存</h3>
                    <p>支持 React、Vue、Angular 等多框架技术栈同时运行</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="deployment-unit"
                      style="font-size: 32px; color: #52c41a; margin-bottom: 16px;"
                    />
                    <h3>独立部署</h3>
                    <p>各子应用可独立开发、测试、部署,提高团队协作效率</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="thunderbolt"
                      style="font-size: 32px; color: #faad14; margin-bottom: 16px;"
                    />
                    <h3>性能优化</h3>
                    <p>按需加载子应用，减少首屏加载时间，提升用户体验</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="safety"
                      style="font-size: 32px; color: #eb2f96; margin-bottom: 16px;"
                    />
                    <h3>沙箱隔离</h3>
                    <p>JS 沙箱确保子应用之间互不干扰，提高系统稳定性</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="api"
                      style="font-size: 32px; color: #722ed1; margin-bottom: 16px;"
                    />
                    <h3>数据通信</h3>
                    <p>提供简单高效的应用间通信方案，实现数据共享</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card hoverable>
                    <Icon
                      type="code"
                      style="font-size: 32px; color: #13c2c2; margin-bottom: 16px;"
                    />
                    <h3>简单易用</h3>
                    <p>低侵入性设计，快速集成到现有项目，降低学习成本</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>

          {/* 应用展示 */}
          <div style="padding: 64px 24px; background: #fff;">
            <h2 class={styles.featureTitle}>子应用展示</h2>

            <Row gutter={[24, 24]} style="max-width: 1200px; margin: 0 auto;">
              <Col xs={24} md={12}>
                <Card
                  title="Vue3 子应用"
                  extra={<a-button type="link">查看</a-button>}
                  hoverable
                  cover={
                    <div style="height: 200px; background: #f5f5f5; display: flex; justify-content: center; align-items: center;">
                      <Icon
                        type="html5"
                        style="font-size: 64px; color: #41b883;"
                      />
                    </div>
                  }
                >
                  <p>基于 Vue 3 + Vite 构建的现代化前端应用</p>
                  <p>技术栈: Vue 3, Composition API, Vite</p>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card
                  title="React 子应用"
                  extra={<a-button type="link">查看</a-button>}
                  hoverable
                  cover={
                    <div style="height: 200px; background: #f5f5f5; display: flex; justify-content: center; align-items: center;">
                      <Icon
                        type="html5"
                        style="font-size: 64px; color: #61dafb;"
                      />
                    </div>
                  }
                >
                  <p>基于 React 构建的用户界面</p>
                  <p>技术栈: React, Hooks, Create React App</p>
                </Card>
              </Col>
            </Row>
          </div>

          {/* 快速开始 */}
          <div style="padding: 64px 24px; background: #f0f2f5; text-align: center;">
            <h2 class={styles.featureTitle}>快速开始</h2>
            <p style="max-width: 600px; margin: 0 auto 32px;">
              只需几个简单步骤，即可在您的项目中集成微前端架构
            </p>

            <div style="display: flex; justify-content: center; margin-bottom: 32px;">
              <a-button
                type="primary"
                size="large"
                icon="github"
                style="margin-right: 16px;"
              >
                GitHub
              </a-button>
              <a-button size="large" icon="book">
                查看文档
              </a-button>
            </div>

            <Card style="max-width: 800px; margin: 0 auto; text-align: left;">
              <div style="background: #f5f5f5; padding: 16px; border-radius: 4px; font-family: monospace; overflow-x: auto;">
                <p style="margin: 0;">// 安装依赖</p>
                <p style="margin: 8px 0; color: #1890ff;">
                  npm install @micro-zoe/micro-app --save
                </p>
                <p style="margin: 8px 0 0;">// 在主应用中引入</p>
                <p style="margin: 8px 0; color: #1890ff;">
                  import microApp from '@micro-zoe/micro-app'
                </p>
                <p style="margin: 8px 0; color: #1890ff;">microApp.start()</p>
              </div>
            </Card>
          </div>

          {/* 页脚 */}
          <div class={styles.footer}>
            <p>© 2023 Micro-App 框架演示 | 基于 micro-app 构建</p>
          </div>
        </div>
      </div>
    );
  },
};
