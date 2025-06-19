export default {
  render() {
    return (
      <div id="app">
        sdfdf22333s
        <router-view />
        <micro-app name="vue3-child" url="http://localhost:8081/"></micro-app>
        <micro-app name="react-child" url="http://localhost:3001/"></micro-app>
      </div>
    );
  },
};
