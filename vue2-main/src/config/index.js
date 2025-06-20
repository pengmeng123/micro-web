import DefaultLayout from "@/layout/default";
import BlankLayout from "@/layout/blank";

export const CRMSESSID = "CRMSESSID";
export const LAYOUT_MAPPING = {
  default: DefaultLayout,
  blank: BlankLayout,
};

export const menuOptions = [
  {
    key: "customer",
    icon: "team",
    title: "客户管理",
    path: "/customer",
  },
  {
    key: "contact",
    icon: "shopping",
    title: "联系人管理",
    path: "/contact",
  },
  {
    key: "opportunity",
    icon: "shopping-cart",
    title: "商机管理",
    path: "/opportunity",
  },
];

export const nameMap = {
  customer: "客户管理",
  contact: "联系人管理",
  opportunity: "商机管理",
};

export const MICRO_MAPPER = {
  VUE3_VITE_CHILD: {
    name: "vue3-vite-child",
    host: "http://localhost:5003",
  },
};
