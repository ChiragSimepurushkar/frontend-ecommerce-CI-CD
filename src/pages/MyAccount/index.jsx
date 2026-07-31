import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
const MyAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setuserId] = useState("");
    const [isChangedPasswordFormShow, setIsChangedPasswordFormShow] = useState(false);
    const [phone, setPhone] = useState('');

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const context = useContext(MyContext);
    const history = useNavigate();
    const onChangeProfileInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangePasswordInput = (e) => {
        const { name, value } = e.target;
        setChangePassword(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const valideValue =
        formFields.name.trim() !== "" &&
        String(formFields.mobile || "").trim() !== "";


    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        if (formFields.name === "") {
            context.openAlertBox("error", "Please Enter Full Name")
            return false;
        }
        if (formFields.email === "") {
            context.openAlertBox("error", "Please Enter Email ID")
            return false;
        }
        if (formFields.mobile === "") {
            context.openAlertBox("error", "Please Enter Mobile Number")
            return false;
        }



        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            console.log(res)
            if (res?.success !== false) {
                setIsLoading(false);
                context.setuserData(prev => ({
                    ...prev,
                    ...formFields
                }));
                context.openAlertBox("success", res?.data?.message);
            } else {
                context.openAlertBox("error", res?.data?.message);
                setIsLoading(false);
            }
        })
    }

    const valideValue2 = Object.values(changePassword).every(el => el);

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();

        setIsLoading2(true);
        if (context?.userData?.signUpWithGoogle === false) {
            if (changePassword.oldPassword === "") {
                context.openAlertBox("error", "Please Enter Old Password")
                setIsLoading2(false);

                return false;
            }
        }
        if (changePassword.newPassword === "") {
            context.openAlertBox("error", "Please Enter New Password")
            setIsLoading2(false);
            return false;
        }
        if (changePassword.confirmPassword === "") {
            context.openAlertBox("error", "Please Enter Confirm Password")
            setIsLoading2(false);
            return false;
        }
        if (changePassword.confirmPassword !== changePassword.newPassword) {
            context.openAlertBox("error", "new Password & Confirm Password are mismatched")
            setIsLoading2(false);
            return false;
        }

        postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {
            if (res?.success !== false) {
                setIsLoading2(false);
                context.openAlertBox("success", res?.message);
                setIsChangedPasswordFormShow(false);

                // optional: reset password form
                setChangePassword({
                    email: context.userData.email,
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                context.openAlertBox("error", res?.message);
                setIsLoading2(false);
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");

        if (!token) {
            history("/");
        }

    }, [context?.isLogin, history])


    useEffect(() => {
        if (context?.userData?._id) {
            setuserId(context.userData._id);
            setFormFields({
                name: context.userData.name || "",
                email: context.userData.email || "",
                mobile: String(context.userData.mobile || ""),
            });
            setPhone(String(context.userData.mobile || ""));
            setChangePassword({
                email: context.userData.email || "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
    }, [context?.userData]);


    return (
        <section className='py-3 lg:py-10 w-full'>
            <div className="container flex flex-col lg:flex-row gap-5">
                <div className="col1  w-full lg:w-[20%]">
                    <AccountSidebar />
                </div>
                <div className="col2  w-full lg:w-[50%]">
                    <div className="card mb-5 bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">My Profile</h2>
                            <Button className='!ml-auto' onClick={() => setIsChangedPasswordFormShow(!isChangedPasswordFormShow)}>Change Password</Button>
                        </div>
                        <hr className='text-[rgba(0,0,0,0.2)]' />
                        <form className='!mt-8 ' onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="col">
                                    <TextField
                                        name="name"
                                        value={formFields.name}
                                        disabled={isLoading}
                                        onChange={onChangeProfileInput}
                                        size="small" className='!w-full'
                                        label="Full Name" variant="outlined" />
                                </div>
                                <div className="col">
                                    <TextField name="email"
                                        value={formFields.email}
                                        type="email"
                                        disabled={true}
                                        onChange={onChangeProfileInput} size="small" className='!w-full'
                                        label="Email" variant="outlined" />
                                </div>
                                <div className="col">
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={phone}
                                        disabled={isLoading}
                                        onChange={(phone) => {
                                            const phoneStr = String(phone || "");
                                            setPhone(phoneStr);
                                            setFormFields(prev => ({
                                                ...prev,
                                                mobile: phoneStr
                                            }));
                                        }}
                                    />


                                </div>
                            </div>
                            {/* <div className="flex !mt-4 items-center gap-5">
                                
                            </div> */}
                            <br></br>

                            <div className="flex items-center gap-4">
                                <Button disabled={!valideValue || isLoading} type="submit"
                                    className="btn-org btn-sm w-[150px]">
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" />
                                            :
                                            'Update Profile'
                                    }
                                </Button>

                            </div>
                        </form>
                    </div>


                    <Collapse in={isChangedPasswordFormShow}>
                        <div className="card bg-white p-5 shadow-md rounded-md !mt-5">
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Change Password</h2>
                            </div>
                            <hr className='text-[rgba(0,0,0,0.2)]' />
                            <form className='!mt-8 '
                                onSubmit={handleSubmitChangePassword}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {
                                        context?.userData?.signUpWithGoogle === false &&
                                        <div className="col">
                                            <TextField
                                                name="oldPassword"
                                                value={changePassword.oldPassword}
                                                disabled={isLoading2}
                                                onChange={onChangePasswordInput}
                                                size="small" className='!w-full'
                                                label="Old Password" variant="outlined" />
                                        </div>
                                    }
                                    <div className="col">
                                        <TextField name="newPassword"
                                            value={changePassword.newPassword}
                                            onChange={onChangePasswordInput} size="small" className='!w-full'
                                            label="New Password" variant="outlined" />
                                    </div>
                                    <div className="col">
                                        <TextField name="confirmPassword"
                                            value={changePassword.confirmPassword}
                                            onChange={onChangePasswordInput} size="small" className='!w-full'
                                            label="Confirm Password" variant="outlined" />
                                    </div>
                                </div>
                                <br></br>
                                <div className="flex items-center gap-4">
                                    <Button
                                        // disabled={!valideValue2}
                                        type="submit"
                                        className="btn-org btn-sm w-[200px]">
                                        {
                                            isLoading2 === true ? <CircularProgress color="inherit" />
                                                :
                                                'Change Password'
                                        }
                                    </Button>

                                </div>
                            </form>
                        </div>
                    </Collapse>

                </div>
            </div>
        </section>
    );
}

export default MyAccount;