'use client';
import { Button } from "@heroui/react";
import { IoIosSend } from "react-icons/io";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";

const Contact = () => {

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());
//   console.log(userData);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      toast.success("Message sent successfully to MongoDB! 🎉");
      e.target.reset(); 
    } else {
      alert(`Failed to send message: ${result.error || 'Unknown error'}`);
    }
  } catch (error) {

    toast.error("Connection failed! Something went wrong.");
  }
};

  

  return (
    <div id="contact" className="bg-white py-20 px-6 border-t border-slate-50">
      {/* প্রধান লেআউট কনটেইনার */}
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* সেকশন হেডার */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Get In Touch</h2>
          <p className="text-sm text-slate-400 font-medium">Contact Me</p>
        </div>

        {/* 💡 রেসপন্সিভ গ্রিড: ডেক্সটপে পাশাপাশি ২ কলাম, মোবাইলে ওপর-নিচ ১ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-4">
          
          {/* ১. বাম পাশের কলাম: কন্টাক্ট ইনফরমেশন কার্ডস */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-700 mb-6 text-center md:text-left">Talk to me</h3>
            
            {/* ইমেইল কার্ড */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-4">
              <div className="p-3.5 bg-cyan-50 text-cyan-600 rounded-2xl text-xl">
                <FiMail />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Email</p>
                <a href="mailto:youremail@gmail.com" className="text-sm font-bold text-slate-700 hover:text-cyan-500 transition">
                  youremail@gmail.com
                </a>
              </div>
            </div>

            {/* ফোন/হোয়াটসঅ্যাপ কার্ড */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-4">
              <div className="p-3.5 bg-green-50 text-green-600 rounded-2xl text-xl">
                <FiPhone />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Phone / WhatsApp</p>
                <a href="tel:+880123456789" className="text-sm font-bold text-slate-700 hover:text-green-500 transition">
                  +880 1234-56789
                </a>
              </div>
            </div>

            {/* লোকেশন কার্ড */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-4">
              <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl text-xl">
                <FiMapPin />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Location</p>
                <p className="text-sm font-bold text-slate-700 tracking-wide">
                  Mymensingh, Bangladesh
                </p>
              </div>
            </div>

          </div>

          {/* ২. ডান পাশের কলাম: ইন্টারেক্টিভ কন্টাক্ট ফর্ম */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-700 mb-6 text-center md:text-left">Write me your message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* নাম ইনপুট */}
              <div className="relative">
                <input 
                  type="text" 
                  required
                  name="username"
                //   value={formData.name}
                  placeholder="Insert your name" 
                  className="w-full bg-slate-50/50 border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-cyan-500 focus:bg-white transition duration-200"
                />
              </div>

              {/* ইমেইল ইনপুট */}
              <div className="relative">
                <input 
                  type="email" 
                  required
                  name="useremail"
                //   value={formData.email}
                  placeholder="Insert your email" 
                  className="w-full bg-slate-50/50 border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-cyan-500 focus:bg-white transition duration-200"
                />
              </div>

              {/* মেসেজ টেক্সট-এরিয়া */}
              <div className="relative">
                <textarea 
                  rows="5" 
                  required
                  name="usermessage"
                //   value={formData.message}
                  placeholder="Write your message here" 
                  className="w-full bg-slate-50/50 border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-cyan-500 focus:bg-white transition duration-200 resize-none"
                ></textarea>
              </div>

              {/* 💡 আপনার প্রিয় HeroUI বাটনের নিখুঁত কোড ডিজাইন */}
              <Button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-sm px-8 py-6 rounded-2xl shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                Send Message
                <IoIosSend className="text-lg" />
              </Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
