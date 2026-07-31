import React from 'react';
import '../BannerBoxV2/style.css'
import { Link } from 'react-router-dom';
const BannerBoxV2 = (props) => {
    return ( 
        <div className="bannerBoxV2 box group w-full overflow-hidden rounded-md relative">
            <img className='w-full transition-all duration-150
            group-hover:scale-105' 
            src={props.image}/>
            <div className=
            {`flex items-center gap-2 flex-col 
            justify-center info absolute p-5 top-0 
            ${props.info==="left"? 'left-0':'right-0' } z-50 w-[70%] h-[100%]
            ${props.info==="left"? '':'pl-12' }`}>
                <h2 className='text-[14px] md:text-[18px] font-[600]'>{props?.item?.bannerTitlename}</h2>
                <span className='w-full text-[20px] font-[600] text-[#ff5252]'></span>
               <div className="w-full">
                 <Link to="/" className='text-[16px] link font-[600]'>&#x20b9;{props?.item?.price}</Link>
               </div>
            </div>
        </div>
     );
}
 
export default BannerBoxV2;