import React, { useState } from "react";
import axios from "axios";
import url from "../lib/url";

const NotificationModal = ({ isOpen, onClose, user }) => {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const sendNotification = async () => {

        try {

            await axios.post(`${url}notification/send`, {

                receiverId: user.id,
                title,
                message

            });

            alert("Notification Sent Successfully");

            setTitle("");
            setMessage("");

            onClose();

        }

        catch (err) {

            console.log(err);

            alert("Something went wrong");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Send Notification
                </h2>

                <p className="mb-4 text-gray-600">

                    To :
                    <span className="font-semibold ml-2">
                        {user.name}
                    </span>

                </p>

                <div className="mb-4">

                    <label className="block mb-2 font-medium">

                        Title

                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border w-full rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Message

                    </label>

                    <textarea
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border w-full rounded-lg p-3"
                    />

                </div>

                <div className="flex justify-end gap-4 mt-6">

                    <button

                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-400 text-white"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={sendNotification}
                        className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"

                    >

                        Send

                    </button>

                </div>

            </div>

        </div>

    );

};

export default NotificationModal;