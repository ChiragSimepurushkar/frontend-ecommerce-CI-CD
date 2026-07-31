// import React, { useContext, useEffect, useState } from 'react'
// import AccountSidebar from '../../components/AccountSidebar';
// import { MyContext } from '../../App';

// import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// import AddressBox from './addressBox';

// const Address = () => {
//     const context = useContext(MyContext)
//     const [address, setAddress] = useState([])

//     useEffect(() => {
//         if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
//             setAddress(context?.userData?.address_details);
//         }
//     }, [context?.userData]);

//     useEffect(() => {
//         if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
//             fetchDataFromApi(`/api/address`)
//                 .then((res) => {
//                     setAddress(res.data);
//                 })
//         }
//     }, [context?.userData])

//     const removeAddress = (id) => {
//         deleteData(`/api/address/${id}`).then((res) => {
//             context.openAlertBox("success", res?.message);
//             fetchDataFromApi(`/api/address`)
//                 .then((res) => {
//                     setAddress(res.data);
//                 });
//         });
//     };

//     return (
//         <>
//             <section className='py-10 w-full'>
//                 <div className="container flex gap-5">
//                     <div className="coll w-[20%]">
//                         <AccountSidebar />
//                     </div>
//                     <div className="col2 w-[50%]">
//                         <div className="card mb-5 bg-white p-5 shadow-md rounded-md">
//                             <div className="flex items-center pb-3">
//                                 <h2 className="pb-0">Address</h2>
//                             </div>
//                             <hr className='text-[rgba(0,0,0,0.2)]' />
//                             <div onClick={context?.toggleAddressPanel(true)} className="flex items-center rounded-md
//                      justify-center p-5 border border-dashed 
//                      border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e0f3fe] cursor-pointer">
//                                 <span className='text-[14px] font-[500] '
//                                 >
//                                     Add Address
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 flex-col !mt-4">
//                                 {
//                                     address?.length > 0 && address?.map((address, index) => {
//                                         return (
//                                             <AddressBox key={index}

//                                                 address={address} removeAddress={removeAddress} />
//                                         )
//                                     })
//                                 }
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Address;








import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Radio from '@mui/material/Radio';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LuBaggageClaim } from 'react-icons/lu';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import { FaRegTrashAlt } from 'react-icons/fa';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddressBox from './addressBox';
import CircularProgress from '@mui/material/CircularProgress';

