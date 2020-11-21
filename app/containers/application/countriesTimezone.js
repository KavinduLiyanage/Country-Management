import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    getTimezoneCountries,
    clearCountryData,
} from './actions';
import {
    selectGetTimezoneCountries,
    selectGetTimezoneCountriesSuccess,
    selectGetTimezoneCountriesError,
} from './selectors';
import { TIMEZONE_VALIDATION_REGEX } from '../../constants';

const CountriesTimezone = ({
    getTimezoneCountriesFunc,
    getTimezoneCountriesStatus,
    getTimezoneCountriesSuccess,
    getTimezoneCountriesError,
    getClearCountryData,
}) => {
    const [timezoneCountries, setTimezoneCountries] = useState([]);
    const [timezoneCountriesError, setTimezoneCountriesError] = useState('');

    const initialValues = {
        timezoneOne: '',
        timezoneTwo: '',
    };

    const validationSchema = Yup.object().shape({
        timezoneOne: Yup.string()
            .matches(TIMEZONE_VALIDATION_REGEX, 'Invalid Timezone (example format -08:00)')
            .required('First Timezone cannot be empty'),
        timezoneTwo: Yup.string()
            .matches(TIMEZONE_VALIDATION_REGEX, 'Invalid Timezone (example format +09:00)')
            .required('Second Timezone  cannot be empty'),
    });

    useEffect(() => {
        if (getTimezoneCountriesStatus) {
            setTimezoneCountries(getTimezoneCountriesSuccess);
            setTimezoneCountriesError('');
        }
        getClearCountryData();
    }, [getTimezoneCountriesStatus, getTimezoneCountriesSuccess]);

    useEffect(() => {
        if (getTimezoneCountriesError) {
            setTimezoneCountries('');
            setTimezoneCountriesError(getTimezoneCountriesError);
        }
        getClearCountryData();
    }, [getTimezoneCountriesError]);

    return (
        <div>
            <div className="col-md-12 main-dashboard-component">
                <h2>Get countries between two timezones</h2>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            const data = {
                                timezoneOne: values.timezoneOne,
                                timezoneTwo: values.timezoneTwo,
                            };
                            getTimezoneCountriesFunc(data);
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
                                        touched.timezoneOne && errors.timezoneOne ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="timezoneOne"
                                        id="timezoneOne"
                                        className={`form-control floating-label-input ${
                                            touched.timezoneOne && errors.timezoneOne
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="First Timezone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.timezoneOne}
                                    />
                                    <span className="floating-label left-15">
                                    First Timezone
                                    </span>
                                    {touched.timezoneOne && errors.timezoneOne && (
                                        <span className="error-label">
                                            {errors.timezoneOne}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={`floating-label-component col-md-4 ${
                                        touched.timezoneTwo && errors.timezoneTwo ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="timezoneTwo"
                                        id="timezoneTwo"
                                        className={`form-control floating-label-input ${
                                            touched.timezoneTwo && errors.timezoneTwo
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="Second Timezone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.timezoneTwo}
                                    />
                                    <span className="floating-label left-15">
                                    Second Timezone
                                    </span>
                                    {touched.timezoneTwo && errors.timezoneTwo && (
                                        <span className="error-label">
                                            {errors.timezoneTwo}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn sc-btn-primary col-md-4"
                                >
                                    Get Countries
                                </button>
                            </form>
                        )}
                    </Formik>
                    <div className="result-container">
                        {
                            timezoneCountries.length > 0 && (
                                <label>Countries are : {timezoneCountries}</label>
                            )
                        }

                    </div>
                    <div className="result-container">
                        {
                            timezoneCountriesError.length > 0 && (
                                <span className="error-country">
                                    {timezoneCountriesError}
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

CountriesTimezone.propTypes = {
    getTimezoneCountriesFunc: PropTypes.func.isRequired,
    getTimezoneCountriesStatus: PropTypes.bool,
    getTimezoneCountriesSuccess: PropTypes.array,
    getTimezoneCountriesError: PropTypes.string,
    getClearCountryData: PropTypes.func.isRequired,
};
CountriesTimezone.defaultProps = {
    getTimezoneCountriesStatus: PropTypes.bool,
    getTimezoneCountriesSuccess: [],
    getTimezoneCountriesError: null,
};
const mapStateToProps = createStructuredSelector({
    getTimezoneCountriesStatus: selectGetTimezoneCountries(),
    getTimezoneCountriesSuccess: selectGetTimezoneCountriesSuccess(),
    getTimezoneCountriesError: selectGetTimezoneCountriesError(),
});
const mapDispatchToProps = dispatch => ({
    getTimezoneCountriesFunc: data => dispatch(getTimezoneCountries(data)),
    getClearCountryData: () => dispatch(clearCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesTimezone);
