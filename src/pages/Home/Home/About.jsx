import React from "react";
import {
  FaTruck,
  FaGlobe,
  FaUsers,
  FaShieldAlt,
  FaAward,
  FaHeadset,
  FaRocket,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { id: 1, label: "Districts Covered", value: "64", icon: <FaGlobe /> },
    { id: 2, label: "Happy Clients", value: "100K+", icon: <FaUsers /> },
    { id: 3, label: "Deliveries", value: "1M+", icon: <FaTruck /> },
    { id: 4, label: "Safety", value: "100%", icon: <FaShieldAlt /> },
  ];

  const coreValues = [
    {
      title: "Reliability",
      desc: "We treat every parcel like it's our own, ensuring it reaches its destination safely.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Innovation",
      desc: "Using AI and smart logistics to redefine the traditional courier experience.",
      icon: <FaLightbulb />,
    },
    {
      title: "Speed",
      desc: "Time is money. Our network is optimized for the fastest possible delivery routes.",
      icon: <FaRocket />,
    },
    {
      title: "Customer First",
      desc: "Our support team is always ready to go the extra mile for your satisfaction.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* --- Modern Hero Section (Typography Focused) --- */}
      <div className="relative bg-[#0F172A] py-32 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase border border-indigo-400/30 rounded-md bg-indigo-400/5">
            Legacy of Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight">
            The Future of <br />
            <span className="text-indigo-500">Logistics</span> is Here.
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
            Building the nation's most trusted delivery network since 1992. Reliable. Fast.
            Everywhere.
          </p>
        </div>
      </div>

      {/* --- Core Values Section (No Image, Grid Focused) --- */}
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">
              Core Values
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              What Drives Our Business Forward
            </h3>
            <p className="text-slate-500 text-lg">
              Our culture is built on trust and transparency. We don't just move boxes; we move
              businesses.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-sm mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Dark Stats Section (Minimalist) --- */}
      <div className="bg-[#0F172A] py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <h3 className="text-5xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Strengths (Icon Cards) --- */}
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-slate-900">Why Everyone Trusts Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Sorting",
              desc: "Automated sorting for 99.9% accuracy.",
              icon: <FaTruck />,
            },
            {
              title: "Live Tracking",
              desc: "Minute-by-minute updates on your app.",
              icon: <FaGlobe />,
            },
            {
              title: "24/7 Support",
              desc: "We're here whenever you need us.",
              icon: <FaHeadset />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-1 bg-gradient-to-b from-indigo-100 to-transparent rounded-[2.5rem]"
            >
              <div className="bg-white p-10 rounded-[2.4rem] h-full text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Premium CTA Section --- */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Let's Get Your <br /> Goods Moving.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
                Create Shipments
              </button>
              <button className="bg-indigo-700 text-white border border-indigo-400 px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-800 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
