import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import url from "../../lib/url";

const StudentNotification = () => {

    const [notifications,setNotifications]=useState([]);

    const userId=localStorage.getItem("id");

    useEffect(()=>{

        loadNotifications();

    },[]);

    const loadNotifications=async()=>{

    try{

        const res=await axios.get(`${url}notification/${userId}`);

        setNotifications(res.data);
        
        setTimeout(async () => {

            await axios.put(`${url}notification/read/${userId}`);

        }, 2000);


    }

    catch(error){

        console.log(error);

    }

}

    return(
        <>
        <Navbar/>
        <div className="max-w-3xl mx-auto mt-10">
            

            <h1 className="text-3xl font-bold mb-6">

                Notifications

            </h1>

            {

                notifications.length==0 ?

                (

                    <div className="text-center">

                        No Notifications

                    </div>

                )

                :

                notifications.map(notification=>(

                    <div
                        key={notification.id}
                        className="bg-white shadow rounded-lg p-5 mb-4"
                    >

                        <h2 className="text-lg font-bold">

                            {notification.title}

                        </h2>

                        {
                !notification.isRead &&

                <span
                    className="
                        bg-red-500
                        text-white
                        text-xs
                        font-semibold
                        px-2
                        py-1
                        rounded-full
                    "
                >
                    NEW
                </span>
            }

                        <p className="mt-2">

                            {notification.message}

                        </p>

                        <p className="text-sm text-gray-500 mt-3">

                            {

                                new Date(notification.createdAt)
                                .toLocaleString()

                            }

                        </p>

                    </div>

                ))

            }

        </div>
        </>
        

    )

}

export default StudentNotification;