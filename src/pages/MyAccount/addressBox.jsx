// import React, { useContext, useState } from "react";
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MyContext } from "../../App";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";


// const ITEM_HEIGHT = 48;
// const AddressBox = (props) => {
//     const context = useContext(MyContext)
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const removeAddress = (id) => {
//         setAnchorEl(null);
//         props?.removeAddress(id)
//     }

//     const editAddress = (id) => {
//         setAnchorEl(null);
//         props?.editAddress(id);
//     };

//     return (
//         <div
//             className='group relative border border-dashed border-[rgba(0, 0, 0, 0.2)] 
//                                                 addressBox w-full bg-[#fafafa] p-4 rounded-md cursor-pointer'>
//             <span className="inline-block p-1 bg-[#dadada] text-[12px] rounded-sm">{props?.address?.addressType}</span>
//             <h4 className="text-[14px] pt-2 flex items-center gap-4"><span>{context?.userData?.name}</span>
//                 <span>+{props?.address?.mobile}</span></h4>
//             <span className="text-[13px] block w-100 pt-0">
//                 {props?.address?.address_line1 + " " +
//                     props?.address?.city + " " +
//                     props?.address?.country + " " +
//                     props?.address?.state + " " +
//                     props?.address?.pincode + " "
//                 }
//             </span>

//             {/* <span onClick={() => removeAddress(address?._id)}
//                                                     className="hidden group-hover:flex items-center justify-center
//                                                  w-[30px] h-[30px] rounded-full
//                                                   bg-gray-500 text-white !ml-auto z-50">
//                                                     <FaRegTrashAlt />
//                                                 </span> */}
//             <div className="absolute right-[20px] top-[20px]">
//                 <IconButton
//                     aria-label="more"
//                     id="long-button"
//                     aria-controls={open ? 'long-menu' : undefined}
//                     aria-expanded={open ? 'true' : undefined}
//                     aria-haspopup="true"
//                     onClick={handleClick}
//                 >
//                     <MoreVertIcon />
//                 </IconButton>
//                 <Menu
//                     id="long-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     slotProps={{
//                         paper: {
//                             style: {
//                                 maxHeight: ITEM_HEIGHT * 4.5,
//                                 width: '20ch',
//                             },
//                         },
//                         list: {
//                             'aria-labelledby': 'long-button',
//                         },
//                     }}
//                 >
//                     <MenuItem onClick={() => editAddress(props?.address?._id)}>
//                         Edit
//                     </MenuItem>
//                     <MenuItem onClick={() => removeAddress(props?.address?._id)}>
//                         Delete
//                     </MenuItem>
//                 </Menu>
//             </div>
//         </div>
//     )
// }

// export default AddressBox;





import React, { useContext, useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MyContext } from "../../App";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const ITEM_HEIGHT = 48;
const AddressBox = (props) => {
    const context = useContext(MyContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removeAddress = (id) => {
        setAnchorEl(null);
        props?.removeAddress(id)
    }

    const editAddress = (id) => {
        setAnchorEl(null);
        
        context?.setOpenAddressPanel(true);
        context?.setAddressMode("edit")
        context?.setAddressMode("edit")
        context?.setAddressId(id)
        // context?.editAddress(id);
    };

    return (
        <div
            className='group relative border border-dashed border-[rgba(0, 0, 0, 0.2)] 
                                                addressBox w-full bg-[#fafafa] p-4 rounded-md cursor-pointer'>
            <span className="inline-block p-1 bg-[#dadada] text-[12px] rounded-sm">{props?.address?.addressType}</span>
            <h4 className="text-[14px] pt-2 flex items-center gap-4"><span>{context?.userData?.name}</span>
                <span>+{props?.address?.mobile}</span></h4>
            <span className="text-[13px] block w-100 pt-0">
                {props?.address?.address_line1 + " " +
                    props?.address?.city + " " +
                    props?.address?.country + " " +
                    props?.address?.state + " " +
                    props?.address?.pincode + " "
                }
            </span>

            {/* <span onClick={() => removeAddress(address?._id)}
                                                    className="hidden group-hover:flex items-center justify-center
                                                 w-[30px] h-[30px] rounded-full
                                                  bg-gray-500 text-white !ml-auto z-50">
                                                    <FaRegTrashAlt />
                                                </span> */}
            <div className="absolute right-[20px] top-[20px]">
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        },
                        list: {
                            'aria-labelledby': 'long-button',
                        },
                    }}
                >
                    <MenuItem onClick={() => editAddress(props?.address?._id)}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={() => removeAddress(props?.address?._id)}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default AddressBox;