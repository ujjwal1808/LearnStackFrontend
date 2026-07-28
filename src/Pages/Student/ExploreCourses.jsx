import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import url from '../../lib/url';
import { useContext } from 'react';
import applicationContext from '../../context/Context';
import Navbar from '../../Components/Navbar';

const ExploreCourses = () => {
  const[courses, setCourses] = useState([])
  const {setCourse} = useContext(applicationContext);

  useEffect(() => {
    getData();
  },[]);

  const getData = () => {
    axios.get(url+"course/all/courses").then((response) => {
      setCourses(response.data);
      console.log(courses);

    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className='grid grid-cols-3 gap-4 m-4'>
        {
          courses.map((c) => (
            c.status == "ACTIVE" ? 
            <div key={c.id} className='border border-gray-300 p-4 rounded shadow-md' >
              <img src={c.thumbnail} alt=""  width={400}/>
              <h2 className='text-lg font-semibold mb-2'>{c.title}</h2>
              <p className='text-gray-600 mb-2'>{c.description}</p>
              <p className='text-gray-800 font-medium'>Price: ₹{c.price}</p>
              <button>

              <Link to={`/student/course/${c.id}`}>Explore</Link>
              </button>
            </div> 
            :
            ""
          ))
        }
      </div>
    </div>
  )
}

export default ExploreCourses