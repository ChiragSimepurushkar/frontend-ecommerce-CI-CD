// Simplified Reviews component structure
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';

export const Reviews = (props) => {
    const context = useContext(MyContext)
    const [reviewsData, setReviewsData] = useState([])
    const [reviews, setReviews] = useState({
        image: '',
        userName: '',
        review: '',
        rating: 1,
        userId: '',
        productId: ''
    });

    useEffect(() => {
        setReviews(() => ({
            ...reviews,
            image: context?.userData?.avatar,
            userName: context?.userData?.name,
            userId: context?.userData?._id,
            productId: props?.productId
        }))
        getReviews();
    }, [context?.userData, props])

    const onChangeInput = (e) => {
        setReviews(() => ({
            ...reviews,
            review: e.target.value
        }))
    }

    const addReview = (e) => {
        e.preventDefault();

        if (reviews?.review !== '') {

            postData("/api/user/addReview", reviews).then((res) => {
                if (res?.error === false) {
                    context.openAlertBox("success", res?.message);
                    setReviews(() => ({
                        ...reviews,
                        review: '',
                        rating: 1
                    }))
                    getReviews();
                } else {
                    context.openAlertBox("error", res?.message);
                }

            })
        } else {
            context.openAlertBox("error", "Please add Review");
        }
    }

    const getReviews = () => {
        fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then((res) => {
            if (res?.error === false) {
                setReviewsData(res?.reviews)
                props?.setReviewCount(res?.reviews?.length)
            }
        })
    }
    return (
        <>
            <div className="w-full productReviewContainer">
                <h2 className='text-[16px] lg:text-[18px]'>Customer questions & answers</h2>
                {
                    reviewsData?.length !== 0 &&
                    <div className="!mt-5 pr-5 reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
                        {
                            reviewsData?.map((review, index) => {
                                return (
                                    <div key={index} className="review pb-5 pt-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                <img src={review?.image} className='w-full' />
                                            </div>
                                            <div className="w-[80%]">
                                                <h4 className='text-[16px]'>{review.userName}</h4>
                                                <h5 className='text-[13px] !mb-0'>{review.createdAt?.split("T")[0]}</h5>
                                                <p className='!mt-0 !mb-0'>{review.review}</p>
                                            </div>

                                        </div>
                                        <Rating name="size-small" value={review.rating} readOnly />

                                    </div>
                                )
                            })
                        }
                    </div>
                }

                <br />
                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                    <h2 className="text-[18px]">Add a review</h2>
                    <form className="w-full !mt-5" onSubmit={addReview}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Write a review..."
                            className="w-full !mb-5"
                            value={reviews.review}
                            onChange={onChangeInput}
                            name="review"
                            multiline
                            rows={5}
                        />
                        <Rating
                            name="size-small"
                            defaultValue={1}
                            value={reviews.rating}
                            onChange={(event, newValue) => {
                                setReviews(() => ({
                                    ...reviews,
                                    rating: newValue
                                }))
                            }}
                        />
                        <div className="flex items-center !mt-5">
                            <Button type="submit" className='btn-org'>Submit Review</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
