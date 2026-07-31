import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi, postData } from '../../utils/api';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });
    const context = useContext(MyContext)
    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const forgotPassword = () => {
        const actionType = localStorage.getItem("actionType")

        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email")
            return false;
        } else {
            context.openAlertBox("Success", `OTP Send to ${formFields.email}`)
            localStorage.setItem("userEmail", formFields.email)
            localStorage.setItem("actionType", 'forgot-password')

            postData("/api/user/forgot-password", {
                email: formFields.email,
            }).then((res) => {
                if (res?.success === true) {
                    context.openAlertBox("success", res?.message)
                    // localStorage.setItem("userEmail", res?.email);
                    history("/verify")
                } else {
                    context.openAlertBox("error", res?.message)
                    localStorage.removeItem("actionType");
                    localStorage.removeItem("userEmail");
                }
            }).catch((error) => {
                console.error("Error:", error);
                context.openAlertBox("error", "Something went wrong!");
            });
        }
    }


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }
    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email")
            return false;
        }
        if (formFields.password === "") {
            context.openAlertBox("error", "Please Enter Password")
            return false;
        }

        postData("/api/user/login", formFields, { withCredentials: true }).then((res) => {
            console.log(res)
            if (res?.success === true) {
                setIsLoading(false);
                context.openAlertBox("success", res?.message);
                setFormFields({
                    email: "",
                    password: ""
                })
                localStorage.setItem("accesstoken", res?.data?.accesstoken);
                localStorage.setItem("refreshToken", res?.data.refreshToken)
                context.setIsLogin(true);

                context.checkUserSession();
                history("/");

            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        })
    }

    const authWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                const fields = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    avatar: user.providerData[0].photoURL,
                    mobile: user.providerData[0].phoneNumber,
                    role: "USER"
                };

                postData("/api/user/authWithGoogle", fields).then((res) => {
                    if (res?.success === true) {
                        setIsLoading(false);
                        context.openAlertBox("success", res?.message);
                        localStorage.setItem("userEmail", fields.email);
                        localStorage.setItem("accesstoken", res?.data?.accesstoken);
                        localStorage.setItem("refreshToken", res?.data.refreshToken)
                        context.setIsLogin(true);

                        context.checkUserSession();
                        history("/");

                    } else {
                        context.openAlertBox("error", res?.message);
                        setIsLoading(false);
                    }
                })
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <section className='section py-4 sm:py-10 flex justify-center'>
            <div>
                <div className='card shadow-md w-full sm:w-[400px] m-auto rounded-md 
                bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Login to your account</h3>
                    <form className='w-full !mt-5' onSubmit={handleSubmit}>
                        <div className="form-group w-full !mb-5">
                            <TextField
                                name="email"
                                value={formFields.email}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                type="email " id="email" label="Email ID" variant="outlined" className='w-full' />
                        </div>
                        <div className="form-group w-full !mb-5 relative">
                            <TextField
                                name="password"
                                value={formFields.password}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                type={isShowPassword === true ? 'text' : 'password'}
                                id="password" label="Password" variant="outlined" className='w-full' />
                            <Button onClick={() => setIsShowPassword(!isShowPassword)}
                                className='!absolute !rounded-full !text-[#000] top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px]'>
                                {
                                    isShowPassword === true ? <FaEye className='text-[20px] opacity-75' /> : <IoIosEyeOff className='!text-[20px] opacity-75' />
                                }
                            </Button>
                        </div>
                        <a className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Forgot Password?</a>
                        <div className="flex items-center w-full !mt-3 !mb-3">
                            <Button disabled={!valideValue || isLoading} type="submit"
                                className="btn-org btn-lg w-full flex gap-3">
                                {
                                    isLoading === true ? <CircularProgress color="inherit" />
                                        :
                                        'Login'
                                }
                            </Button>
                        </div>
                        <p className="text-center">Not Registered?
                            <Link className="text-[#ff5252] link text-[14px] font-[600]" to="/register">
                                Sign Up</Link></p>
                        <p className="text-center font-[500]">Or continue with social account</p>
                        <Button onClick={authWithGoogle} className='flex gap-3 w-full btn-lg !text-[#000] !bg-[#f1f1f1]'>
                            <FcGoogle className='text-[20px]' />Login with Google</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;