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
      text_a.innerText = "ดูโมเดลด้วย";
      let icon = document.createElement("img");
      icon.src = "https://storage.googleapis.com/bit-ar-viewer/commer_button/ar_icon.svg";
      let text_b = document.createElement("p");
      text_b.innerText = "ARhub";
      wrapper.appendChild(text_a);
      wrapper.appendChild(icon);
      wrapper.appendChild(text_b);
      button.appendChild(wrapper);

      const productID = button.getAttribute("data-product-id");

      const handleClickButton = async () => {
        button.removeEventListener("click", handleClickButton);
        button.addEventListener("click", handleClickButton);
        window.open(model_fetcher_url + "/?id=" + productID);
      };
      button.addEventListener("click", handleClickButton);

      // console.log(button.childNodes);
      // for (let node of button.childNodes) {
      //   if (node.className === "ar-hub-btn-loader") {
      //     button.removeChild(node);
      //   }
      // }
    }
  };

  makeARbutton();
}

window.addEventListener("load", () => {
  console.log("load js");
  init();
});
