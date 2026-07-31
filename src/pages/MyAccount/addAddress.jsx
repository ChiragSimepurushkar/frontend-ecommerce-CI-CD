import React, { useState } from "react";
import { useContext, useEffect } from 'react'
import Radio from '@mui/material/Radio';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { LuBaggageClaim } from 'react-icons/lu';

import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from "../../App";
import { editData, fetchDataFromApi, postData } from "../../utils/api";

const AddAddress = () => {
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false);
    const [addressType, setAddressType] = useState('')
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState([])

    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }, [context?.userData]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }


    const handleChangeAddressType = (event) => {
        setAddressType(event.target.value);
        setFormFields(() => ({
            ...formFields,
            addressType: event.target.value,
        }));
    };

    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        userId: '',
        landmark: '',
        addressType: ''
    });
    const [addressId, setAddressId] = useState('');

    useEffect(() => {

        if (context?.addressMode === "edit") {
            fetchAddress(context?.addressId)
        }

    }, [context?.addressMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userIdFromContext = context?.userData?._id;
        setIsLoading(true);

        if (!userIdFromContext) {
            context.openAlertBox("error", "User is not logged in or ID is missing.");
            setIsLoading(false);
            setIsLoading(false);
            return;
        }
        if (formFields.address_line1 === "") {
            context.openAlertBox("error", "Please Enter Address Line 1")
            return false;
        }
        // if (formFields.state === "") {
        //     context.openAlertBox("error", "Please Enter Your State Name")
        //     return false;
        // }
        if (formFields.pincode === "") {
            context.openAlertBox("error", "Please Enter pincode")
            setIsLoading(false);
            return false;
        }
        if (formFields.country === "") {
            context.openAlertBox("error", "Please Enter Country Name")
            setIsLoading(false);
            return false;
        }
        const phoneDigits = String(formFields.mobile).replace(/\D/g, "");

        if (phoneDigits.length !== 12) { // 91 + 10 digits
            context.openAlertBox("error", "Please enter valid 10-digit mobile number");
            setIsLoading(false);
            return;
        }

        if (formFields.landmark === "") {
            context.openAlertBox("error", "Please Enter Landmark")
            setIsLoading(false);
            return false;
        }
        if (formFields.addressType === "") {
            context.openAlertBox("error", "Please Select Address Type")
            setIsLoading(false);
            return false;
        }

        if (context?.addressMode === "add") {
            postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {

                if (res?.success !== false) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context.setOpenAddressPanel(false)();
                    }, 500)
                    context.openAlertBox("success", res?.message);
                    context?.getUserDetails();

                    setFormFields({
                        address_line1: '',
                        city: '',
                        state: '',
                        pincode: '',
                        country: '',
                        userId: '',
                        landmark: '',
                        addressType: ''

                    })
                    setAddressType("")
                    setPhone("")
                } else {
                    context.openAlertBox("error", res?.message);
                    setIsLoading(false);
                }
            })
                .catch(error => {
                    console.error("Post Error:", error);
                    context.openAlertBox("error", "A network or server error occurred.");
                    setIsLoading(false);
                });
        }
        if (context?.addressMode === "edit") {
            setIsLoading(true);
            editData(`/api/address/${context?.addressId}`, formFields, { withCredentials: true }).then(
                (res) => {

                    context.openAlertBox("success", res?.data?.message);
                    fetchDataFromApi(`/api/address`)
                        .then((res) => {
                            setAddress(res?.data);
                            setTimeout(() => {
                                setIsLoading(false);
                                context.setOpenAddressPanel(false);
                            }, 500)
                            context?.getUserDetails();

                            setFormFields({
                                address_line1: '',
                                city: '',
                                state: '',
                                pincode: '',
                                country: '',
                                userId: '',
                                landmark: '',
                                addressType: ''

                            })
                            setAddressType("")
                            setPhone("")
                        })
                }
            )
        }

    }

    const fetchAddress = (id) => {
        fetchDataFromApi(`/api/address/${id}`).then((res) => {
            setFormFields({
                address_line1: res?.address?.address_line1,
                city: res?.address?.city,
                state: res?.address?.state,
                pincode: res?.address?.pincode,
                country: res?.address?.country,
                mobile: String(res?.address?.mobile || ""),
                userId: res?.address?.userId,
                addressType: res?.address?.addressType,
                landmark: res?.address?.landmark
            });
            setPhone(String(res?.address?.mobile || ""))
            setAddressType(res?.address?.addressType)
        });


    }
    return (
        <form onSubmit={handleSubmit} id="subscription-form" >
            <div className="col w-[100%] !mb-4 ">
                <TextField
                    autoFocus

                    margin="dense"
                    id="address_line1"
                    onChange={onChangeInput}
                    name='address_line1'
                    value={formFields.address_line1}
                    label="Address Line 1"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="col w-[100%] !mb-4">
                <TextField
                    autoFocus

                    margin="dense"
                    id="city"
                    onChange={onChangeInput}
                    value={formFields.city}
                    name='city'
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="col w-[100%] !mb-4">
                <TextField
                    autoFocus

                    margin="dense"
                    id="state"
                    onChange={onChangeInput}
                    name='state'
                    value={formFields.state}

                    label="State"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="col w-[100%] !mb-4">
                <TextField
                    autoFocus

                    margin="dense"
                    id="pincode"
                    onChange={onChangeInput}
                    value={formFields.pincode}

                    name='pincode'
                    label="Pincode"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="col w-[100%] !mb-4">
                <TextField
                    autoFocus

                    margin="dense"
                    id="country"
                    onChange={onChangeInput}
                    name='country'
                    value={formFields.country}
                    label="Country"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="col w-[100%] !mb-4 !mt-4">
                <PhoneInput
                    name="mobile"
                    defaultCountry="in"
                    value={phone}
                    disabled={isLoading}
                    onChange={(phone) => {
                        const digits = String(phone || "").replace(/\D/g, "");
                        const value = digits.length <= 2 ? "" : phone;

                        setPhone(value);
                        setFormFields(prev => ({
                            ...prev,
                            mobile: value
                        }));
                    }}

                />
            </div>
            <div className="col w-[100%] !mb-4">
                <TextField
                    autoFocus
                    margin="dense"
                    id="landmark"
                    onChange={onChangeInput}
                    name='landmark'
                    value={formFields.landmark}
                    label="Landmark"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </div>

            <div className="flex gap-5 pb-5 flex-col !mt-4">
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        className='items-center flex gap-5'
                        value={formFields.addressType}
                        onChange={handleChangeAddressType}
                    >
                        <FormControlLabel value="Home" control={<Radio />} label="Home" />
                        <FormControlLabel value="Work" control={<Radio />} label="Work" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="flex items-center gap-5">
                {/* <Button className='btn-org btn-border btn-lg w-full flex gap-3 items-center'
                onClick={context?.setOpenAddressPanel(false)}
                >Cancel</Button> */}
                <Button type='submit' form="subscription-form" className='btn-org btn-lg w-full flex gap-3 items-center'>
                    {
                        isLoading === true ?
                            <CircularProgress />
                            :
                            <>
                                <LuBaggageClaim className='text-[20px]' />
                                Save
                            </>
                    }
                </Button>
            </div>
        </form>
    )
}

export default AddAddress;