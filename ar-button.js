const model_fetcher_url = "https://model-fetcher-website-a4ghjocxma-uc.a.run.app";
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
    loadFont();

    let partnerID = undefined;
    try {
      partnerID = window.partnerID;
    } catch (err) {
      console.error(err);
    }

    const buttons = document.getElementsByClassName("ar-hub-btn");

    for (const button of buttons) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("content-wrapper");
      let text_a = document.createElement("p");
      // text_a.style.margin = "0";
      text_a.innerText = "ดูโมเดลด้วย";
      // text_a.style.whiteSpace = "pre";
      // text_a.style.fontSize = "2.8rem";
      let icon = document.createElement("img");
      // icon.style.height = "60%";
      // icon.style.width = "auto";
      // icon.style.margin = "0 0.6rem";
      icon.src = "https://storage.googleapis.com/bit-ar-viewer/commer_button/ar_icon.svg";
      let text_b = document.createElement("p");
      // text_b.style.margin = "0";
      text_b.innerText = "ARhub";
      // text_b.style.fontSize = "2.8rem";
      wrapper.appendChild(text_a);
      wrapper.appendChild(icon);
      wrapper.appendChild(text_b);

      // wrapper.style.height = "8rem";
      // wrapper.style.width = "100%";
      // wrapper.style.display = "flex";
      // wrapper.style.justifyContent = "center";
      // wrapper.style.alignItems = "center";

      button.appendChild(wrapper);

      // button.style.display = "flex";
      // button.style.width = "100%";
      // button.style.maxWidth = "360px";
      // button.style.height = "100%";
      // button.style.maxHeight = "250px";
      // button.style.paddingTop = "1rem";
      // button.style.paddingBottom = "1rem";
      // button.style.paddingLeft = "2rem";
      // button.style.paddingRight = "2rem";
      // button.style.background = "#0025f5";
      // button.style.color = "white";
      // button.style.borderRadius = "45px";
      // button.style.textAlign = "center";
      // button.style.justifyContent = "center";
      // button.style.alignItems = "center";
      // button.style.fontFamily = "Kanit";
      // button.style.fontStyle = "Regular";
      // button.style.fontSize = "1.6rem";
      // button.style.lineHeight = "140%";
      // button.style.margin = "auto";
      // button.style.border = "none";

      // button.style.cursor = "pointer";
      // button.style.textDecoration = "none";

      const productID = button.getAttribute("data-product-id");

      const handleClickButton = async () => {
        button.removeEventListener("click", handleClickButton);
        button.addEventListener("click", handleClickButton);
        window.open(model_fetcher_url + "/?id=" + productID);
      };
      button.addEventListener("click", handleClickButton);

      console.log(button.childNodes);
      for (let node of button.childNodes) {
        if (node.className === "ar-hub-btn-loader") {
          button.removeChild(node);
        }
      }
    }
  };

  makeARbutton();
}

window.addEventListener("load", () => {
  console.log("load js");
  init();
});
