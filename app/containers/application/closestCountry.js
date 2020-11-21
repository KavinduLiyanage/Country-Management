import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    getClosestCountry,
    clearCountryData,
} from './actions';
import {
    selectGetClosestCountry,
    selectGetClosestCountrySuccess,
    selectGetClosestCountryError,
} from './selectors';

const ClosestCountry = ({
    getClosestCountryFunc,
    getClosestCountryStatus,
    getClosestCountrySuccess,
    getClosestCountryError,
    getClearCountryData,
}) => {
    const [closestCountry, setClosestCountry] = useState('');
    const [closestCountryError, setClosestCountryError] = useState('');

    const initialValues = {
        countryName: '',
    };

    const validationSchema = Yup.object().shape({
        countryName: Yup.string()
            .length(3, 'Must be a three characters')
            .required('Country Name cannot be empty'),
    });

    useEffect(() => {
        if (getClosestCountryStatus) {
            setClosestCountryError('');
            setClosestCountry(getClosestCountrySuccess);
        }
        getClearCountryData();
    }, [getClosestCountryStatus, getClosestCountrySuccess]);

    useEffect(() => {
        if (getClosestCountryError) {
            setClosestCountry('');
            setClosestCountryError(getClosestCountryError);
        }
        getClearCountryData();
    }, [getClosestCountryError]);

    return (
        <div>
            <div className="col-md-12 main-dashboard-component">
                <h2>Closest Country</h2>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            const data = {
                                countryName: values.countryName.toUpperCase(),
                            };
                            getClosestCountryFunc(data);
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
                                    className={`floating-label-component col-md-8 ${
                                        touched.countryName && errors.countryName ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="countryName"
                                        id="countryName"
                                        className={`form-control floating-label-input ${
                                            touched.countryName && errors.countryName
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="Country One"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.countryName}
                                    />
                                    <span className="floating-label left-15">
                                        Country Name
                                    </span>
                                    {touched.countryName && errors.countryName && (
                                        <span className="error-label">
                                            {errors.countryName}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn sc-btn-primary col-md-4"
                                >
                                    Get Closest Country
                                </button>
                            </form>
                        )}
                    </Formik>
                    <div className="result-container">
                        {
                            closestCountry && (
                                <label>Closest country is : {closestCountry}</label>
                            )
                        }

                    </div>
                    <div className="result-container">
                        {
                            closestCountryError && (
                                <span className="error-country">
                                    {closestCountryError}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <Link className="back-btn" to="/dashboard"><span className="icon-arrow-left" />Back To Dashboard</Link>
        </div>
    );
};

ClosestCountry.propTypes = {
    getClosestCountryFunc: PropTypes.func.isRequired,
    getClosestCountryStatus: PropTypes.bool,
    getClosestCountrySuccess: PropTypes.string,
    getClosestCountryError: PropTypes.string,
    getClearCountryData: PropTypes.func.isRequired,
};

ClosestCountry.defaultProps = {
    getClosestCountryStatus: PropTypes.bool,
    getClosestCountrySuccess: null,
    getClosestCountryError: null,
};

const mapStateToProps = createStructuredSelector({
    getClosestCountryStatus: selectGetClosestCountry(),
    getClosestCountrySuccess: selectGetClosestCountrySuccess(),
    getClosestCountryError: selectGetClosestCountryError(),
});

const mapDispatchToProps = dispatch => ({
    getClosestCountryFunc: data => dispatch(getClosestCountry(data)),
    getClearCountryData: () => dispatch(clearCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClosestCountry);
