import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CountriesSearch = () => {

    const initialValues = {
        searchTerm: '',
    };

    const validationSchema = Yup.object().shape({
        searchTerm: Yup.string()
            .max(3, 'Must be less than 3 characters')
            .required('Search Term cannot be empty'),
    });

    return (
        <div>
            <div className="col-md-12 main-dashboard-component">
                <h2>Search Countries</h2>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
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
                                        touched.searchTerm && errors.searchTerm ? 'error' : ''
                                    }`}
                                >
                                    <input
                                        type="text"
                                        name="searchTerm"
                                        id="searchTerm"
                                        className={`form-control floating-label-input ${
                                            touched.searchTerm && errors.searchTerm
                                                ? 'error-input'
                                                : ''
                                        }`}
                                        placeholder="Search Term"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.searchTerm}
                                    />
                                    <span className="floating-label left-15">
                                        Search Term
                                    </span>
                                    {touched.searchTerm && errors.searchTerm && (
                                        <span className="error-label">
                                            {errors.searchTerm}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn sc-btn-primary col-md-4"
                                >
                                    Search Countries
                                </button>
                            </form>
                        )}
                    </Formik>
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

SearchCountry.defaultProps = {
    getSearchCountryStatus: PropTypes.bool,
    getSearchCountrySuccess: null,
    getSearchCountryError: null,
};

const mapStateToProps = createStructuredSelector({
    getSearchCountryStatus: selectGetSearchCountry(),
    getSearchCountrySuccess: selectGetSearchCountrySuccess(),
    getSearchCountryError: selectGetSearchCountryError(),
});

const mapDispatchToProps = dispatch => ({
    getSearchCountryFunc: data => dispatch(getSearchCountry(data)),
    getClearCountryData: () => dispatch(clearCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesSearch);

