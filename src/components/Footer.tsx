import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-indigo-50 w-full flex py-28">
        <div>
            <Image width={500} height={500} src="/Logo.svg" alt="Logo" />
        </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        
        {/* Column 1: Social Media Links */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-indigo-500" size={24} />
            <a href="https://www.linkedin.com/in/kunal-nasa-24840b249/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">LinkedIn</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaInstagram className="text-pink-500" size={24} />
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300">Instagram</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaTwitter className="text-blue-500" size={24} />
            <a href="https://x.com/nasa_kunal" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">Twitter</a>
          </div>
        </div>
        
        {/* Column 2: GitHub and Owner Info */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <FaGithub className="text-gray-500" size={24} />
            <a href="https://github.com/KunalNasa" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">GitHub</a>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm">© 2024 WiseUp | All Rights Reserved</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
