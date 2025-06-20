import styles from "./index.module.less";
import { customerSearch } from "@/service";

export default {
  name: "PageCustomer",

  data() {
    return {
      pagination: {
        pageIndex: 1,
        pageSize: 20,
      },
      dataSource: [],
    };
  },

  mounted() {
    this.fetchCustomer();
  },

  methods: {
    fetchCustomer() {
      return customerSearch({
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      }).then((res) => {
        this.dataSource = res.data || [];
      });
    },
  },
  render() {
    return <div class={styles.container}>customer</div>;
  },
};
