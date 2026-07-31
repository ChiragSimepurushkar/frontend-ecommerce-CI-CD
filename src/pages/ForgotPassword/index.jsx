import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';
const ForgotPassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: ''
    });

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
        if (formFields.newPassword === "") {
            context.openAlertBox("error", "Please Enter new Password")
            setIsLoading(false);
            return false;
        }
        if (formFields.confirmPassword === "") {
            context.openAlertBox("error", "Please Enter Confirm Password")
            setIsLoading(false);
            return false;
        }
        if (formFields.confirmPassword !== formFields.newPassword) {
            context.openAlertBox("error", "Confirm Password & New Password Do not Match")
            setIsLoading(false);
            return false;
        }
        postData('/api/user/reset-password', formFields)
            .then((res) => {
                console.log(res);
                if (res?.success === true) {
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("actionType");
                    context.openAlertBox("success", res?.message);
                    setIsLoading(false);
                    history("/login")
                } else {
                    context.openAlertBox("error", res?.message);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Password reset failed:", error);
                setIsLoading(false);
            });
    }

    const context = useContext(MyContext)
    const history = useNavigate();
    return (
        <section className='section py-5 lg:py-10 flex justify-center'>
            <div>
                <div className='card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10'>
                    <h3 className='text-center text-[18px] text-black'>Forgot Password</h3>
                    <form className='w-full !mt-5' onSubmit={handleSubmit}>
                        <div className="form-group w-full !mb-5 relative">
                            <TextField
                                name="newPassword"
                                value={formFields.newPassword}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                type={isShowPassword === true ? 'text' : 'password'}
                                id="password" label="New Password" variant="outlined" className='w-full' />
                            <Button onClick={() => setIsShowPassword(!isShowPassword)}
                                className='!absolute !rounded-full !text-[#000] top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px]'>
                                {
                                    isShowPassword === true ? <FaEye className='text-[20px] opacity-75' /> : <IoIosEyeOff className='!text-[20px] opacity-75' />
                                }
                            </Button>
                        </div>
                        <div className="form-group w-full !mb-5 relative">
                            <TextField
                                name="confirmPassword"
                                value={formFields.confirmPassword}
                                disabled={isLoading}
                                onChange={onChangeInput}
                                type={isShowPassword2 === true ? 'text' : 'password'}
                                id="confirm_password" label="Confirm Password" variant="outlined" className='w-full' />
                            <Button onClick={() => setIsShowPassword2(!isShowPassword2)}
                                className='!absolute !rounded-full !text-[#000] top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px]'>
                                {
                                    isShowPassword2 === true ? <FaEye className='text-[20px] opacity-75' /> : <IoIosEyeOff className='!text-[20px] opacity-75' />
                                }
                            </Button>
                        </div>

                        <div className="flex items-center w-full !mt-3 !mb-3">
                            <Button disabled={!valideValue || isLoading} type="submit"
                                className="btn-org btn-lg w-full flex gap-3">
                                {
                                    isLoading === true ? <CircularProgress color="inherit" />
                                        :
                                        'Change Password'
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;