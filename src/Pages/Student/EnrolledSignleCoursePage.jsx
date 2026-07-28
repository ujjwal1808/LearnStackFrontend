import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import url from '../../lib/url';
import Navbar from '../../Components/Navbar';
import { useNavigate } from "react-router-dom";


const EnrolledSignleCoursePage = () => {
  const [singleChapter, setSingleChapter] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [discussionPost, setDiscussionPost] = useState([]);
  const [message, setMessage] = useState("");

const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

    getData();
    getDiscussionPost();
  }, []);

  const getData = () => {
    // console.log(id);

    axios.get(url + `Chapter/all/chapters/${id}`).then((response) => {
      setSingleChapter(response.data);
      // console.log(response.data);
      // console.log(response.data.title);


    });
  }

  const getDiscussionPost = () => {
    console.log(id)
    axios.get(`${url}discussion/all/discussions/${id}`).then((res) => {
      console.log(res.data);
      setDiscussionPost(res.data);

    })
  }

  const setChapter = (index) => {
    setSelectedChapter(index)
    // console.log(singleChapter[index])
  }

  const handlePost = async () => {

    if (message.trim() === "") {
        alert("Please write something.");
        return;
    }

    const discussion = {

        message: message,

        user: {
            id: localStorage.getItem("id")
        },

        course: {
            id: id
        }

    };

    try {

      console.log(discussion)

        const res = await axios.post(
            `${url}discussion/send`,
            discussion
        );

        console.log(res.data);

        alert("Discussion Posted");

        setMessage("");

        getDiscussionPost();

    }
    catch(err){

        console.log(err);

    }

};

const handleSummary = async () => {



  const res = axios.post("http://localhost:8080/api/ai/summarize", 
    {
    
                 videoUrl:"https://res.cloudinary.com/deu72p04q/video/upload/v1785049985/vidssave.com_What_are_Data_Structures__720P_kzmof2.mp4"
             
    }
  )
    // const response = await fetch(
    //     "http://localhost:8080/api/ai/summarize",
    //     {
    //         method: "POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             videoUrl:singleChapter[selectedChapter]?.videoUrl
    //         })
    //     }
    // );

    

    console.log(res);

}

  return (
    <div >
      <Navbar />
      <hr />
      <main className="max-w-7xl mx-auto w-full flex-grow p-6">

        {/* Video + Chapters */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Chapters */}
          <div className="bg-white rounded-xl shadow p-4 h-[520px] overflow-y-auto">

            <h2 className="text-xl font-bold mb-5">
              Chapters
            </h2>

            <div className="space-y-3">

              {singleChapter.map((chapter, index) => (

                <button
                  key={chapter.id}
                  onClick={() => setChapter(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition

                  ${selectedChapter === index
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-indigo-100"
                    }
                  `}
                >
                  {chapter.title}
                </button>

              ))}

            </div>

          </div>

          {/* Video Player */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              {singleChapter[selectedChapter]?.title}
            </h2>

            <video
              key={singleChapter[selectedChapter]?.id}
              controls
              className="w-full rounded-xl aspect-video bg-black"
            >
              <source
                src={singleChapter[selectedChapter]?.videoUrl}
                type="video/mp4"
              />
            </video>

            <h3 className="text-xl font-bold mt-5">Description</h3>
            <p className="text-gray-700 mt-2">
              {singleChapter[selectedChapter]?.Description}
            </p>
          </div>

        </div>

        {/* <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 mr-2" onClick={handleSummary}>
              summerize chapter
        </button> */}

        <button
    onClick={() =>
        navigate(`/assessment/${id}`)
    }
    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
>
    Start Assessment
</button>



        {/* Discussion Section */}

        <div className="bg-white rounded-xl shadow mt-8 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Discussion
          </h2>

          {/* Write Comment */}

          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a doubt or start a discussion..."
            className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button onClick={handlePost} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Post
          </button>

          {/* Comments */}

          {
            discussionPost.map((post, idx) => {
              return (
                <div className="mt-8 space-y-5">

                  <div className="border rounded-lg p-4">

                    <div className="flex items-center gap-3 mb-2">

                      <img
                        src={post.user.profileImage}
                        alt=""
                        className="rounded-full w-10 h-10"
                      />

                      <div>

                        <h4 className="font-semibold">
                          {post.user.fullName}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {post.user.createdAt.slice(0, 10)}
                        </p>

                      </div>

                    </div>

                    <p>
                      {post.message}
                    </p>

                  </div>


                </div>
              )
            })
          }


        </div>

      </main>

    </div>
  )
}

export default EnrolledSignleCoursePage