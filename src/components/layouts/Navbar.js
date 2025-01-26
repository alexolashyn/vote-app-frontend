import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({isAuthenticated, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href='/'>
                    Logout
                </a>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code'></i>
                    Vote App
                </Link>
            </h1>
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(Navbar);