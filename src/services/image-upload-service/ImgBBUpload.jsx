import axios from "axios";

const ImgBBUpload = () =>
{
    const apiKey = "54e6dbac2d23b638a69557b1866e679c";


    async function upload(file)
    {
        const formData = new FormData();
        formData.append('image', file);

        try
        {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, { params: { key: apiKey } });
            return response.data;
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return { upload };

}

export default ImgBBUpload;