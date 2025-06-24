import { defineComponent } from "vue";
import styles from "./index.module.less";
import { Card } from "ant-design-vue";

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const { record } = this;
    return (
      <div class={styles.container}>
        <a-card
          bordered={false}
          title={"基本信息"}
          bodyStyle={{
            padding: "24px 15px",
            boxShadow: "none",
          }}
          headStyle={{
            padding: "0",
            margin: "0 15px",
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>客户名称</td>
                <td>{record.name}</td>
                <td>客户来源</td>
                <td>{record.sourceName || "-"}</td>
              </tr>
              <tr>
                <td>客户分组</td>
                <td>{record.tagName || "-"}</td>
                <td>客户分类</td>
                <td>{record.levelName || "-"}</td>
              </tr>
              <tr>
                <td>联系邮箱</td>
                <td>{record.email || "-"}</td>
                <td>地址</td>
                <td>{record.address || "-"}</td>
              </tr>
              <tr>
                <td>所属地区</td>
                <td>{[record.areasDesc]}</td>
                <td>备注</td>
                <td>{record.note || "-"}</td>
              </tr>
            </tbody>
          </table>
        </a-card>
      </div>
    );
  },
});
