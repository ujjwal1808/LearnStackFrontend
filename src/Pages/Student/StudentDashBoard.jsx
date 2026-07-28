import React from 'react'
import { ArrowRight, BookOpen, Clock3, Flame, PlayCircle, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar'

const StudentDashBoard = () => {
  const name = localStorage.getItem('name') || 'Student'
  const firstName = name.split(' ')[0]

  const stats = [
    { label: 'Courses enrolled', value: '08', icon: BookOpen, tone: 'indigo' },
    { label: 'Hours learned', value: '24.5h', icon: Clock3, tone: 'sky' },
    { label: 'Current streak', value: '12 days', icon: Flame, tone: 'orange' },
    { label: 'Avg. progress', value: '68%', icon: TrendingUp, tone: 'emerald' },
  ]

  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="animate-fadeIn relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-indigo-950/10 sm:px-10 sm:py-10">
          <div className="absolute -right-24 -top-40 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-44 left-1/3 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-indigo-200">
                <Sparkles size={14} /> Your learning dashboard
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Good to see you, {firstName} 👋</h1>
              <p className="mt-3 max-w-xl text-slate-300">Keep your momentum going. You are making progress every time you show up.</p>
            </div>
            <Link to="/student/explore-course" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50">
              Explore new courses <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="card card-hover rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
                </div>
                <div className={`rounded-xl p-3 ${tone === 'indigo' ? 'bg-indigo-50 text-indigo-600' : tone === 'sky' ? 'bg-sky-50 text-sky-600' : tone === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  <Icon size={21} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <div className="card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">Continue learning</p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">Pick up where you left off</h2>
              </div>
              <Link to="/student/enrolled-course" className="hidden items-center gap-1 text-sm font-bold text-indigo-600 sm:flex">View all <ArrowRight size={15} /></Link>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 sm:w-44">
                  <PlayCircle size={42} className="text-white/90" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">In progress</span>
                  <h3 className="mt-2 truncate text-xl font-black text-slate-900">Mastering Full Stack Development</h3>
                  <p className="mt-2 text-sm text-slate-500">Chapter 6 · Building secure authentication</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" /></div>
                    <span className="text-sm font-black text-slate-700">68%</span>
                  </div>
                </div>
                <Link to="/student/enrolled-course" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600">
                  Continue <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600"><Target size={21} /></div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Weekly goal</p>
                <h2 className="text-xl font-black text-slate-900">Stay consistent</h2>
              </div>
            </div>
            <div className="mt-7 flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#6366f1 0 72%, #e2e8f0 72% 100%)' }}>
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-black text-slate-900">72%</span>
                  <span className="text-xs font-medium text-slate-500">completed</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-6 text-slate-500">You are ahead of your weekly pace. One more focused session can keep your streak alive.</p>
          </div>
        </section>

        <section className="mt-8 card rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Recommended for you</h2>
              <p className="mt-1 text-sm text-slate-500">Build your next skill with a focused learning path.</p>
            </div>
            <Link to="/student/explore-course" className="hidden items-center gap-1 text-sm font-bold text-indigo-600 sm:flex">Explore <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['React & Modern Frontend', 'Spring Boot Mastery', 'Data Structures & Algorithms'].map((title, index) => (
              <div key={title} className="card-hover rounded-2xl border border-slate-200 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${index === 0 ? 'bg-cyan-50 text-cyan-600' : index === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'}`}>
                  <BookOpen size={21} />
                </div>
                <h3 className="mt-4 font-black text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-500">Practical lessons, structured chapters, and progress you can track.</p>
                <Link to="/student/explore-course" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">View course <ArrowRight size={15} /></Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default StudentDashBoard
