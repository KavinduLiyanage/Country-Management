import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import SafeComContext from './contexts/scContext';
import Header from './components/common/header';
import Footer from './components/common/footer';

const Layout = ({ children }) => {
    const safeComContext = useContext(SafeComContext);
    const { safeNotification } = safeComContext;

    useEffect(() => {
        const { type, message } = safeNotification;

        if (message) {
            switch (type) {
                case 'info':
                    NotificationManager.info(message);
                    break;
                case 'success':
                    NotificationManager.success(message);
                    break;
                case 'warning':
                    NotificationManager.warning(message);
                    break;
                case 'error':
                    NotificationManager.error(message);
                    break;
                default:
                    NotificationManager.info(message);
            }
        }
    }, [safeNotification]);

    return (
        <div>
            <Header />
            <div
                className="container-fluid landing-customer-container"
                id="main-content-block"
            >
                {children}
            </div>
            <Footer />
            <NotificationContainer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Layout;
