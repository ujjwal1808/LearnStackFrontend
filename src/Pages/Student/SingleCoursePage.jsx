import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import url from "../../lib/url";

const SingleCoursePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [singleCourse, setSingleCourse] = useState({});

    useEffect(() => {

        loadCourse();

    }, []);

    const loadCourse = async () => {

        try {

            const response = await axios.get(url + "course/" + id);

            setSingleCourse(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const buyCourse = async () => {

        try {

            const token = localStorage.getItem("token");

            const userId = localStorage.getItem("id");

            const response = await axios.post(

                url + "payment/create-order",

                {

                    userId: userId,
                    courseId: id

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );
            console.log(response.data);
            openRazorpay(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to create payment.");

        }

    };

    const openRazorpay = (order) => {

        const options = {

            key: order.key,

            amount: order.amount,

            currency: order.currency,

            name: "LearnStack",

            description: singleCourse.title,

            order_id: order.orderId,

            prefill: {

                name: localStorage.getItem("name"),

                email: localStorage.getItem("email")

            },

            theme: {

                color: "#4F46E5"

            },

            handler: async function (response) {

                verifyPayment(response);

            },

            modal: {

                ondismiss: function () {

                    alert("Payment Cancelled");

                }

            }

        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {

            console.log(response);

            alert("Payment Failed");

        });

        razorpay.open();

    };

    const verifyPayment = async (paymentResponse) => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(

                url + "payment/verify",

                {

                    paymentId: paymentResponse.razorpay_payment_id,

                    orderId: paymentResponse.razorpay_order_id,

                    signature: paymentResponse.razorpay_signature

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Payment Successful");

            navigate("/student/enrolled-course");

        }

        catch (error) {

            console.log(error);

            alert("Payment Verification Failed");

        }

    };

    const isInstructor = false;

    return (

        <div>

            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold">

                        {singleCourse.title}

                    </h2>

                    {

                        isInstructor &&

                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">

                            Edit

                        </button>

                    }

                </div>

                <div className="grid lg:grid-cols-4 gap-6">

                    <div className="lg:col-span-3 space-y-6">

                        <div className="bg-white rounded-xl shadow overflow-hidden">

                            <img

                                src={singleCourse.thumbnail}

                                alt=""

                                className="w-full h-[380px] object-cover"

                            />

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="text-xl font-semibold mb-3">

                                Description

                            </h3>

                            <p className="text-gray-600 leading-8">

                                {singleCourse.description}

                            </p>

                        </div>

                        <button

                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold"

                            onClick={buyCourse}

                        >

                            Enroll Now

                        </button>

                    </div>

                    <div className="space-y-6">

                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="font-bold text-xl mb-4">

                                Pricing Details

                            </h3>

                            <div className="space-y-3">

                                <div className="flex justify-between">

                                    <span>Price</span>

                                    <span className="font-semibold">

                                        ₹ {singleCourse.price}

                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="font-bold text-xl mb-4">

                                Instructor

                            </h3>

                            <div className="flex items-center gap-4 mb-4">

                                <img

                                    src="https://i.pravatar.cc/150?img=32"

                                    alt=""

                                    className="w-14 h-14 rounded-full"

                                />

                                <div>

                                    <h4 className="font-semibold">

                                        {singleCourse.instructor?.name}

                                    </h4>

                                    <p className="text-sm text-gray-500">

                                        Instructor

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

};

export default SingleCoursePage;