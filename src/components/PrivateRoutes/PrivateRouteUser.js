import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { PetsContext } from '../../contexts/PetsContext';

export default function PrivateRouteUser({ children }) {
    const {login} = useContext(PetsContext);

    if (login === true) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}