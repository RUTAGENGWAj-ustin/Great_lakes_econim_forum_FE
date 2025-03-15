import {  FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-8 flex justify-center gap-5 text-center">
        <p>&copy; Great Lakes Economic Forum. All rights reserved.</p>
         <div className="flex space-x-4">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
            
                       <FacebookIcon/>
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600"
                      >
                         <TwitterIcon/>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700"
                      >
                        <i className="fab fa-instagram text-2xl"></i>
                        <InstagramIcon className="text-2xl"/>
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <i className="fab fa-linkedin text-2xl"></i>
                        <LinkedinIcon className="text-2xl"/>
                      </a>
                    </div>
      </footer>
    );
  }
  
  export default Footer;
  