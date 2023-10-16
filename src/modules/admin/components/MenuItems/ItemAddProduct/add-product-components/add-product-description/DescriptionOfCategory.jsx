import React, { useState } from 'react';
import './DescriptionOfCategoryStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import
{
    updateCharacteristicFromCategory,
    setCharachteristicsValid
} from '../../../../../features/adminProduct/adminProductSlice';

const DescriptionOfCategory = (props) =>
{
    const dispatch = useDispatch();
    const {
        descriptionInfo,
        deleteDescription,
    } = props;

    const { charachteristicsValid } = useSelector(state => state.adminProducts);

    const [about, setAbout] = useState(descriptionInfo.about ? descriptionInfo.about : '')
    console.log(descriptionInfo.id)
    return (
        <div className='description-of-category-container' >
            <div>
                <label>{descriptionInfo.name}</label>
                <button onClick={() => { deleteDescription(descriptionInfo.id) }}></button>
            </div>

            <input
                type='text'
                value={about}
                onChange={(event) =>
                {
                    setAbout(event.target.value);
                    if (!charachteristicsValid)
                        dispatch(setCharachteristicsValid(true));

                    dispatch(updateCharacteristicFromCategory({
                        id: descriptionInfo.id,
                        name: descriptionInfo.name,
                        about: event.target.value
                    }));
                }}
                placeholder='введіть значення'
                style={{
                    border: (about.length < 1 && !charachteristicsValid) ? '1px solid red' : 'none'
                }}
            />
        </div>
    )
}

export default DescriptionOfCategory;