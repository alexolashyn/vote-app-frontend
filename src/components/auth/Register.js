import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const Register = ({isAuthenticated, register}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const {email, password, passwordConfirmation} = formData;

    const onChange = (el) =>
        setFormData({...formData, [el.target.name]: el.target.value});

    if(isAuthenticated) {
        return <Navigate to='/dashboard'/>;
    }

    const onSubmit = async (el) => {
        el.preventDefault();
        await register(formData);
    };
    return (
        <section className='container'>
            <h1 className='large text-primary'>Register</h1>
            <p className='lead'>
                <i></i> Create Your Account
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
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='8'
                        value={password}
                        onChange={(el) => onChange(el)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        minLength='8'
                        value={passwordConfirmation}
                        onChange={(el) => onChange(el)}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Register'/>
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Login</Link>
            </p>
        </section>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { register })(Register);