import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, BookOpen, ShieldCheck, Sparkles, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import applicationContext from "../../context/Context";
import Logo from "../../assets/Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(applicationContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users/login", formData);
      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.fullName);
      localStorage.setItem("id", user.id);
      localStorage.setItem("profilePicture", user.profileImage || "");
      setUser(user);

      toast.success(`Welcome back, ${user.fullName?.split(" ")[0] || "there"}!`);

      if (user.role === "STUDENT") navigate("/student/dashboard", { replace: true });
      else if (user.role === "INSTRUCTOR") navigate("/instructor/dashboard", { replace: true });
      else if (user.role === "ADMIN") navigate("/admin/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || (err.response ? "Invalid credentials" : "Unable to connect to server");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-2xl shadow-slate-900/10 backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative">
            <img src={Logo} alt="LearnStack" className="h-10 w-auto" />
            <div className="mt-24 max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-indigo-200">
                <Sparkles size={14} /> Learn smarter. Grow faster.
              </div>
              <h1 className="text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
                Your next skill is closer than you think.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
                Learn from structured courses, track your progress, and build the confidence to create something remarkable.
              </p>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <BookOpen className="mb-3 text-indigo-300" size={22} />
              <p className="text-sm font-semibold">Structured learning</p>
              <p className="mt-1 text-xs text-slate-400">Learn at your own pace.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="mb-3 text-emerald-300" size={22} />
              <p className="text-sm font-semibold">Progress that matters</p>
              <p className="mt-1 text-xs text-slate-400">Keep every milestone visible.</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md animate-fadeIn">
            <div className="mb-8 lg:hidden">
              <img src={Logo} alt="LearnStack" className="h-9 w-auto" />
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Welcome back</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Sign in to continue</h2>
              <p className="mt-3 text-slate-500">Access your courses, progress, and learning journey.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className="input-modern" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</button>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" className="input-modern pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary h-13 w-full">
                {loading ? <><LoaderCircle className="animate-spin" size={19} /> Signing you in...</> : <>Sign in <ArrowRight size={18} /></>}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
