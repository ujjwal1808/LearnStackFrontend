import React, { useState } from 'react'

import { Eye, EyeOff, ArrowRight, BookOpen, ShieldCheck, Sparkles, LoaderCircle  } from "lucide-react";
// import { Eye, EyeOff} from "lucide-react";

import axios from 'axios';
import url from '../../lib/url';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {


  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role:"",
  });

   const notifySuccessProfileUpdated = () => toast('Successfully Registered! Now you can login', {icon: '✅', style: {
      borderRadius: '10px',
      background: '#00d115',
      color: '#010101',
    },});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    axios.post(`${url}users/register`, user).then((res)=>{
      console.log(res.data);
      notifySuccessProfileUpdated();
      navigate('/login');
    })
  };



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            LearnStack
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={user.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Role */}

          <div>
  <label className="block mb-2 font-medium">
    Role
  </label>

  <select
    name="role"
    value={user.role}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    required
  >
    <option value="" disable>Who are you</option>
    <option value="STUDENT">Student</option>
    <option value="INSTRUCTOR">Instructor</option>
  </select>
</div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* Register Button */}

          {/* <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button> */}

          <button type="submit" disabled={loading} className="btn-primary h-13 w-full">
                {loading ? <><LoaderCircle className="animate-spin" size={19} /> Registering </> : <>Register <ArrowRight size={18} /></>}
              </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-500">
            Already have an account?
            <a
              href="/login"
              className="text-indigo-600 font-semibold ml-2 hover:underline"
            >
              Login
            </a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default SignUp
