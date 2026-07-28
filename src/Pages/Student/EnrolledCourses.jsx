import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios';
import url from '../../lib/url';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {

  const [enrolledCourses, setEnrolledCourses] = React.useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = () => {
    console.log(localStorage.getItem("id"));
    
    axios.get(url+`enrollcourse/enrolled-course/${localStorage.getItem("id")}`).then((response) => {
      setEnrolledCourses(response.data);

      console.log(response.data);
      
    });

  }
  return (
    <>
    <div className="min-h-screen flex flex-col">
    <Navbar/>
     <hr />
    <div className='grid grid-cols-3 gap-4 m-4'>
        {
          enrolledCourses.map((c) => (
            <div key={c.id} className='border border-gray-300 p-4 rounded shadow-md' >
              <img src="src/assets/hero.png" alt=""  width={400}/>
              <h2 className='text-lg font-semibold mb-2'>{c.course.title}</h2>
              <p className='text-gray-600 mb-2'>{c.course.description}</p>
              <button>

              <Link to={`/student/enrolled-course/content/${c.course.id}`} >open</Link>
              </button>
            </div>
          ))
        }
      </div>
      </div>
    </>
  )
}

export default EnrolledCourses