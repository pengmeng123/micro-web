function MicroImage({ src }) {
  const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;
  // 处理图片路径
  let imgSrc = src;
  if (isMicroApp) {
    if (typeof src === "string") {
      imgSrc = `${window.location.origin}${src}`;
    }
  }

  return <img src={imgSrc} alt="" />;
}

export default MicroImage;
