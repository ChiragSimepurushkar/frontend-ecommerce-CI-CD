import React, { useState } from 'react';

// Renamed from OtpBox to OtpInput for clarity, based on file path.
const OtpBox = ({ length, onChange }) => {
    // Initialize OTP state with an array of empty strings
    const [otp, setOtp] = useState(new Array(length).fill(""));

    const handleChange = (element, index) => {
        const { value } = element;

        // 1. Validation: Only allow digits (0-9)
        // If the value is not a number OR the value is longer than 1 character, ignore it.
        if (isNaN(value) || value.length > 1) return;

        // 2. Update OTP state
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // 3. Notify parent component (e.g., the Verify page)
        onChange(newOtp.join(""));

        // 4. Auto-focus next input
        if (value && index < length - 1) {
            // Get the element by ID and focus it
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace for deletion and moving focus back
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    return (
        // The styling is correctly applied here using inline CSS and Tailwind
        <div 
            style={{ 
                display: "flex", 
                gap: "5px", 
                justifyContent: "center" 
            }} 
            className="otpBox"
        >
            {otp.map((data, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={data}
                    // Handle change, passing the event target and the index
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    
                    // Tailwind/CSS styles
                    className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] text-center text-[17px]"
                    style={{
                        // Ensure input is styled correctly (as defined in the CSS snippet)
                        border: '1px solid rgba(0,0,0,0.3)', 
                        borderRadius: '4px',
                        outline: 'none',
                        // Set specific styles that Tailwind might not easily cover without custom config
                    }}
                />
            ))}
        </div>
    );
};

export default OtpBox;