import React from 'react';
import { useParams, Route } from 'react-router-dom'

const UserInfo = () => {
    const params = useParams();
    const prodId = params.id;

    alert (prodId)

    return (
        <p>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</p>
    )
}

export default UserInfo;