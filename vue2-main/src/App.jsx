export default {
  mounted() {
    window.globalApp = {
      name: "xiaomi",
      age: 25,
    };
  },
  render() {
    return (
      <div id="app">
        sdfdf22333s
        <router-view />
        {/* <micro-app name="vue3-child" url="http://localhost:8081/"></micro-app> */}
        <micro-app name="react-child" url="http://localhost:3001/"></micro-app>
        sdfsf
        <micro-app
          name="vue3-main"
          iframe
          url="http://localhost:5000/"
        ></micro-app>
      </div>
    );
  },
};
