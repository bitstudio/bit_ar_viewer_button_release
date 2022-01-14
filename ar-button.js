function isAndroid() {
  return /(android)/i.test(window.navigator.userAgent);
}
function isIOS() {
  return !!window.navigator.userAgent && /iPad|iPhone|iPod/.test(window.navigator.userAgent);
}

const qrcode_url = "https://bit-ar-viewer-qrcode.web.app/?endpoint=";
const model_fetcher_url = "https://model-fetcher-website-a4ghjocxma-uc.a.run.app";
const url_endpoint = "https://arhub.app/";

function init() {
  const makeARbutton = async () => {
    const deviceType = isAndroid() ? "android" : isIOS() ? "ios" : "desktop";
    let partnerID = undefined;
    try {
      partnerID = window.partnerID;
    } catch (err) {
      console.error(err);
    }

    const buttons = document.getElementsByClassName("ar-hub-btn");

    for (const button of buttons) {
      let nodeList = button.childNodes;
      for (const nodeItem of nodeList) {
        if (nodeItem.nodeName === "IMG") {
          nodeItem.src =
            "https://storage.googleapis.com/bit-ar-viewer/commer_button/ar_icon_w3.png";
          nodeItem.style.height = "2rem";
        }
      }

      button.style.display = "flex";
      button.style.width = "100%";
      button.style.maxWidth = "350px";
      button.style.paddingTop = "1rem";
      button.style.paddingBottom = "1rem";
      button.style.paddingLeft = "2rem";
      button.style.paddingRight = "2rem";
      button.style.background = "#0025f5";
      button.style.color = "white";
      button.style.borderRadius = "45px";
      button.style.textAlign = "center";
      button.style.justifyContent = "center";
      button.style.alignItems = "center";
      button.style.fontFamily = "Kanit";
      button.style.fontStyle = "Regular";
      button.style.fontSize = "1.6rem";
      button.style.lineHeight = "140%";
      button.style.margin = "auto";

      button.style.cursor = "pointer";
      button.style.textDecoration = "none";

      const img = document.getElementsByClassName("ar-hub-btn")[0].children[0];
      img.style.width = "100%";
      img.style.height = "auto";

      const productID = button.getAttribute("data-product-id");

      const handleClickButton = async () => {
        button.removeEventListener("click", handleClickButton);
        if (deviceType === "desktop") {
          button.addEventListener("click", handleClickButton);
          window.open(qrcode_url + url_endpoint + "products/" + productID, "_blank");
          return;
        } else {
          button.addEventListener("click", handleClickButton);
          window.open(model_fetcher_url + "/?id=" + productID);
        }
      };
      button.addEventListener("click", handleClickButton);
    }
  };

  makeARbutton();
}

window.addEventListener("load", () => {
  init();
});
