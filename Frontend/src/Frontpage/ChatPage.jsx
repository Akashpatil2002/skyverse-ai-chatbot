import { Sparkles, ArrowRight, Play, Users, Zap, Code2, Brain, Trophy, Menu, X, Github, Twitter, Linkedin, Heart, Check, Star, BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import imageaksh from "../assets/DSC_0190.JPG";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { LifeBuoy } from "lucide-react";

export default function ChatPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // FAQ State
    const [openFAQ, setOpenFAQ] = useState(null);

    const pricingPlans = [
        {
            name: "Free",
            price: "0",
            period: "/month",
            desc: "Perfect to try SkyVerse AI",
            features: [
                "50 messages per day",
                "Basic code assistance",
                "Support for 10 languages",
                "Community forum access"
            ],
            buttonText: "Get Started Free",
            popular: false
        },
        {
            name: "Pro",
            price: "99",
            period: "/month",
            desc: "Best for individual developers",
            features: [
                "Unlimited messages",
                "Advanced code generation & debugging",
                "Interview preparation mode",
                "Project builder assistance",
                "Priority support",
                "50+ programming languages"
            ],
            buttonText: "Upgrade to Pro",
            popular: true
        },
        {
            name: "Team",
            price: "499",
            period: "/month",
            desc: "For small teams & startups",
            features: [
                "Everything in Pro",
                "Team workspace & collaboration",
                "Shared projects & knowledge base",
                "Admin dashboard",
                "Custom model fine-tuning (coming soon)",
                "Dedicated support"
            ],
            buttonText: "Contact Sales",
            popular: false
        }
    ];

    // How to Use Steps
    const howToUseSteps = [
        {
            step: "01",
            title: "Sign Up or Log In",
            desc: "Create your free account in seconds. No credit card required."
        },
        {
            step: "02",
            title: "Start a New Chat",
            desc: "Go to the chat interface and describe your coding problem or project idea."
        },
        {
            step: "03",
            title: "Ask Anything",
            desc: "Request code, explanations, debugging help, interview questions, or full project guidance."
        },
        {
            step: "04",
            title: "Get Smart Responses",
            desc: "Receive instant, context-aware answers with code snippets, explanations, and best practices."
        },
        {
            step: "05",
            title: "Iterate & Build",
            desc: "Continue the conversation, refine code, and build your project step by step."
        }
    ];

    // FAQ Data
    const faqs = [
        {
            q: "Is SkyVerse AI really free to start?",
            a: "Yes! You can start with the Free plan which gives you 50 messages per day. No credit card is required."
        },
        {
            q: "Which programming languages does SkyVerse support?",
            a: "SkyVerse currently supports 50+ programming languages including Python, JavaScript, Java, C++, React, Node.js, Go, Rust, and many more."
        },
        {
            q: "Can I use SkyVerse AI for interview preparation?",
            a: "Absolutely! Our Interview Preparation mode includes FAANG-level questions, mock interviews, and detailed performance feedback."
        },
        {
            q: "How secure is my code and data?",
            a: "Your conversations are private and encrypted. We never share your code with third parties."
        },
        {
            q: "Can SkyVerse help me build full projects?",
            a: "Yes. The Project Builder feature guides you through architecture, implementation, testing, and even deployment step-by-step."
        },
        {
            q: "What if I exceed my daily message limit?",
            a: "You can upgrade to Pro anytime for unlimited messages and advanced features."
        }
    ];

    const words = [
        "Superpower",
        "Assistant",
        "Mentor",
        "Copilot",
        "Partner",
        "Booster",
        "Navigator",
        "Companion"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const [openHelp, setOpenHelp] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
            {/* Navbar - Unchanged */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0f1c]/90 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-white" />
                            </motion.div>

                            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                                SkyVerse AI
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={() => navigate("/login")} className="px-6 py-2.5 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-sm font-medium cursor-pointer">
                            Sign In
                        </button>
                        <button onClick={() => navigate("/signup")} className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-indigo-500/30 cursor-pointer">
                            Get Started Free
                        </button>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden border-t border-white/10 bg-[#0a0f1c]/95 backdrop-blur-xl px-5 py-6">
                        <div className="flex flex-col gap-4">
                            <button onClick={() => { navigate("/login"); setIsMenuOpen(false); }} className="w-full py-3 text-center border border-white/20 rounded-2xl hover:bg-white/5">Sign In</button>
                            <button onClick={() => { navigate("/signup"); setIsMenuOpen(false); }} className="w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">Get Started Free</button>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section - Unchanged */}
            <section className="min-h-screen flex items-center justify-center pt-20 pb-16 md:pt-24 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div key={i} className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-400 rounded-full opacity-20"
                            initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                            animate={{ left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`], top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                            transition={{ duration: 20 + Math.random() * 15, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </div>

                <div className="max-w-5xl mx-auto px-5 md:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <div className="inline-flex items-center mt-4 gap-2 px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 mb-8 text-sm">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Public Beta Live Now
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6">
                            Your AI Coding<br className="hidden sm:block" />
                            <span
                                className="inline-block relative h-[1.2em] w-full"
                                style={{ perspective: 1000 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        className="absolute left-1/2 -translate-x-1/2 flex"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={{
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.06
                                                }
                                            },
                                            exit: {
                                                transition: {
                                                    staggerChildren: 0.04,
                                                    staggerDirection: -1
                                                }
                                            }
                                        }}
                                    >
                                        {words[index].split("").map((letter, i) => (
                                            <motion.span
                                                key={i}
                                                variants={{
                                                    hidden: {
                                                        opacity: 0,
                                                        y: -80,
                                                        x: Math.sin(i * 0.8) * 25,
                                                        rotate: -40,
                                                        scale: 0.7
                                                    },
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                        x: 0,
                                                        rotate: 0,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: 80,
                                                        x: Math.sin(i * 0.8) * -25,
                                                        rotate: 40,
                                                        scale: 0.7
                                                    }
                                                }}
                                                transition={{
                                                    duration: 0.7,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
bg-clip-text text-transparent
drop-shadow-[0_0_20px_rgba(139,92,246,0.45)]"
                                            >
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10 md:mb-12">
                            Ask anything about code • Prepare for interviews • Build real projects faster •
                            Get instant intelligent help 24/7 with SkyVerse AI.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                        <button onClick={() => navigate("/signup")} className="w-full sm:w-auto px-10 py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-lg font-semibold flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/40 transition-all active:scale-95 hover:scale-105 cursor-pointer">
                            Start Coding Now 🚀 <ArrowRight />
                        </button>
                        <button onClick={() => navigate("/login")} className="w-full sm:w-auto px-10 py-4 rounded-3xl border border-white/30 hover:bg-white/10 hover:border-white/50 text-lg font-medium transition-all flex items-center justify-center gap-3 cursor-pointer">
                            <Play className="w-5 h-5" /> Watch Demo
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2"><Users className="w-5 h-5 text-indigo-400" /> 15,000+ Developers</div>
                        <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> 10x Faster Development</div>
                        <div>⭐ 4.9/5 from 2,300+ reviews</div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section - Unchanged */}
            <section className="py-20 bg-[#0f1629]">
                <div className="max-w-6xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to code smarter, learn faster, and build better</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <Code2 className="w-8 h-8" />, title: "Smart Code Assistant", desc: "Get instant code suggestions, bug fixes, refactoring, and explanations in 50+ programming languages." },
                            { icon: <Brain className="w-8 h-8" />, title: "Interview Preparation", desc: "Practice real FAANG-level questions with AI feedback, mock interviews, and performance tracking." },
                            { icon: <Trophy className="w-8 h-8" />, title: "Project Builder", desc: "Build full-stack projects step-by-step with guided architecture, best practices, and deployment help." }
                        ].map((feature, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                                className="bg-[#1a2338] p-8 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all group hover:-translate-y-1">
                                <div className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====================== NEW: How to Use Section ====================== */}
            <section className="py-20 bg-[#0a0f1c]">
                <div className="max-w-6xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-indigo-400 mb-4">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Use SkyVerse AI</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Get started in less than 60 seconds. It's that simple.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {howToUseSteps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#1a2338] p-8 rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all group"
                            >
                                <div className="text-5xl font-bold text-indigo-500/30 mb-6 group-hover:text-indigo-500/50 transition-colors">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-10 py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-lg font-semibold flex items-center gap-3 mx-auto transition-all hover:scale-105 cursor-pointer"
                        >
                            Start Using Now <ArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section - Unchanged */}
            <section className="py-20 bg-[#0a0f1c]">
                <div className="max-w-5xl mx-auto px-5 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">About SkyVerse AI</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                SkyVerse AI was born from the frustration of spending hours debugging, searching Stack Overflow, and struggling with complex concepts.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We believe every developer deserves an intelligent companion that understands context, explains concepts clearly, and helps turn ideas into production-ready code faster than ever.
                            </p>
                            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0f1c] overflow-hidden"><img src={`https://i.pravatar.cc/64?u=${i}`} alt="" className="w-full h-full object-cover" /></div>)}
                                </div>
                                <div>Join 15,000+ developers already using SkyVerse</div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-[#1a2338] p-8 rounded-3xl border border-white/10">
                            <div className="space-y-8">
                                {["Lightning-fast responses", "Context-aware assistance", "Multi-language mastery", "Continuous learning from real projects"].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <Check className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-300">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Unchanged */}
            <section className="py-20 bg-[#0f1629]">
                <div className="max-w-6xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Developers</h2>
                        <p className="text-gray-400">Real stories from real builders</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: "Rohan Sharma", role: "SDE @ TCS", text: "SkyVerse helped me crack my Amazon interview in just 3 weeks. The mock sessions are insanely good!", avatar: "https://i.pravatar.cc/150?u=rohan" },
                            { name: "Priya Patel", role: "Freelance Full-Stack", text: "I built and deployed 3 client projects in half the usual time. The project builder feature is a game changer.", avatar: "https://i.pravatar.cc/150?u=priya" },
                            { name: "Vikram Singh", role: "Student @ IIT", text: "As a college student, this tool made learning DSA and system design so much easier and fun!", avatar: "https://i.pravatar.cc/150?u=vikram" }
                        ].map((testimonial, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="bg-[#1a2338] p-8 rounded-3xl border border-white/10">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />)}
                                </div>
                                <p className="text-gray-300 italic mb-8">“{testimonial.text}”</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section - Unchanged */}
            <section className="py-20 bg-[#0a0f1c]">
                <div className="max-w-6xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-gray-400 text-lg">Choose the plan that fits your journey</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-[#1a2338] rounded-3xl p-8 border ${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/30 scale-105' : 'border-white/10'} transition-all`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
                                )}

                                <div className="text-center mb-8">
                                    <div className="text-2xl font-semibold mb-1">{plan.name}</div>
                                    <div className="text-5xl font-bold tracking-tighter">₹{plan.price}<span className="text-xl font-normal text-gray-400">{plan.period}</span></div>
                                    <p className="text-gray-400 mt-3">{plan.desc}</p>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* <button
                                    onClick={() => navigate(plan.popular ? "/signup" : "#")}
                                    className={`w-full py-4 rounded-2xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                                        : 'border border-white/30 hover:bg-white/5'}`}
                                >
                                    {plan.buttonText}
                                </button> */}
                                <button
                                    onClick={() =>
                                        navigate(
                                            plan.name === "Free"
                                                ? "/login"
                                                : plan.name === "Pro"
                                                    ? "/signup"
                                                    : plan.name === "Team"
                                                        ? "/contact-sales"
                                                        : "/"
                                        )
                                    }
                                    className={`w-full py-4 rounded-2xl font-semibold cursor-pointer transition-all ${plan.popular
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                                        : "border border-white/30 hover:bg-white/5"
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>

                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 mt-10 text-sm">All plans include a 14-day free trial of Pro features. Cancel anytime.</p>
                </div>
            </section >

            {/* ====================== NEW: Frequently Asked Questions Section ====================== */}
            < section className="py-20 bg-[#0f1629]" >
                <div className="max-w-4xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-indigo-400 mb-4">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400 text-lg">Everything you need to know about SkyVerse AI</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-[#1a2338] rounded-3xl border border-white/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-white/5 transition-all cursor-pointer"
                                >
                                    <span className="text-lg font-medium pr-8">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-6 h-6 text-gray-400" />
                                    </motion.div>
                                </button>
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: openFAQ === index ? "auto" : 0,
                                        opacity: openFAQ === index ? 1 : 0
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-8 text-gray-400 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Developer Section - Unchanged */}
            < section className="py-20 bg-[#0a0f1c]" >
                <div className="max-w-5xl mx-auto px-5 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-3">Built with ❤️ by</h2>
                        <p className="text-gray-400">Passionate developer from India</p>
                    </div>

                    <div className="flex justify-center">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-[#1a2338] to-[#111827] p-10 md:p-12 rounded-3xl border border-white/10 max-w-md w-full text-center">
                            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-indigo-500/50 mb-6 shadow-2xl">
                                <img src={imageaksh} alt="Akash" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-3xl font-bold mb-1">Akash Sonavane</h3>
                            <p className="text-indigo-400 mb-6">Full Stack Developer & AI Enthusiast</p>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Hi, I'm Akash Sonavane from Dhule, Maharashtra. I built SkyVerse AI to help fellow developers code faster, learn better, and ship projects with confidence.
                            </p>
                            <div className="flex justify-center gap-6 text-gray-400">
                                <a href="https://github.com/Akashpatil2002" className="hover:text-white transition"><Github size={24} /></a>
                                <a href="#" className="hover:text-white transition"><Twitter size={24} /></a>
                                <a href="#" className="hover:text-white transition"><Linkedin size={24} /></a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Final CTA - Unchanged */}
            < section className="py-20 text-center bg-gradient-to-b from-[#0f1629] to-[#0a0f1c]" >
                <div className="max-w-2xl mx-auto px-5">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to take your coding to the next level?</h2>
                    <p className="text-gray-400 text-lg mb-10">Join thousands of developers who are already using SkyVerse AI every day</p>
                    <button onClick={() => navigate("/signup")} className="px-12 py-5 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xl font-semibold hover:scale-105 transition-all shadow-2xl shadow-purple-600/40 cursor-pointer">
                        Start Free Today — No Credit Card Needed
                    </button>
                </div>
            </section >

            {/* Footer - Unchanged */}
            < footer className="bg-[#080c17] border-t border-white/10 py-16" >
                <div className="max-w-7xl mx-auto px-5 md:px-8">
                    <div className="grid md:grid-cols-4 gap-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl"><Sparkles className="w-6 h-6" /></div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">SkyVerse AI</span>
                            </div>
                            <p className="text-gray-400 max-w-xs">Your intelligent AI coding assistant. Built with passion in India.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-5 text-lg">Product</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Demo</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-5 text-lg">Company</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-5 text-lg">Legal</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <div>© 2026 SkyVerse AI. Made with <Heart className="inline w-4 h-4 text-red-500" /> in Maharashtra, India</div>
                        <div>Built by Akash Sonavane</div>
                    </div>
                </div>
            </footer >


            {/* Help Center */}
            <div className="fixed bottom-6 right-6 z-50">

                {/* Pulse Ring */}
                <span className="absolute inline-flex h-14 w-14 rounded-full bg-indigo-500 opacity-40 animate-ping"></span>

                {/* Floating Button */}
                <motion.button
                    onClick={() => setOpenHelp(!openHelp)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center
    h-14 w-14 rounded-full
    bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
    text-white shadow-2xl hover:shadow-purple-500/40"
                >
                    {openHelp ? <X size={24} /> : <LifeBuoy size={26} />}
                </motion.button>

                {/* Popup Help Panel */}
                <AnimatePresence>
                    {openHelp && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.9 }}
                            transition={{ duration: 0.35 }}
                            className="absolute bottom-20 right-0 w-80
        bg-black/80 backdrop-blur-xl
        border border-white/10
        rounded-2xl shadow-2xl p-5 text-white"
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                Need Help?
                            </h3>

                            <p className="text-sm text-gray-300 mb-4">
                                Ask anything about SkyVerse AI. We're here to help you 🚀
                            </p>

                            <button
                                onClick={() => navigate("/demo")}
                                className="w-full py-2 rounded-xl
  bg-gradient-to-r from-indigo-600 to-purple-600
  hover:opacity-90"
                            >
                                Open Support Chat
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div >


    );
}

