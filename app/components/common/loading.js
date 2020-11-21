import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = props => {
    const { isLoading, inComponent, loadingText } = props;
    return isLoading ? (
        <div>
            <div
                className={`loading-overlay ${
                    inComponent ? 'in-component' : ''
                }`}
            />
            <div
                className={`loading-icon-container ${
                    inComponent ? 'in-component' : ''
                }`}
            >
                <img
                    src="./../../assets/images/loading_icon.gif"
                    className="loading-image"
                    alt="Loading..."
                />
                {loadingText && (
                    <div className="loading-text-wrapper">
                        <p className="loading-text">{loadingText}</p>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

LoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
    inComponent: PropTypes.bool,
    loadingText: PropTypes.string,
};

LoadingComponent.defaultProps = {
    isLoading: false,
    inComponent: false,
    loadingText: null,
};

export default LoadingComponent;
