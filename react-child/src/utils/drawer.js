// 模拟Vue项目中的openDrawerDetail函数
export const openDrawerDetail = (options) => {
  // 如果在微前端环境中，通过微前端通信打开抽屉
  if (window.__MICRO_APP_ENVIRONMENT__) {
    window.microApp.dispatch({
      type: "openDrawerDetail",
      data: options,
    });
    return;
  }

  // 如果不在微前端环境中，可以使用React自己的抽屉组件
  // 这里需要根据实际情况实现
  console.log("打开抽屉详情:", options);

  // 如果有全局状态管理，可以通过dispatch action来打开抽屉
  // store.dispatch({ type: 'drawer/open', payload: options });
};
