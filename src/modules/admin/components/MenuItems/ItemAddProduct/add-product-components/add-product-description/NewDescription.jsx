import React, { useState } from 'react';
import './NewDescriptionStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharachteristic, setCharachteristicsValid } from '../../../../../features/adminProduct/adminProductSlice';

const NewDescription = (props) =>
{
    const dispatch = useDispatch();

    const {
        charachteristicInfo,
        deleteDescription
    } = props;

    const { charachteristicsValid } = useSelector(state => state.adminProducts);

    const [name, setName] = useState(charachteristicInfo.name ? charachteristicInfo.name : '')
    const [about, setAbout] = useState(charachteristicInfo.about ? charachteristicInfo.about : '')


    return (
        <div className='new-description-container'>
            <div>
                <input
                    disabled={charachteristicInfo.update? true: false}
                    type="text"
                    value={charachteristicInfo.name}
                    onChange={(event) =>
                    {
                        setName(event.target.value)

                        if (!charachteristicsValid)
                            dispatch(setCharachteristicsValid(true))

                        dispatch(updateCharachteristic(
                            {
                                blockId: charachteristicInfo.blockId,
                                name: event.target.value,
                                about: about
                            }
                        ))
                    }}
                    placeholder='введіть назву'
                    style={{
                        border: (name.length < 1 && !charachteristicsValid) ? '1px solid red' : 'none'
                    }} />
                <button onClick={() => { deleteDescription(charachteristicInfo.blockId) }}></button>
            </div>

            <input
                type='text'
                className='new-description-about-input'
                placeholder='введіть значення'
                value={charachteristicInfo.about}
                onChange={(event) =>
                {
                    setAbout(event.target.value)

                    if (!charachteristicsValid)
                        dispatch(setCharachteristicsValid(true))

                    dispatch(updateCharachteristic(
                        {
                            blockId: charachteristicInfo.blockId,
                            name: name,
                            about: event.target.value,
                        }))
                }}
                style={{
                    border: (about.length < 1 && !charachteristicsValid) ? '1px solid red' : 'none'
                }}
            />
        </div>
    )
}

export default NewDescription;