import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    getCountryDistance,
    clearCountryData,
} from './actions';
import {
    selectGetCountryDistance,
    selectGetCountryDistanceSuccess,
    selectGetCountryDistanceError,
} from './selectors';

const CountryDistance = ({
    getCountryDistanceFunc,
    getCountryDistanceStatus,
    getCountryDistanceSuccess,
    getCountryDistanceError,
    getClearCountryData,
}) => {
    const [distanceKm, setDistanceKm] = useState(0);
    const [distanceCountryError, setDistanceCountryError] = useState('');

    const initialValues = {
        countryOne: '',
        countryTwo: '',
    };

    const validationSchema = Yup.object().shape({
        countryOne: Yup.string()
            .length(3, 'Must be a three characters')
            .required('Country One cannot be empty'),
        countryTwo: Yup.string()
            .length(3, 'Must be a three characters')
            .required('Country Two cannot be empty'),
    });

    useEffect(() => {
        if (getCountryDistanceStatus) {
            setDistanceCountryError('');
            setDistanceKm(getCountryDistanceSuccess);
        }
        getClearCountryData();
    }, [getCountryDistanceStatus, getCountryDistanceSuccess]);

    useEffect(() => {
        if (getCountryDistanceError) {
            setDistanceKm('');
            setDistanceCountryError(getCountryDistanceError);
        }
        getClearCountryData();
    }, [getCountryDistanceError]);

    return (
        <div>
            <div className="col-md-12 main-dashboard-component">
                <h2>Country Distance</h2>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            const data = {
                                countryOne: values.countryOne.toUpperCase(),
                                countryTwo: values.countryTwo.toUpperCase(),
                            };
                            getCountryDistanceFunc(data);
                        }}
                    >
                        {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            touched,
                        }) => (
                            <form
                                className="row"
                                onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <div
                                    className={`floating-label-component col-md-4 ${
                                        touched.countryOne && errors.countryOne ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="countryOne"
                                        id="countryOne"
                                        className={`form-control floating-label-input ${
                                            touched.countryOne && errors.countryOne
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="Country One"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.countryOne}
                                    />
                                    <span className="floating-label left-15">
                                    Country One
                                    </span>
                                    {touched.countryOne && errors.countryOne && (
                                        <span className="error-label">
                                            {errors.countryOne}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={`floating-label-component col-md-4 ${
                                        touched.countryTwo && errors.countryTwo ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="countryTwo"
                                        id="countryTwo"
                                        className={`form-control floating-label-input ${
                                            touched.countryTwo && errors.countryTwo
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="Country Two"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.countryTwo}
                                    />
                                    <span className="floating-label left-15">
                                    Country Two
                                    </span>
                                    {touched.countryTwo && errors.countryTwo && (
                                        <span className="error-label">
                                            {errors.countryTwo}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn sc-btn-primary col-md-4"
                                >
                                    Get Distance
                                </button>
                            </form>
                        )}
                    </Formik>
                    <div className="result-container">
                        {
                            distanceKm > 0 && (
                                <label>Distance is : {distanceKm.toFixed(2)} km</label>
                            )
                        }

                    </div>
                    <div className="result-container">
                        {
                            distanceCountryError.length > 0 && (
                                <span className="error-country">
                                    {distanceCountryError}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <Link className="back-btn" to="/dashboard" onClick={() => setDistanceKm(0)}><span className="icon-arrow-left" />Back To Dashboard</Link>
        </div>
    );
};

CountryDistance.propTypes = {
    getCountryDistanceFunc: PropTypes.func.isRequired,
    getCountryDistanceStatus: PropTypes.bool,
    getCountryDistanceSuccess: PropTypes.number,
    getCountryDistanceError: PropTypes.string,
    getClearCountryData: PropTypes.func.isRequired,
};

CountryDistance.defaultProps = {
    getCountryDistanceStatus: PropTypes.bool,
    getCountryDistanceSuccess: null,
    getCountryDistanceError: null,
};

const mapStateToProps = createStructuredSelector({
    getCountryDistanceStatus: selectGetCountryDistance(),
    getCountryDistanceSuccess: selectGetCountryDistanceSuccess(),
    getCountryDistanceError: selectGetCountryDistanceError(),
});

const mapDispatchToProps = dispatch => ({
    getCountryDistanceFunc: data => dispatch(getCountryDistance(data)),
    getClearCountryData: () => dispatch(clearCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryDistance);
