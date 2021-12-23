function isAndroid() {
  return /(android)/i.test(window.navigator.userAgent);
}
function isIOS() {
  return !!window.navigator.userAgent && /iPad|iPhone|iPod/.test(window.navigator.userAgent);
}

const qrcode_url = "https://bit-ar-viewer-qrcode.web.app/?endpoint=";
const url_endpoint = "https://arhub.app/";

function init() {
  function loadFont() {
    const webfontScript = document.createElement("script");
    webfontScript.type = "text/javascript";
    webfontScript.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";

    webfontScript.onload = function () {
      WebFont.load({
        google: {
          families: ["Kanit"],
        },
      });
    };

    document.head.appendChild(webfontScript);
  }

  const makeARbutton = async () => {
    const deviceType = isAndroid() ? "android" : isIOS() ? "ios" : "desktop";
    loadFont();
    // enter partner ID here
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
          window.open(qrcode_url + url_endpoint + "/products/" + productID, "_blank");
          return;
        } else {
          const res = await fetch(
            "https://us-central1-bit-ar-viewer.cloudfunctions.net/button_ar_viewer_api/button_api",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                partnerID: partnerID,
                productID: productID,
                deviceType: deviceType,
              }),
            }
          );
          const ar_model_url = await res.json();
          switch (deviceType) {
            case "ios":
              button.href = ar_model_url + "#allowsContentScaling=0";
              button.click();
              button.addEventListener("click", handleClickButton);
              break;
            case "android":
              button.addEventListener("click", handleClickButton);
              const fallbackUrl = "https://bit.studio";
              const sceneViewerOptions = {
                mode: "ar_only", // ar_preferred
                scheme: "https",
                package: "com.google.android.googlequicksearchbox",
                action: "android.intent.action.VIEW",
                fallback: fallbackUrl,
                link: "https://bit.studio/ARhub",
                title: "Learn more about our AR service",
                resizable: "false",
              };
              const encodedURL = encodeURIComponent(ar_model_url);

              const sceneViewerUrl =
                "intent://arvr.google.com/scene-viewer/1.0?file=" +
                encodedURL +
                "&mode=" +
                sceneViewerOptions.mode +
                "&link=" +
                sceneViewerOptions.link +
                "&title=" +
                sceneViewerOptions.title +
                "&resizable=" +
                sceneViewerOptions.resizable +
                "#Intent;scheme=" +
                sceneViewerOptions.scheme +
                ";package=" +
                sceneViewerOptions.package +
                ";action=" +
                sceneViewerOptions.action +
                ";S.browser_fallback_url=" +
                fallbackUrl +
                ";end;";
              window.open(sceneViewerUrl);
              break;
            default:
              button.addEventListener("click", handleClickButton);
              break;
          }
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
