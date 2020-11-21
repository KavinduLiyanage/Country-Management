import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SafeComContext from '../../contexts/scContext';
import { history } from '../../store';
import Logo from '../../assets/images/logo.png';
import {
    userLogin,
} from './actions';
import {
    selectUserLoginStatus,
    selectUserLoginError,
} from './selectors';

const SignIn = ({ login, userLoginStatus, userLoginError }) => {
    const safeComContext = useContext(SafeComContext);
    const { setSafeNotification } = safeComContext;
    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email cannot be empty')
            .email('Invalid email address'),
        password: Yup.string()
            .required('Password cannot be empty'),
    });

    useEffect(() => {
        setSafeNotification({
            type: 'error',
            message: userLoginError,
        });
    }, [userLoginError]);

    useEffect(() => {
        if (userLoginStatus) {
            history.push('/dashboard');
        }
    }, [userLoginStatus]);

    return (
        <div className="col-md-8 offset-md-2 login">
            <div className="text-center">
                <img className="logo" src={Logo} alt="" />
            </div>
            <div className="form-container">
                <h1 className="sc-title-1">Login</h1>
                <p>You must have an account to use this portal</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        const data = {
                            email: values.email,
                            password: values.password,
                        };
                        login(data);
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
                            onSubmit={e => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div
                                className={`floating-label-component ${
                                    touched.email && errors.email ? 'error' : ''
                                }`}
                            >
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className={`form-control floating-label-input ${
                                        touched.email && errors.email
                                            ? 'error-input'
                                            : ''
                                    }`}
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <span className="floating-label">
                                    Email Address
                                </span>
                                {touched.email && errors.email && (
                                    <span className="error-label">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div
                                className={`floating-label-component ${
                                    touched.password && errors.password ? 'error' : ''
                                }`}
                            >
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={`form-control floating-label-input ${
                                        touched.password && errors.password
                                            ? 'error-input'
                                            : ''
                                    }`}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <span className="floating-label">Password</span>
                                {touched.password && errors.password && (
                                    <span className="error-label">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn sc-btn-primary w-100"
                            >
                                LOG IN
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    userLoginStatus: PropTypes.bool,
    userLoginError: PropTypes.string,
};

SignIn.defaultProps = {
    userLoginStatus: false,
    userLoginError: null,
};

const mapStateToProps = createStructuredSelector({
    userLoginStatus: selectUserLoginStatus(),
    userLoginError: selectUserLoginError(),
});

const mapDispatchToProps = dispatch => ({
    login: data => dispatch(userLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
