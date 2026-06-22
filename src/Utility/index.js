import axios from "axios";

export const uploadImg = async (img) => {
    const formData = new FormData();
    formData.append("image", img);

    const img_API_URL_Key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_API_URL_Key
    }`;

    // Upload image
    const imgRes = await axios.post(img_API_URL_Key, formData);
    const photoURL = imgRes.data.data.url;
    return photoURL;
};
