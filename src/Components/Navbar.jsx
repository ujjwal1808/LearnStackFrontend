import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, X, LayoutDashboard, BookOpen, Compass, UserRound } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Logo from '../../src/assets/Logo.png'
import url from '../lib/url'

const Navbar = ({ profileImage }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const userId = localStorage.getItem('id')
  const name = localStorage.getItem('name') || 'Student'
  const storedImage = profileImage || localStorage.getItem('profilePicture')
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    if (!userId) return
    axios.get(`${url}notification/count/${userId}`)
      .then((res) => setUnreadCount(Number(res.data) || 0))
      .catch(() => {})
  }, [userId])

  const handleLogout = () => {
    ;['token', 'user', 'role', 'name', 'id', 'profilePicture'].forEach((key) => localStorage.removeItem(key))
    toast.success('You have been logged out')
    navigate('/login', { replace: true })
  }

  const navItems = [
    { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Explore Courses', to: '/student/explore-course', icon: Compass },
    { label: 'My Learning', to: '/student/enrolled-course', icon: BookOpen },
  ]

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-white/10 text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link to="/student/dashboard" className="shrink-0 transition hover:opacity-90">
            <img src={Logo} alt="LearnStack" className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ label, to, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    active ? 'bg-white/12 text-white shadow-inner' : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/student/notifications"
              className="relative rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-900">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-white/10"
              >
                {storedImage ? (
                  <img src={storedImage} alt={name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white/20" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold">
                    {initials}
                  </span>
                )}
                <span className="hidden max-w-28 truncate text-sm font-semibold md:block">{name}</span>
                <ChevronDown size={15} className={`transition ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="animate-scaleIn absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-800 shadow-2xl">
                  <Link to="/student/profile-page" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-slate-50">
                    <UserRound size={17} /> My Profile
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                    <LogOut size={17} /> Log out
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setMenuOpen((value) => !value)} className="rounded-xl p-2.5 text-slate-300 hover:bg-white/10 lg:hidden">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="animate-fadeIn border-t border-white/10 py-3 lg:hidden">
            <div className="grid gap-1">
              {navItems.map(({ label, to, icon: Icon }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">
                  <Icon size={18} /> {label}
                </Link>
              ))}
              <Link to="/student/profile-page" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white">
                <UserRound size={18} /> My Profile
              </Link>
              <button onClick={handleLogout} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-rose-300 hover:bg-rose-500/10">
                <LogOut size={18} /> Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
