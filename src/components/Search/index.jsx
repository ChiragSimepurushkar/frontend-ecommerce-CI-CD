// import React, { useContext, useState } from 'react';
// import '../Search/style.css'
// import Button from '@mui/material/Button';
// import { IoSearch } from "react-icons/io5";
// import { MyContext } from '../../App';
// import { fetchDataFromApi, postData } from '../../utils/api';
// import { useNavigate } from 'react-router-dom';
// const Search = () => {
//     const [searchQuery, setSearchQuery] = useState("");

//     const context = useContext(MyContext);
//     const history = useNavigate();
//     const onChangeInput = (e) => {
//         setSearchQuery(e.target.value);

//         const obj = {
//             page: 1,
//             limit: 3,
//             query: e.target.value
//         }

//         if (e.target.value !== "") {
//             postData(`/api/product/search`, obj).then((res) => {
//                 context?.setSearchData(res?.data)
//             })
//         }
//     }
//     const search =()=>{
//         history('/search')
//     }

//     return (
//         <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
//             <input type='text'
//                 placeholder='Search for products...'
//                 onChange={onChangeInput}
//                 value={searchQuery}
//                 className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'>

//             </input>
//             <Button
//                 onClick={search}
//                 className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black'><IoSearch className='text-black text-[22px]' /></Button>
//         </div>
//     )
// }
// export default Search;


import React, { useContext, useState } from 'react';
import '../Search/style.css'
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const context = useContext(MyContext);
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const onChangeInput = (e) => {
        setSearchQuery(e.target.value);

        const obj = {
            page: 1,
            limit: 25, // ✅ Increased limit for dropdown
            query: e.target.value
        }

        if (e.target.value !== "") {
            postData(`/api/product/search`, obj).then((res) => {
                context?.setSearchData(res); // ✅ Set entire response, not res.data
            });
        } else {
            context?.setSearchData([]); // ✅ Clear when empty
        }
    }

    const search = () => {
        setIsLoading(true)
        if (searchQuery.trim() !== "") {
            // ✅ Navigate with query parameter
            setTimeout(() => {
                setIsLoading(false)
                context?.setOpenSearchPanel(false)
                history(`/search?q=${encodeURIComponent(searchQuery)}`);
            }, 1000)
        }
    }

    // ✅ Add Enter key handler
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    return (
        <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
            <input
                type='text'
                placeholder='Search for products...'
                onChange={onChangeInput}
                onKeyPress={handleKeyPress} // ✅ Add Enter key support
                value={searchQuery}
                className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'
            />
            <Button
                onClick={search}
                className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black'>
                {
                    isLoading === true ?
                        <CircularProgress />
                        :
                        <IoSearch className='text-black text-[22px]' />
                }

            </Button>
        </div>
    )
}

export default Search;