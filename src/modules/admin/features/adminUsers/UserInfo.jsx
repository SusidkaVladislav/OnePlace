import React from 'react';
import { useParams, Route } from 'react-router-dom'

const UserInfo = () => {
    const params = useParams();
    const prodId = params.id;

    return (
        <h1>{prodId}</h1>
    )
}

export default UserInfo;