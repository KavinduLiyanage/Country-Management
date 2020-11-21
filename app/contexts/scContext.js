import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ScContext = createContext();

export const ScProvider = ({ children }) => {
    const [safeNotification, setSafeNotification] = useState({
        type: '',
        message: '',
    });

    const values = {
        safeNotification,
        setSafeNotification: data => {
            setSafeNotification(data);
        },
    };

    return <ScContext.Provider value={values}>{children}</ScContext.Provider>;
};

ScProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export const ScConsumer = ScContext.Consumer;

export default ScContext;
