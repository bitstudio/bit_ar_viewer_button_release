import regeneratorRuntime from "regenerator-runtime";
import axios  from "axios";

export async function getAllProductID() {
    const url = 'https://us-central1-bit-ar-viewer.cloudfunctions.net/bit_ar_viewer_api/product_id'
    try {
        const res = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: url
        });
        return res.data;
    } catch (e) {
        console.log(e)
        return '0';
    }

}

export async function getProductIDDetail(product_id) {
    const url = 'https://us-central1-bit-ar-viewer.cloudfunctions.net/bit_ar_viewer_api/product_id/' + product_id
    try {
        const res = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: url
        });
        return res.data;
    } catch (e) {
        console.log(e)
        return '0';
    }

}


export async function getARModel(ar_id) {
    const url = 'https://us-central1-bit-ar-viewer.cloudfunctions.net/bit_ar_viewer_api/ar_id/' + ar_id
    try {
        const res = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: url
        });
        return res.data;
    } catch (e) {
        console.log(e)
        return '0';
    }

}
