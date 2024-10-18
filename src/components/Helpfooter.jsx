import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-500 text-white p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold text-lg">PolyFile</h5>
            <ul className="mt-4">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/pricing" className="hover:text-gray-300">Pricing</a></li>
              <li><a href="/security" className="hover:text-gray-300">Security</a></li>
              <li><a href="/tools" className="hover:text-gray-300">Tools</a></li>
              <li><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg">Product</h5>
            <ul className="mt-4">
              <li><a href="/PolyFile-desktop" className="hover:text-gray-300">PolyFile Desktop</a></li>
              <li><a href="/PolyFile-mobile" className="hover:text-gray-300">PolyFile Mobile</a></li>
              <li><a href="/developers" className="hover:text-gray-300">Developers</a></li>
              <li><a href="/features" className="hover:text-gray-300">Features</a></li>
              <li><a href="/iloveimg.com" className="hover:text-gray-300">iloveimg.com</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg">Solutions</h5>
            <ul className="mt-4">
              <li><a href="/business" className="hover:text-gray-300">Business</a></li>
              <li><a href="/education" className="hover:text-gray-300">Education</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg">Company</h5>
            <ul className="mt-4">
              <li><a href="/our-story" className="hover:text-gray-300">Our Story</a></li>
              <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
              <li><a href="/press" className="hover:text-gray-300">Press</a></li>
              <li><a href="/legal-privacy" className="hover:text-gray-300">Legal & Privacy</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-center space-x-4">
            <a href="https://apps.apple.com/us/app/PolyFile/id1436784699" target="_blank">
              <img src="https://www.PolyFile.com/assets/images/app-store-badge.svg" alt="Download on the App Store" className="h-10" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.PolyFile.android" target="_blank">
              <img src="https://www.PolyFile.com/assets/images/google-play-badge.svg" alt="Get it on Google Play" className="h-10" />
            </a>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center text-sm">© PolyFile 2024. Your PDF Editor</p>
          <div className="flex justify-center space-x-2 mt-2">
            <a href="https://www.facebook.com/PolyFile" target="_blank">
              <i className="fab fa-facebook-f text-2xl text-blue-500"></i>
            </a>
            <a href="https://twitter.com/PolyFile" target="_blank">
              <i className="fab fa-twitter text-2xl text-blue-400"></i>
            </a>
            <a href="https://www.instagram.com/PolyFile" target="_blank">
              <i className="fab fa-instagram text-2xl text-pink-500"></i>
            </a>
            <a href="https://www.linkedin.com/company/PolyFile" target="_blank">
              <i className="fab fa-linkedin-in text-2xl text-blue-700"></i>
            </a>
            <a href="https://www.tiktok.com/@PolyFile" target="_blank">
              <i className="fab fa-tiktok text-2xl text-pink-600"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;