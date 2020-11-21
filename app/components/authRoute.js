import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import util from '../helpers/util';

export const BaseAuth = ({ children }) => (
    util.isUserLogged() ? <>{ children }</> : <Redirect to="/login" />
);

BaseAuth.propTypes = {
    children: PropTypes.array.isRequired,
};

export default { BaseAuth };
