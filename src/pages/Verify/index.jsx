import React, { useState } from 'react';
import OtpBox from '../../components/OtpBox';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../App';

const Verify = () => {
    const [otp, setOtp] = useState("");

    // Handler function passed to the OtpBox component.
    // The 'value' argument is the full OTP string (e.g., "123456") 
    // returned from the OtpBox onChange prop.
    const handleOtpChange = (value) => {
        setOtp(value);
        // You would typically add logic here to enable the verification button
        // or automatically submit the form if value.length === 6
        // if (value.length === 6) { /* submitForm() */ }
    };
    const history = useNavigate();
    const context = useContext(MyContext)

    const verifyOTP = (e) => {
        e.preventDefault();
        const actionType = localStorage.getItem("actionType")
        if (actionType !== "forgot-password") {
            postData("/api/user/verifyEmail", {
                email: localStorage.getItem("userEmail"),
                otp: otp
            }).then((res) => {
                if (res?.success === true) {
                    context.openAlertBox("success", res?.message)
                    localStorage.removeItem("userEmail")
                    history("/login")
                } else {
                    context.openAlertBox("error", res?.message)
                }
            }).catch((error) => {
                console.error("Error:", error);
                context.openAlertBox("error", "Something went wrong!");
            });
        } else {
            postData("/api/user/verify-forgot-password-otp", {
                email: localStorage.getItem("userEmail"),
                otp: otp
            }).then((res) => {
                if (res?.success === true) {
                    context.openAlertBox("success", res?.message)
                    history("/forgot-password")
                } else {
                    context.openAlertBox("error", res?.message)
                }
            }).catch((error) => {
                console.error("Error:", error);
                context.openAlertBox("error", "Something went wrong!");
            });
        }

    }

    return (
        <section className='section py-4 sm:py-10 flex justify-center'>
            <div className=''>
                <div className='card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10'>
                    <div className="text-center flex items-center justify-center">
                        <img src="/shield.png" width={120} />
                    </div>
                    <h3 className='!mb-5 text-center text-[18px] text-black'>Verify OTP</h3>
                    <p className="text-center text-sm text-gray-500 !mb-4 !mt-2">
                        OTP sent to <span className="text-[#ff5252] font-bold">{localStorage.getItem("userEmail")}</span>
                    </p>
                    <OtpBox
                        length={6}
                        onChange={handleOtpChange}
                    />
                    <form onSubmit={verifyOTP}>
                        <div className="flex items-center justify-center !mt-5 px-3">
                            <Button type="submit" className="w-full btn-org btn-lg">Verify OTP</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Verify;