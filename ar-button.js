import { isAndroid, isIOS } from 'mobile-device-detect';
import { getProductIDDetail, getARModel } from './api'

function init() {

    function loadFont() {
        const webfontScript = document.createElement('script');
        webfontScript.type = 'text/javascript';
        webfontScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'

        webfontScript.onload = function () {
            WebFont.load({
                google: {
                    families: ['Kanit']
                }
            });
        }

        document.head.appendChild(webfontScript);
    }

    async function makeARbutton() {
        loadFont()

        const buttons = document.getElementsByClassName("ar-hub-btn")

        for (const button of buttons) {

            const div = document.createElement("div")
            const icon = document.createElement("img")
            const trickImg = document.createElement("img")

            icon.src = "./static/ar_icon_w 3.svg"
            icon.style.paddingRight = "2rem";

            trickImg.src = "https://image.shutterstock.com/image-vector/augmented-reality-3d-object-outline-600w-1679243428.jpg"
            trickImg.width = 0
            trickImg.height = 0

            div.style.display = "flex";
            div.style.width = "fit-content";
            div.style.paddingTop = "1rem";
            div.style.paddingBottom = "1rem";
            div.style.paddingLeft = "2.5rem";
            div.style.paddingRight = "2.5rem";
            div.style.background = "#2A6DC9";
            div.style.color = "white";
            div.style.borderRadius = "45px";
            div.style.textAlign = "center";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.fontFamily = "Kanit";
            div.style.fontStyle = "Regular";
            div.style.fontSize = "1.6rem";
            div.style.lineHeight = "140%";

            button.style.cursor = "pointer";
            button.style.textDecoration = "none";

            const label = document.createElement("span")
            label.innerHTML = "ดูสินค้าใน AR"

            div.append(icon)
            div.append(label);
            button.append(div)

            const productID = button.getAttribute('data-product-id');

            getProductIDDetail(productID)
                .then((productDetail) => {
                    getARModel(productDetail.ar_id)
                        .then((arObject) => {
                            if (!isAndroid) {
                                if (arObject?.usdz_path) {
                                    button.href = arObject.usdz_path + '#allowsContentScaling=0'
                                }
                            } else {
                                button.onclick = async (e) => {
                                    if (arObject?.gltf_path) {
                                        const fallbackUrl = "https://bit.studio";
                                        // This intent URL triggers Scene Viewer on Android and falls back to
                                        // fallbackUrl if the Google app is not installed and up to date.
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
                                        const encodedURL = encodeURIComponent(arObject.gltf_path);

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
                                    }
                                }
                            }
                        })
                })
        }
    }

    makeARbutton()
}

window.addEventListener('load', () => {
    init()
})