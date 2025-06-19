export default {
  render() {
    return (
      <div id="app">
        <router-view />
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
