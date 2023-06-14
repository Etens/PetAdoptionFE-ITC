import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { PetsContext } from '../../contexts/PetsContext';

export default function PrivateRouteAdmin({ children }) {
    const { login } = useContext(PetsContext);
    const { role } = useContext(PetsContext);

    if (login === true && role === 'admin') {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}
