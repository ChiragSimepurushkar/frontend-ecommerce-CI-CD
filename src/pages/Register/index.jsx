import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { fetchDataFromApi, postData } from '../../utils/api';
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    })

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

        if (formFields.name === "") {
            context.openAlertBox("error", "Please Enter your Full Name")
            return false;
        }
        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email")
            return false;
        }
        if (formFields.password === "") {
            context.openAlertBox("error", "Please Enter Password")
            return false;
        }

        postData("/api/user/register", formFields).then((res) => {
            if (res?.success === true) {
                setIsLoading(false);
                context.openAlertBox("success", res?.message);
                localStorage.setItem("userEmail", formFields.email)
                setFormFields({
                    name: "",
                    email: "",
                    password: ""
                })
                history("/verify")
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
                        fetchDataFromApi(`/api/user/user-details`).then((userRes) => {
                            if (userRes?.data) {
                                context.setuserData(userRes.data);
                            }
                            history("/");
                        });
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
        <section className='section py-4 sm:py-10  flex justify-center'>
            <div>
                <div className='card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Register with new account</h3>
                    <form className='w-full !mt-5'
                        onSubmit={handleSubmit}>
                        <div className="form-group w-full !mb-5">
                            <TextField type="text "
                                name="name"
                                value={formFields.name}
                                disabled={isLoading}
                                id="name"
                                label="Full Name" variant="outlined" className='w-full'
                                onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full !mb-5">
                            <TextField name="email" type="email "
                                id="email" label="Email ID"
                                value={formFields.email}
                                disabled={isLoading}
                                variant="outlined" className='w-full'
                                onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full !mb-5 relative">
                            <TextField
                                type={isShowPassword === true ? 'text' : 'password'}
                                id="password"
                                name="password"
                                disabled={isLoading}
                                value={formFields.password}
                                label="Password" variant="outlined" className='w-full'
                                onChange={onChangeInput} />
                            <Button onClick={() => setIsShowPassword(!isShowPassword)}
                                className='!absolute !rounded-full !text-[#000] top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px]'>
                                {
                                    isShowPassword === true ? <FaEye className='text-[20px] opacity-75' /> : <IoIosEyeOff className='!text-[20px] opacity-75' />
                                }
                            </Button>
                        </div>

                        <div className="flex items-center w-full !mt-3 !mb-3">
                            <Button disabled={!valideValue || isLoading} type="submit"
                                className="btn-org btn-lg w-full flex gap-3">
                                {
                                    isLoading === true ? <CircularProgress color="inherit" />
                                        :
                                        'Register'
                                }
                            </Button>
                        </div>
                        <p className="text-center">Already have an account?
                            <Link className="text-[#ff5252] link text-[14px] font-[600]" to="/login">
                                Login</Link></p>
                        <p className="text-center font-[500]">Or continue with social account</p>
                        <Button
                            onClick={authWithGoogle} className='flex gap-3 w-full btn-lg !text-[#000] !bg-[#f1f1f1]'>
                            <FcGoogle className='text-[20px]' />Sign Up with Google</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;