import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Productitem from '../../components/Productitem';
import Button from '@mui/material/Button';
import { IoGrid } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ProductitemListView from '../../components/ProductitemListView';
import Pagination from '@mui/material/Pagination';
import ProductLoading from '../../components/ProductLoading';
import ProductListLoading from '../../components/ProductListLoading';
import { postData } from '../../utils/api';
import MyAccount from '../MyAccount';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
    const [isItemView, setIsItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSortVal, setSelectedSortVal] = useState("Name, A to Z");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const context = useContext(MyAccount);
    const location = useLocation();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');

        // Only load search results if context has search data
        if (context?.searchData?.products?.length > 0) {
            setProductsData(context.searchData);
            setTotalPages(context.searchData?.totalPages || 1);
        } else if (query) {
            setIsLoading(true);
            const obj = {
                page: page,
                limit: 25,
                query: query
            };

            postData(`/api/product/search`, obj).then((res) => {
                setProductsData(res);
                setTotalPages(res?.totalPages || 1);
                setIsLoading(false);
            });
        }
    }, [location.search]);

    const handleSortBy = (name, order, products, value) => {
        setSelectedSortVal(value);

        postData('/api/product/sortBy', {
            products: products,
            sortBy: name,
            order: order
        }).then((res) => {
            setProductsData(res);
            setAnchorEl(null);
        });
    };
    return (
        <section className='py-0 lg:py-5 pb-0'>
            {/* <div className="container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="link transition" underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className='link transition'
                    >
                        Fashion
                    </Link>
                </Breadcrumbs>
            </div> */}
            <div className="bg-white p-2 !mt-4">
                <div className="container flex gap-3 lg:!ml-15">
                    <div className={`sidebarWrapper lg:block 
                    fixed -bottom-[100%] left-0  lg:h-full lg:static w-full lg:w-[20%] 
                    bg-white z-[150] lg:z-[50] p-3 lg:p-0 transition-all lg:opacity-100 opacity-0
                    ${context?.openFilter === true ? 'open' : ''}`}>
                        <Sidebar productsData={productsData}
                            setProductsData={setProductsData}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            page={page}
                            setTotalPages={setTotalPages} />
                    </div>
                    {
                        context?.windowWidth < 992 &&
                        <div onClick={() => context?.setOpenFilter(false)} className={`filter_overlay w-full h-full bg-[rgba(0,0,0,0.5)]
                         fixed top-0 left-0 z-[149] ${context?.openFilter === true ? 'block' : 'hidden'}`}>

                        </div>
                    }
                    <div className="rightContent w-full lg:w-[80%] py-3 ">
                        <div className="bg-[#f1f1f1] p-2 w-full 
    !mb-4 rounded-md flex items-center justify-between sticky top-0 z-[99]">
                            <div className="col1 flex items-center itemViewAction">
                                <Button
                                    className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${isItemView === 'list' && 'active'}`}
                                    onClick={() => setIsItemView('list')}>
                                    <IoGrid className='text-[rgba(0,0,0,0.7)] text-[20px]' /></Button>
                                <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]  ${isItemView === 'grid' && 'active'}`}
                                    onClick={() => setIsItemView('grid')}>
                                    <BsFillGrid3X3GapFill className='text-[rgba(0,0,0,0.7)] text-[20px]' /></Button>
                                <span className='hidden sm:block md:block lg:block text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>There are
                                    <span className='text-[#ff5252]'>&nbsp;{productsData?.products?.length}</span> products.</span>
                            </div>
                            <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Sort By : </span>
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className='!bg-white !text-[#000] !text-[12px] !capitalize !border !border-[#000]'
                                >
                                    {selectedSortVal}
                                </Button>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => handleSortBy('name', 'asc', productsData, "Name, A to Z")}
                                        className='!text-[13px] !text-[#000] !capitalize'>
                                        Name, A to Z
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleSortBy('name', 'desc', productsData, "Name, Z to A")}
                                        className='!text-[13px] !text-[#000] !capitalize'>
                                        Name, Z to A
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'asc', productsData, "Price, low to high")}
                                        className='!text-[13px] !text-[#000] !capitalize'>
                                        Price, low to high
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleSortBy('price', 'desc', productsData, "Price, high to low")}
                                        className='!text-[13px] !text-[#000] !capitalize'>
                                        Price, high to low
                                    </MenuItem>
                                </Menu>

                            </div>
                        </div>
                        <div className={`grid 
                            ${isItemView === 'grid' ?
                                'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' :
                                'grid-cols-1 '} gap-4`}>
                            {
                                isItemView === 'grid' ?
                                    (
                                        <>
                                            {
                                                isLoading === true ? (
                                                    <ProductLoading view={isItemView} />
                                                ) : (
                                                    productsData?.products?.length !== 0 &&
                                                    productsData?.products?.map((item, index) => {
                                                        return (<Productitem key={index} item={item} />);
                                                    })
                                                )
                                            }
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {
                                                isLoading === true ? (
                                                    <ProductListLoading view={isItemView} />
                                                ) : (
                                                    productsData?.products?.length !== 0 &&
                                                    productsData?.products?.map((item, index) => {
                                                        return (<ProductitemListView key={index} item={item} />);
                                                    })
                                                )
                                            }
                                        </>
                                    )
                            }
                        </div>

                        {
                            totalPages > 1 && (
                                <div className="flex items-center justify-center !mt-10">
                                    <Pagination
                                        showFirstButton
                                        showLastButton
                                        count={totalPages}
                                        page={page}
                                        onChange={(e, value) => setPage(value)}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchPage;