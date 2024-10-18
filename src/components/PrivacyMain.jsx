import React from 'react';


const UserGuidePage = () => {
    return (
        <div className="container mx-auto py-16 ">
            <h1 className="text-7xl font-bold text-center mb-8">Data Security and Privacy Policies</h1>
            <p className="text-2xl text-center mb-12 pb-10">
                In-depth insight into PolyFile's Privacy and Security Framework
            </p>

            <div className="flex flex-row gap-8 w-full justify-center p-9">
                <div className="flex-grow bg-white hover:scale-105 text-center h-80 w-64 rounded-lg text-gray-800 cursor-pointer transition-all duration-300 shadow-lg p-4">
                    <p className="font-bold text-3xl">Security</p>
                    <p className="text-xl pt-5">PolyFile is certified for meeting the requirements establishment by the insternational standard ISO/IEC 27001.</p>
                </div>
                <div className="flex-grow bg-white hover:scale-105 text-center h-80 w-64 rounded-lg text-gray-800 cursor-pointer transition-all duration-300 shadow-lg p-4">
                    <p className="font-bold text-3xl">Privacy</p>
                    <p className="text-xl pt-5">File you upload and Process are encrypted and deleted from our servers within 2 hours . protecting your data and privacy.</p>
                </div>
                <div className="flex-grow bg-white hover:scale-105 text-center h-80 w-64 rounded-lg text-gray-800 cursor-pointer transition-all duration-300 shadow-lg p-4">
                    <p className="font-bold text-3xl">Terms</p>
                    <p className="text-xl pt-5">Here are the rule you must follow to get your work done in PolyFile. By using PolyFile, you agree to our Terms and Conditions.</p>
                </div>
                <div className="flex-grow bg-white hover:scale-105 text-center h-80 w-64 rounded-lg text-gray-800 cursor-pointer transition-all duration-300 shadow-lg p-4">
                    <p className="font-bold text-3xl">Cookies</p>
                    <p className="text-xl pt-5">This document informs Users about the technologies that help this Application to achieve the purposes described below.</p>
                </div>
            </div>


            <div className="flex flex-col items-center text-center py-16 bg-[#bde5fc] w-full mx-auto max-w-screen-9xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                    The security of your data is our #1 priority
                </h1>
                <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl">
                    All files uploaded to PolyFile are encrypted using Hypertext Transfer Protocol Secure (HTTPS).
                    PolyFile does not access, use, analyze or store any processed data. If you want to know more
                    about PolyFile's data collection, read our
                    <a href="/privacy-policy" className="text-red-500 hover:underline ml-1">Privacy Policy</a>.
                </p>
                <div className="flex space-x-8 mt-8">
                    <img src="/path-to-pdf-association-icon.png" alt="PDF Association" className="h-12" />
                    <img src="/path-to-iso-icon.png" alt="ISO 27001" className="h-12" />
                    <img src="/path-to-secure-ssl-icon.png" alt="Secure SSL Encryption" className="h-12" />
                </div>
            </div>

        </div>









    );
};

export default UserGuidePage;