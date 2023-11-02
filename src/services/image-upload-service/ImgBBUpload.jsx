import axios from "axios";

const ImgBBUpload = () =>
{
    const apiKey = "54e6dbac2d23b638a69557b1866e679c";

    async function upload(file)
    {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('/upload', formData, { params: { key: apiKey } });
        return response.data;
    }

    return { upload };

}

export default ImgBBUpload;