const Address = () => {
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([])
    const [addressType, setAddressType] = useState('')
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [mode, setMode] = useState('add');
    const [addressId, setAddressId] = useState('');
    // const [status, setStatus] = useState(false);

    // const handleChangeStatus = (event) => {
    //     setStatus(event.target.value);
    //     setFormFields((prevState) => ({
    //         ...prevState,
    //         status: event.target.value
    //     }))
    // };
    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: context?.userData?._id
        }))
    }, [context?.userData]);
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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isValidPhone = (phone) => {
        if (!phone) return false;

        // remove + and country code (91)
        const cleaned = phone.replace(/\D/g, "");

        // India numbers should be 10 digits (after country code)
        return cleaned.length >= 12; // 91 + 10 digits
    };

    const handleChangeAddressType = (event) => {
        setAddressType(event.target.value);
        setFormFields(() => ({
            ...formFields,
            addressType: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userIdFromContext = context?.userData?._id;
        setIsLoading(true);

        if (!userIdFromContext) {
            context.openAlertBox("error", "User is not logged in or ID is missing.");
            setIsLoading(false);
            return;
        }
        if (formFields.address_line1 === "") {
            context.openAlertBox("error", "Please Enter Address Line 1")
            setIsLoading(false);
            return false;
        }
        if (formFields.state === "") {
            context.openAlertBox("error", "Please Enter Your State Name")
            setIsLoading(false);

            return false;
        }
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
        if (!isValidPhone(formFields.mobile)) {
            context.openAlertBox("error", "Please enter a valid 10-digit phone number");
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

        if (mode === "add") {
            postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {

                if (res?.success !== false) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setOpen(false);
                    }, 500)
                    context.openAlertBox("success", res?.message);
                    // context?.setIsOpenFullScreenPanel({
                    //     open: false
                    // })
                    fetchDataFromApi(`/api/address`)
                        .then((res) => {
                            setAddress(res.data);
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
                    handleClose();
                } else {
                    context.openAlertBox("error", res?.message);
                    setIsLoading(false);
                    handleClose();
                }
            })
                .catch(error => {
                    console.error("Post Error:", error);
                    context.openAlertBox("error", "A network or server error occurred.");
                    setIsLoading(false);
                });
        }
        if (mode === "edit") {
            setIsLoading(true);
            editData(`/api/address/${addressId}`, formFields, { withCredentials: true }).then(
                (res) => {

                    context.openAlertBox("success", res?.data?.message);
                    fetchDataFromApi(`/api/address`)
                        .then((res) => {
                            setAddress(res?.data);
                            setTimeout(() => {
                                setIsLoading(false);
                                setOpen(false);
                            }, 500)

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
    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address`)
                .then((res) => {
                    setAddress(res.data);
                    setOpen(false);
                })
        }
    }, [context?.userData])

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            context.openAlertBox("success", res?.message);
            fetchDataFromApi(`/api/address`)
                .then((res) => {
                    setAddress(res.data);
                    context?.getUserDetails()
                });
        });
    };

    const editAddress = (id) => {

        setMode("edit")
        setOpen(true);
        setAddressId(id)

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



        //     if (res?.success !== false) {
        //         setIsLoading(false);
        //         context.openAlertBox("success", res?.message);
        //         // context?.setIsOpenFullScreenPanel({
        //         //     open: false
        //         // })
        //         setOpen(false);
        //         fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
        //             setAddress(res.data);
        //             setFormFields({
        //                 address_line1: '',
        //                 city: '',
        //                 state: '',
        //                 pincode: '',
        //                 country: '',
        //                 userId: '',
        //                 landmark: '',
        //                 addressType: ''

        //             })
        //             setAddressType("")
        //             setPhone("")
        //         })
        //         handleClose();

        //     } else {
        //         context.openAlertBox("error", res?.message);
        //         setIsLoading(false);
        //         handleClose();
        //     }
        // })
        //     .catch(error => {
        //         console.error("Post Error:", error);
        //         context.openAlertBox("error", "A network or server error occurred.");
        //         setIsLoading(false);
        //     });
    }
    return (
        <>
            <section className='py-4 lg:py-10 w-full'>
                <div className="container flex flex-col lg:flex-row gap-5">
                    <div className="col1 w-full lg:w-[20%] hidden lg:block">
                        <AccountSidebar />
                    </div>
                    <div className="col2 w-full lg:w-[50%]">
                        <div className="card mb-5 bg-white p-5 shadow-md rounded-md">
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Address</h2>
                            </div>
                            <hr className='text-[rgba(0,0,0,0.2)]' />
                            <div onClick={handleClickOpen} className="flex items-center rounded-md
                     justify-center p-5 border border-dashed
                     border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e0f3fe] cursor-pointer">
                                <span className='text-[14px] font-[500] '
                                >
                                    Add Address
                                </span>
                            </div>
                            <div className="flex gap-2 flex-col !mt-4">
                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <AddressBox key={index} editAddress={editAddress} address={address} removeAddress={removeAddress} />
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {mode === "add" ? 'Add ' : "Edit "}
                    Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {mode === "add" ? ' To Add your address please fill the details below and submit.' : ""}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form" >
                        <div className="flex flex-col lg:flex-row items-center gap-5 pb-5">
                            <div className="col w-[100%]">
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
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-5 pb-5">
                            <div className="col w-full lg:w-[50%]">
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
                            <div className="col w-full lg:w-[50%]">
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
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-5 pb-5">
                            <div className="col w-full lg:w-[50%]">
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
                            <div className="col w-full lg:w-[50%]">
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
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-5 pb-7">
                            <div className="col w-full lg:w-[50%]">
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
                            {/* <div className="col w-[50%]">
                                <Select
                                    className='w-full'
                                    id="status"
                                    value={status}
                                    label="Status"
                                    size='small'
                                    displayEmpty
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </div> */}
                            <div className="col w-full lg:w-[50%]">
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
                        </div>
                        <div className="flex flex-col gap-5 pb-5">
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
                            <Button className='btn-org btn-border btn-lg w-full flex gap-3 items-center' onClick={handleClose}>Cancel</Button>
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
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Address;