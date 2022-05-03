import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { login, googleSignIn } from '../redux/features/authSlice';

const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => ({ ...state.auth })
    );

    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            dispatch(login({ formValue, navigate, toast }))
        }
    }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const googleSuccess = (resp) => {
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };

        dispatch(googleSignIn({
            result,
            navigate,
            toast 
        }));
    }

    const googleFailure = (err) => {
        toast.error(err);
    }

    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px"
            }}
        >
            <MDBCard alignment="center">
                <MDBIcon 
                    fas icon="user-circle" 
                    className="fa-2x" 
                />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation 
                        onSubmit={handleSubmit}
                        noValidate
                        className="row g-3"
                    >
                        <div className="col-md-12">
                            <MDBInput 
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required 
                                invalid 
                                validation="Please provide your email!"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput 
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required 
                                invalid 
                                validation="Please provide your password!"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn 
                                style={{ width: "100%" }} 
                                className="mt-2"
                            >
                                {loading && (
                                    <MDBSpinner 
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin 
                        clientId="820627971034-gjqt8f1ramui2hhcjn3jt0v3epc565oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: "100%" }}
                                color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon 
                                    className="me-2"
                                    fab
                                    icon="google"
                                />
                                Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                       <p>Don't have an account? Sign Up</p> 
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
}

export default Login;
