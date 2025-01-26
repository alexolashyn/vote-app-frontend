import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {login} from "../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (el) =>
        setFormData({...formData, [el.target.name]: el.target.value});

    if (isAuthenticated) {
        return <Navigate to='/dashboard'/>;
    }

    const onSubmit = async (el) => {
        el.preventDefault();
        await login(formData)
    };
    return (
        <section className='container'>
            <h1 className='large text-primary'>{'Sign In'}</h1>
            <p className='lead'>
                <i></i> {'Sign into your account'}
            </p>
            <form className='form' onSubmit={(el) => onSubmit(el)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(el) => onChange(el)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(el) => onChange(el)}
                        required
                        className='form-input'
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Login'
                />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </section>

    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

