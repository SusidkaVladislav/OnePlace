import React, { useRef } from 'react';
import './CommonPictureStyles.css';

const CommonPicture = (props) =>
{
    const {
        keyIndex,
        imageHintId,
        srcPath,
        pictureId,
        onRemove,
        onSetMain,
    } = props;

    const divPicture = useRef(null);
    const closeBtn = useRef(null);
    const picture = useRef(null);

    return (
        <div ref={divPicture} key={keyIndex} className='common-picture-add-product-container'
            onMouseOver={() =>
            {
                picture.current.style.opacity = 0.5;
                closeBtn.current.style.opacity = 1;
            }}
            onMouseLeave={() =>
            {
                picture.current.style.opacity = 1;
                closeBtn.current.style.opacity = 0;
            }}
        >

            <img 
                ref={picture}
                id='common-picture-add-product'
                className='common-picture-add-product'
                src={srcPath}
                alt=""
                onMouseOver={(event) =>
                {
                    event.target.style.opacity = 0.5;
                    divPicture.current.style.backgroundImage = "none";
                    closeBtn.current.style.opacity = 1;
                }}
                onMouseLeave={(event) =>
                {
                    event.target.style.opacity = 1;
                    divPicture.current.style.opacity = 1;
                    closeBtn.current.style.opacity = 0;
                }}
                onClick={() =>
                {
                    onSetMain(pictureId, srcPath, imageHintId)
                }}
            />

            <button ref={closeBtn}
                onClick={() =>
                {
                    onRemove(pictureId, imageHintId);
                }}
            ></button>
        </div>
    )
}

export default CommonPicture