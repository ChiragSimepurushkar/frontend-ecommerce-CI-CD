import React, { useContext, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../Sidebar/style.css'
import Rating from '@mui/material/Rating';

import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { FaAngleUp } from "react-icons/fa6";
import Button from '@mui/material/Button';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { MyContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';
import { MdOutlineFilterAlt } from 'react-icons/md';
const Sidebar = (props) => {
    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
    const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] = useState(true);
    const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
    const context = useContext(MyContext);
    const [filters, setFilters] = useState({
        catId: [],
        subCatId: [],
        thirdSubCatId: [],
        minPrice: '',
        maxPrice: '',
        rating: '',
        page: 1,
        limit: 25
    });
    const location = useLocation();
    const [price, setPrice] = useState([0, 600000]);

    const handleCheckboxChange = (field, value) => {
        context?.setSearchData([]);

        const currentValues = filters[field] || [];
        const updatedValues = currentValues?.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        setFilters((prev) => ({
            ...prev,
            [field]: updatedValues
        }));

        if (field === "catId") {
            setFilters((prev) => ({
                ...prev,
                subCatId: [],
                thirdSubCatId: []
            }));
        }
    };

    useEffect(() => {
        const url = window.location.href;
        const queryParameters = new URLSearchParams(location.search);

        if (url.includes("catId")) {
            const categoryId = queryParameters.get("catId");
            const catArr = [];
            catArr.push(categoryId);

            filters.catId = catArr;
            filters.subCatId = [];
            filters.thirdSubCatId = [];
            filters.rating = [];
        }
        if (url.includes("subCatId")) {
            const subcategoryId = queryParameters.get("subCatId");
            const subCatArr = [];
            subCatArr.push(subcategoryId);

            filters.subCatId = subCatArr;
            filters.catId = [];
            filters.thirdSubCatId = [];
            filters.rating = [];
        }
        if (url.includes("ThirdLavelCatId")) {
            const thirdlevelcategoryId = queryParameters.get("ThirdLavelCatId");
            const ThirdLevelCatArr = [];
            ThirdLevelCatArr.push(thirdlevelcategoryId);

            filters.subCatId = [];
            filters.catId = [];
            filters.thirdSubCatId = ThirdLevelCatArr;
            filters.rating = [];
        }
        filters.page = 1;

        setTimeout(() => {
            filtesData();
        }, 200);

    }, [location]);

    const filtesData = () => {
        props.setIsLoading(true);

        // ✅ Check if ANY filter is active (excluding page and limit)
        const hasActiveFilters =
            filters.catId?.length > 0 ||
            filters.subCatId?.length > 0 ||
            filters.thirdSubCatId?.length > 0 ||
            filters.rating?.length > 0 ||
            (filters.minPrice && filters.minPrice > 0) ||
            (filters.maxPrice && filters.maxPrice < 600000);

        // ✅ If filters are active, always use filter endpoint (ignores search)
        if (hasActiveFilters) {
            postData(`/api/product/filters`, filters).then((res) => {
                props.setProductsData(res);
                props.setIsLoading(false);
                props.setTotalPages(res?.totalPages);
                window.scrollTo(0, 0);
            });
        }
        // ✅ If no filters but on search page with query, use search
        else if (window.location.pathname === '/search') {
            const params = new URLSearchParams(location.search);
            const searchQuery = params.get('q');

            if (searchQuery) {
                const searchObj = {
                    page: filters.page,
                    limit: filters.limit,
                    query: searchQuery
                };

                postData(`/api/product/search`, searchObj).then((res) => {
                    props.setProductsData(res);
                    props.setIsLoading(false);
                    props.setTotalPages(res?.totalPages);
                    window.scrollTo(0, 0);
                });
            } else {
                // No query, show all products
                postData(`/api/product/filters`, filters).then((res) => {
                    props.setProductsData(res);
                    props.setIsLoading(false);
                    props.setTotalPages(res?.totalPages);
                    window.scrollTo(0, 0);
                });
            }
        }
        // ✅ Use context search data if available and no filters
        else if (context?.searchData?.products?.length > 0) {
            props.setProductsData(context?.searchData);
            props.setIsLoading(false);
            props.setTotalPages(context?.searchData?.totalPages);
            window.scrollTo(0, 0);
        }
        // ✅ Default: use filter endpoint
        else {
            postData(`/api/product/filters`, filters).then((res) => {
                props.setProductsData(res);
                props.setIsLoading(false);
                props.setTotalPages(res?.totalPages);
                window.scrollTo(0, 0);
            });
        }
    };

    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            minPrice: price[0],
            maxPrice: price[1]
        }));
    }, [price]);

    useEffect(() => {
        filters.page = props.page;
        filtesData();
    }, [filters, props.page]);

    return (
        <aside className='sidebar py-3 lg:py-5 pr-0 lg:pr-5 static lg:sticky top-[190px] z-50'>
            <div className="max-h-[90vh] overflow-auto lg:overflow-hidden w-full">

                <div className="box">
                    <h3 className='mb-3 pr-5 text-[16px] font-[600] flex items-center'>
                        Shop by Category
                        <Button className='!text-[#000] !w-[30px] !ml-auto !h-[30px] !min-w-[30px] !rounded-full'
                            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                            {
                                isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />
                            }
                        </Button></h3>
                    <Collapse isOpened={isOpenCategoryFilter}>
                        <div className="scroll px-3 relative -left-[13px] ">
                            {
                                context?.catData?.length !== 0 &&
                                context?.catData?.map((item, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            value={item?._id}
                                            control={<Checkbox />}
                                            checked={filters?.catId?.includes(item?._id)}
                                            label={item?.name}
                                            onChange={() => handleCheckboxChange('catId', item?._id)}
                                            className="w-full"
                                        />
                                    );
                                })
                            }

                        </div>
                    </Collapse>
                </div>

                {/* <div className="box !mt-3">
                <h3 className='mb-3 pr-5 text-[16px] font-[600] flex items-center'>
                    Availability
                    <Button className='!text-[#000] !w-[30px] !ml-auto !h-[30px] !min-w-[30px] !rounded-full'
                        onClick={() => setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)}>
                        {
                            isOpenAvailabilityFilter === true ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </Button></h3>
                <Collapse isOpened={isOpenAvailabilityFilter}>
                    <div className="scroll px-3 relative -left-[13px] ">
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Available     (17)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="In Stock      (10)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Not Available (12)" className='w-full' />

                    </div>
                </Collapse>
            </div>

            <div className="box !mt-3">
                <h3 className='mb-3 pr-5 text-[16px] font-[600] flex items-center'>
                    Sizes
                    <Button className='!text-[#000] !w-[30px] !ml-auto !h-[30px] !min-w-[30px] !rounded-full'
                        onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}>
                        {
                            isOpenSizeFilter === true ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </Button></h3>
                <Collapse isOpened={isOpenSizeFilter}>
                    <div className="scroll px-3 relative -left-[13px] ">
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Small     (10)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Medium    (6)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Large     (9)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="XL        (4)" className='w-full' />
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="XXL       (6)" className='w-full' />

                    </div>
                </Collapse>
            </div> */}

                <div className="box !mt-4 ">
                    <h3 className='mb-3 pr-5 text-[16px] font-[600] flex items-center'>
                        Filter By Price
                    </h3>
                    <RangeSlider className='!mt-4'
                        value={price}
                        onInput={setPrice}
                        min={100}
                        max={60000}
                        step={5} />
                    <div className="flex pt-4 pb-2 priceRange">
                        <span className='text-[13px]'>
                            From: <strong className="text-dark">Rs: {price[0]}</strong>
                        </span>
                        <span className="ml-auto text-[13px]">
                            From: <strong className="text-dark">Rs: {price[1]}</strong>
                        </span>
                    </div>
                </div>

                <div className="box !mt-4 ">
                    <h3 className='!mb-3 pr-5 text-[16px] font-[600] flex items-center'>
                        Filter By Ratings
                    </h3>
                    <div className="flex items-center pl-2 lg:pl-0">
                        <FormControlLabel
                            value={5}
                            control={<Checkbox />}
                            checked={filters?.rating?.includes(5)}
                            onChange={() => handleCheckboxChange('rating', 5)}
                        />
                        <Rating
                            name="rating"
                            value={5}
                            size="small"
                            readOnly
                        />
                    </div>
                    <div className="flex items-center pl-2 lg:pl-0">
                        <FormControlLabel
                            value={4}
                            control={<Checkbox />}
                            checked={filters?.rating?.includes(4)}
                            onChange={() => handleCheckboxChange('rating', 4)}
                        />
                        <Rating
                            name="rating"
                            value={4}
                            size="small"
                            readOnly
                        />
                    </div>
                    <div className="flex items-center pl-2 lg:pl-0">
                        <FormControlLabel
                            value={3}
                            control={<Checkbox />}
                            checked={filters?.rating?.includes(3)}
                            onChange={() => handleCheckboxChange('rating', 3)}
                        />
                        <Rating
                            name="rating"
                            value={3}
                            size="small"
                            readOnly
                        />
                    </div>
                    <div className="flex items-center pl-2 lg:pl-0">
                        <FormControlLabel
                            value={2}
                            control={<Checkbox />}
                            checked={filters?.rating?.includes(2)}
                            onChange={() => handleCheckboxChange('rating', 2)}
                        />
                        <Rating
                            name="rating"
                            value={2}
                            size="small"
                            readOnly
                        />
                    </div>
                    <div className="flex items-center pl-2 lg:pl-0">
                        <FormControlLabel
                            value={1}
                            control={<Checkbox />}
                            checked={filters?.rating?.includes(1)}
                            onChange={() => handleCheckboxChange('rating', 1)}
                        />
                        <Rating
                            name="rating"
                            value={1}
                            size="small"
                            readOnly
                        />
                    </div>
                </div>

            </div>
            {
                context?.windowWidth < 992 &&
                <>
                    <br />
                    <Button onClick={() => context?.setOpenFilter(false)} className='btn-org w-full lg:hidden'>
                        <MdOutlineFilterAlt size={20} />
                        Filter
                    </Button>
                </>
            }
        </aside>
    );
}

export default Sidebar;