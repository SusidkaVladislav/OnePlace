import React from "react";
import ImgBBUpload from "../../../../../services/image-upload-service/ImgBBUpload";


const ItemExit = () =>
{
    const { upload } = ImgBBUpload();

    const onInputHandler = async (event) =>
    {
        const rest = await upload(event.target.files[0])
        console.log(rest);
    }

    return (
        <input type="file" onInput={async (event) =>
        {
            await onInputHandler(event);
        }} />
    );
}

export default ItemExit;