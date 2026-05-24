import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";


const Footer = () => {
    const socialLinks = [
        { name: "Twitter", url: "https://x.com", icon: <FaTwitter /> },
        { name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedinIn /> },
        { name: "GitHub", url: "https://github.com", icon: <FaGithub /> }
    ];
    const quickLinks = [
        { name: "Home", url: "#home" },
        { name: "About", url: "#about" },
        { name: "Skills", url: "#skills" },
        { name: "Services", url: "#services" },
        { name: "Projects", url: "#projects" },
        { name: "Contact", url: "#contact" }
    ];
    return (
        <div>
            <footer className="w-full bg-[#f8f9fa] border-t border-gray-100 py-12 px-6">
                <div className="max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-bold text-slate-500 tracking-wide">
                        {quickLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                className="hover:text-cyan-500 transition-colors duration-200 cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-2">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Connect on ${social.name}`}
                                className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 text-slate-700 hover:text-cyan-500 hover:border-cyan-400 rounded-full text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                    <div className="text-center text-[11px] md:text-xs text-slate-400 tracking-wide font-medium pt-2">
                        &copy; {new Date().getFullYear()} Copyright: <span className="font-bold text-slate-500">Alomgir Hossain</span>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;


