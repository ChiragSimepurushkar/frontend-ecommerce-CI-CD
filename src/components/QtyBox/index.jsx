import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
const QtyBox = (props) => {
    const [qtyVal, setQtyVal] = useState(1);

    const plusQty = () => {
        setQtyVal(qtyVal + 1)
        props.handleSelectQty(qtyVal + 1)
    }
    const minusQty = () => {
        if (qtyVal === 1) {
            setQtyVal(1)
            props.handleSelectQty(1)
        } else {
            setQtyVal(qtyVal - 1)
            props.handleSelectQty(qtyVal - 1)

        }
    }
    return (
        <div className="qtyBox flex items-center relative">
            <input type="number" className='w-full !pl-5 h-[40px] text-[15px]
             p-2 focus:outline-none border-1 border-[rgba(0,0,0,0.2)]
              rounded-md' value={qtyVal} />
            <div className="flex items-center 
            flex-col justify-between h-[40px] border-l-1 border-[#000] 
            absolute top-0 right-0 z-50">
                <Button onClick={plusQty}
                    className='hover:!bg-[#f1f1f1] !min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none'><FaChevronUp className='text-[12px] opacity-55' /></Button>
                <Button onClick={minusQty}
                    className='hover:!bg-[#f1f1f1] !min-w-[25px] !w-[25px] !h-[20px] !text-[#000] !rounded-none'><FaChevronDown className='text-[12px] opacity-55' /></Button>
            </div>
        </div>
    );
}

export default QtyBox;