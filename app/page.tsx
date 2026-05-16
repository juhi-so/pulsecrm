"use client";

import React,{ useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PulseCRMFrontend() {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { error } = await supabase
    .from("leads")
    .insert([
      {
        name,
        email,
        company,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Something went wrong");
  } else {

    await fetch(
       //"http://localhost:5678/webhook-test/e2bc60c2-443b-4683-a757-9d3ef0e7bb81",
      "http://localhost:5678/webhook/e2bc60c2-443b-4683-a757-9d3ef0e7bb81",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
        }),
      }
    );

    alert("Lead captured successfully!");

    setName("");
    setEmail("");
    setCompany("");
  }
};


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const theme = darkMode
    ? {
        bg: "bg-[#050816] text-white",
        card: "bg-white/5 border border-white/10",
        secondary: "text-gray-400",
        glow: "from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20",
      }
    : {
        bg: "bg-[#f5f7ff] text-black",
        card: "bg-white border border-black/5 shadow-xl shadow-black/5",
        secondary: "text-gray-600",
        glow: "from-violet-200 via-pink-100 to-cyan-100",
      };

  const leads = [
    {
      name: "Aarav Sharma",
      company: "Nova AI",
      status: "Hot",
    },
    {
      name: "Riya Kapoor",
      company: "ScaleX",
      status: "Warm",
    },
    {
      name: "Karan Mehta",
      company: "ByteFlow",
      status: "Cold",
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-hidden transition-all duration-500 ${theme.bg}`}
    >
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl bg-gradient-to-r ${theme.glow} animate-pulse`}
        />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-xl border-b px-8 md:px-20 py-5 flex items-center justify-between ${
          darkMode
            ? "bg-black/30 border-white/10"
            : "bg-white/70 border-black/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <h1 className="text-2xl font-bold tracking-tight">PulseCRM</h1>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a href="#features" className="hover:text-violet-500 transition">
            Features
          </a>
          <a href="#dashboard" className="hover:text-violet-500 transition">
            Dashboard
          </a>
          <a href="#automation" className="hover:text-violet-500 transition">
            Automation
          </a>
          <a href="#contact" className="hover:text-violet-500 transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-16 h-9 rounded-full transition-all duration-300 ${
              darkMode ? "bg-violet-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-7 h-7 rounded-full bg-white transition-all duration-300 ${
                darkMode ? "left-8" : "left-1"
              }`}
            />
          </button>

          <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-2xl font-semibold shadow-2xl shadow-violet-500/30">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 md:px-20 py-28 grid lg:grid-cols-2 gap-20 items-center">
        <div className="animate-[fadeIn_1s_ease]">
          <div
            className={`inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm mb-8 ${theme.card}`}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            AI-Powered • Smart • Automated
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight">
            The AI CRM
            <br />
            built for
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {" "}modern teams
            </span>
          </h1>

          <p
            className={`mt-8 text-lg leading-relaxed max-w-xl ${theme.secondary}`}
          >
            Capture leads, automate follow-ups, manage pipelines,
            and close deals faster with the power of AI automation.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-violet-500/30">
              Start Free Trial
            </button>

            <button
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${theme.card}`}
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          className={`relative rounded-[40px] p-6 backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition-all duration-500 ${theme.card}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10" />

          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Total Leads", value: "1,250" },
                { title: "Open Deals", value: "134" },
                { title: "Revenue", value: "₹4.25L" },
                { title: "Conversion", value: "24.6%" },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-3xl p-5 hover:-translate-y-2 transition-all duration-500 ${theme.card}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className={`text-sm ${theme.secondary}`}>
                    {item.title}
                  </p>
                  <h3 className="text-4xl font-bold mt-3">
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 rounded-3xl p-6 h-[260px] flex flex-col justify-between ${theme.card}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Lead Overview</h3>
                <div className="text-green-400 text-sm">+18.7%</div>
              </div>

              <div className="flex items-end justify-between h-full gap-3 mt-6">
                {[40, 80, 60, 120, 90, 150, 200].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-3xl bg-gradient-to-t from-violet-600 to-fuchsia-500 hover:scale-y-110 transition-all duration-500"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 md:px-20 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Everything you need to grow
          </h2>

          <p className={`mt-5 text-lg ${theme.secondary}`}>
            AI-first CRM workflows for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
  {
    title: "AI Lead Scoring",
    desc: "Every lead gets an instant Hot, Warm, or Cold score based on behavior, company size, and source channel.",
    icon: "🧠",
  },
  {
    title: "Smart Follow-ups",
    desc: "Trigger personalized email sequences automatically when a lead takes an action or enters a pipeline stage.",
    icon: "⚡",
  },
  {
    title: "Pipeline Tracking",
    desc: "Visual Kanban board with drag-and-drop stages. See where every deal stands in real time.",
    icon: "📊",
  },
  {
    title: "Workflow Automation",
    desc: "Build no-code automation flows. When a lead signs up, assign rep, send email, create task — instantly.",
    icon: "🔄",
  },
  {
    title: "Team Collaboration",
    desc: "Share notes, assign tasks, mention teammates, and sync on deals — all inside the lead timeline.",
    icon: "👥",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track conversion rates, top channels, team performance, and revenue trends with live charts.",
    icon: "📈",
  },
].map((feature, index) => (
            <div
              key={feature.title}
              className={`group rounded-[32px] p-8 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 ${theme.card}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/10 backdrop-blur-xl mb-6 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/10 group-hover:rotate-6 transition-all duration-500">
  {feature.icon}
</div>

              <h3 className="text-2xl font-bold">
  {feature.title}
</h3>

              <p className={`mt-4 leading-relaxed text-[15px] ${theme.secondary}`}>
  {feature.desc}
</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="px-8 md:px-20 py-24">
        <div
          className={`rounded-[40px] p-8 overflow-hidden ${theme.card}`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[260px]">
              <div className="space-y-4">
                {[
                  "Dashboard",
                  "Leads",
                  "Pipeline",
                  "Automations",
                  "Analytics",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      i === 0
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                        : darkMode
                        ? "hover:bg-white/5"
                        : "hover:bg-black/5"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold">
                    Good morning, Aarav 👋
                  </h2>
                  <p className={`mt-2 ${theme.secondary}`}>
                    Here’s what’s happening with your sales today.
                  </p>
                </div>

                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
                  + Add Deal
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {leads.map((lead) => (
                  <div
                    key={lead.name}
                    className={`rounded-3xl p-6 hover:-translate-y-2 transition-all duration-500 ${theme.card}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">
                          {lead.name}
                        </h3>
                        <p className={`mt-1 ${theme.secondary}`}>
                          {lead.company}
                        </p>
                      </div>

                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          lead.status === "Hot"
                            ? "bg-red-500/20 text-red-400"
                            : lead.status === "Warm"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-cyan-500/20 text-cyan-400"
                        }`}
                      >
                        {lead.status}
                      </div>
                    </div>

                    <div
                      className={`mt-6 h-2 rounded-full overflow-hidden ${
                        darkMode ? "bg-white/10" : "bg-black/10"
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Advanced Automation Workflow */}
<section id="automation" className="px-8 md:px-20 py-32">
  <div className="grid lg:grid-cols-2 gap-24 items-center">
    
    {/* LEFT CONTENT */}
    <div>
      <div className="text-violet-400 font-semibold tracking-wide uppercase mb-6">
        Workflow Automation
      </div>

      <h2 className="text-6xl md:text-7xl font-black leading-[0.95]">
        Set it once,
        <br />
        run forever.
      </h2>

      <p
        className={`mt-8 text-xl leading-relaxed max-w-xl ${theme.secondary}`}
      >
        Build powerful no-code workflows that trigger the
        moment a lead takes action. Your team focuses on
        selling, NexCRM handles the rest.
      </p>

      {/* STATS */}
      <div className="flex flex-wrap gap-12 mt-14">
        <div>
          <div className="text-5xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            3x
          </div>

          <div className={`mt-2 ${theme.secondary}`}>
            Faster follow-up
          </div>
        </div>

        <div>
          <div className="text-5xl font-black text-green-400">
            40%
          </div>

          <div className={`mt-2 ${theme.secondary}`}>
            More conversions
          </div>
        </div>

        <div>
          <div className="text-5xl font-black text-cyan-400">
            8h
          </div>

          <div className={`mt-2 ${theme.secondary}`}>
            Saved per week
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT WORKFLOW */}
    <div className="relative">
      <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 flex flex-col items-center">
        
        {[
          {
            title: "Lead Submits Form",
            desc: "Trigger fires instantly",
            icon: "📝",
          },
          {
            title: "AI Generates Email",
            desc: "Personalized welcome sent",
            icon: "📧",
          },
          {
            title: "Rep Auto-Assigned",
            desc: "Based on territory & workload",
            icon: "👤",
          },
          {
            title: "Follow-up Task Created",
            desc: "Reminder set for 48 hours",
            icon: "✅",
          },
          {
            title: "Slack Notification Sent",
            desc: "Team alerted in real time",
            icon: "🔔",
          },
        ].map((step, index) => (
          <div
            key={step.title}
            className="w-full flex flex-col items-center"
          >
            <div
              className={`w-full max-w-md rounded-[28px] px-8 py-6 flex items-center gap-5 transition-all duration-500 hover:scale-[1.03] ${
                index === 4
                  ? "border border-violet-500 shadow-2xl shadow-violet-500/20"
                  : ""
              } ${theme.card}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-2xl">
                {step.icon}
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p className={`mt-1 ${theme.secondary}`}>
                  {step.desc}
                </p>
              </div>
            </div>

            {index !== 4 && (
              <div className="h-16 w-[2px] bg-gradient-to-b from-violet-500 to-cyan-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* AI Assistant */}
<section className="px-8 md:px-20 py-24">
  <div className="grid lg:grid-cols-2 gap-20 items-center">
    
    <div>
      <div className="text-violet-400 font-semibold mb-5">
        AI-POWERED INTELLIGENCE
      </div>

      <h2 className="text-6xl font-black leading-[0.95]">
        Your AI sales
        <br />
        assistant, built
        <br />
        in.
      </h2>

      <p className={`mt-8 text-lg leading-relaxed ${theme.secondary}`}>
        NexCRM’s AI writes emails, scores leads,
        predicts conversions, and automates your
        entire sales workflow.
      </p>

      <div className="space-y-8 mt-12">
        {[
          {
            title: "Lead Scoring Engine",
            desc: "ML model scores every lead using 20+ buying signals.",
            icon: "🔥",
          },
          {
            title: "Email Generator",
            desc: "Generate personalized follow-up emails instantly.",
            icon: "✍️",
          },
          {
            title: "Natural Language Search",
            desc: "Search your CRM like ChatGPT.",
            icon: "🔍",
          },
          {
            title: "Meeting Summarizer",
            desc: "AI-generated meeting notes and action items.",
            icon: "📄",
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-5">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center text-2xl">
              {item.icon}
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className={`mt-2 ${theme.secondary}`}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* AI Chat UI */}
    <div
      className={`rounded-[32px] overflow-hidden border ${theme.card}`}
    >
      <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-400"></div>

        <h3 className="font-bold">
          AI Assistant — NexCRM
        </h3>
      </div>

      <div className="p-6 space-y-6 h-[500px] overflow-hidden">
        
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
            ✨
          </div>

          <div className="max-w-[75%] rounded-3xl rounded-tl-md bg-white/5 p-5">
            Hi! I can score leads, write emails,
            or search your CRM.
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-3xl rounded-tr-md bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5">
            Write a follow-up email for Aarav Shah
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
            ✨
          </div>

          <div className="max-w-[75%] rounded-3xl rounded-tl-md bg-white/5 p-5 leading-relaxed">
            Subject: Quick follow-up — NexCRM
            <br />
            <br />
            Hi Aarav,
            <br />
            Loved connecting with you earlier...
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-white/10 flex gap-4">
        <input
          placeholder="Ask anything about your leads..."
          className={`flex-1 px-5 py-4 rounded-2xl outline-none ${theme.card}`}
        />

        <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 rounded-2xl font-semibold">
          Send
        </button>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="px-8 md:px-20 py-24">
  <div className="max-w-5xl mx-auto">
    
    <div className="text-center mb-16">
      <div className="text-violet-400 font-semibold mb-5">
        FAQ
      </div>

      <h2 className="text-6xl font-black leading-[0.95]">
        Questions?
        <br />
        We have answers.
      </h2>
    </div>

    <div className="space-y-5">
      {[
        {
          q: "What is NexCRM and how is it different?",
          a: "NexCRM is an AI-powered CRM platform built for modern sales teams and startups. Unlike traditional CRMs like Salesforce that require weeks of setup, NexCRM is live in minutes and uses AI to score leads, write emails, and automate follow-ups out of the box.",
        },
        {
          q: "How does AI lead scoring work?",
          a: "Our AI analyzes 20+ signals: email open rate, reply rate, company size, funding stage, job title seniority, website visits, source channel, and more. Each lead is scored 0–100 and categorized as Hot, Warm, or Cold — automatically updated as behavior changes.",
        },
        {
          q: "Can I import my existing leads?",
          a: "Yes! NexCRM supports CSV import, LinkedIn Sales Navigator export, HubSpot migration, and API integrations. You can have your existing contacts imported and scored within minutes of signing up.",
        },
        {
          q: "Is my data secure?",
          a: "Absolutely. NexCRM is SOC 2 Type II compliant, uses AES-256 encryption at rest, TLS 1.3 in transit, and is hosted on AWS with 99.99% uptime SLA. Enterprise plans include SSO, SAML, and dedicated data regions.",
        },
      ].map((faq, index) => (
        <details
          key={index}
          className={`rounded-3xl p-8 cursor-pointer ${theme.card}`}
        >
          <summary className="text-xl font-bold">
            {faq.q}
          </summary>

          <p className={`mt-6 leading-relaxed ${theme.secondary}`}>
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>

      {/* CTA */}
      <section id="contact" className="px-8 md:px-20 py-24">
        <div
          className={`max-w-5xl mx-auto rounded-[50px] p-12 text-center relative overflow-hidden ${theme.card}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10" />

          <div className="relative z-10">
            <h2 className="text-6xl font-black leading-tight">
              Ready to transform
              <br />
              your sales?
            </h2>

            <p className={`mt-6 text-lg ${theme.secondary}`}>
              Capture leads, automate workflows, and close deals faster.
            </p>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
             <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className={`px-6 py-5 rounded-2xl outline-none backdrop-blur-xl ${theme.card}`}
/>

             <input
  type="email"
  placeholder="Work Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className={`px-6 py-5 rounded-2xl outline-none backdrop-blur-xl ${theme.card}`}
/>
<input
  type="text"
  placeholder="Company"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
  className={`px-6 py-5 rounded-2xl outline-none backdrop-blur-xl ${theme.card}`}
/>

              <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.03] transition-all duration-300 rounded-2xl font-semibold shadow-2xl shadow-violet-500/30">
                Start Free Trial
              </button>
            </form>
          </div>
        </div>
      </section>
  

    
{/* Footer */}
<footer className="px-8 md:px-20 py-20 border-t border-white/10">
  <div className="grid md:grid-cols-4 gap-10">
    
    <div>
      <h2 className="text-4xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
        NexCRM
      </h2>

      <p className={`mt-6 leading-relaxed ${theme.secondary}`}>
        The AI-powered CRM built for modern
        sales teams.
      </p>
    </div>

    {[
      {
        title: "Product",
        links: ["Features", "Pipeline", "AI Tools", "Demo"],
      },
      {
        title: "Company",
        links: ["About", "Blog", "Careers", "Contact"],
      },
      {
        title: "Resources",
        links: ["Documentation", "API", "FAQ", "Status"],
      },
    ].map((group) => (
      <div key={group.title}>
        <h3 className="font-bold text-lg mb-5">
          {group.title}
        </h3>

        <div className="space-y-4">
          {group.links.map((link) => (
            <div
              key={link}
              className={`hover:text-violet-400 cursor-pointer transition ${theme.secondary}`}
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</footer>
  </div>
  );
}
