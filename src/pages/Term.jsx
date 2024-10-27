import React, { useEffect, useState } from 'react';
import backgroundImage from "../components/img/background.svg"; 
import Header from "../components/landingpage/header";

const Term = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('h2, h3'); // Select all headers
        const options = {
            root: null, // Use the viewport as the root
            threshold: 0.6, // Trigger when 60% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id); // Set the active section ID
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section); // Observe each section
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section); // Clean up the observer
            });
        };
    }, []);

    return (
        <div
            className="flex overflow-auto flex-col bg-white bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                height: '100vh',  // Full viewport height
                width: '100vw',   // Full viewport width
                backgroundSize: 'cover',  // Ensures the image covers the entire container
                backgroundPosition: 'center',  // Centers the image
            }}
        >
            {/* Header Component */}
            <Header />

            <div className="flex flex-row flex-1 pt-15"> {/* Adjust padding to avoid overlap with header */}
                {/* Sidebar */}
                <div className="w-1/6 h-screen bg-[#ffffff]  sticky top-16 overflow-y-auto"> {/* Add overflow-y-auto for scrolling */}
                    <h2 className="font-bold text-4xl mb-4 mt-10">Terms and Conditions</h2>

                    {/* Use of Service */}
                    <h3 className="font-semibold text-2xl mt-4">Use of Service</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            <a
                                href="#use-of-service-general"
                                className={`text-black-600  hover:bg-gray-200 ${activeSection === 'use-of-service-general' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                General
                            </a>
                        </li>
                        <li>
                            <a
                                href="#service-rules"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'service-rules' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                Service Rules
                            </a>
                        </li>
                        <li>
                            <a
                                href="#cookies"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'cookies' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                Cookies
                            </a>
                        </li>
                    </ul>

                    {/* Accounts */}
                    <h3 className="font-semibold text-xl mt-4">Accounts</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            <a
                                href="#accounts"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'accounts' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                General
                            </a>
                        </li>
                    </ul>

                    {/* User Content */}
                    <h3 className="font-semibold text-xl mt-4">User Content</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            <a
                                href="#user-content-general"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'user-content-general' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                General
                            </a>
                        </li>
                        <li>
                            <a
                                href="#content-manipulation"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'content-manipulation' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                Content Manipulation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#responsibility"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'responsibility' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                Responsibility for the Content
                            </a>
                        </li>
                    </ul>

                    {/* Signature */}
                    <h3 className="font-semibold text-xl mt-4">Signature</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            <a
                                href="#how-it-works"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'how-it-works' ? 'font-bold bg-gray-200' : ''}`}
                            >
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a
                                href="#legal-guarantees"
                                className={`text-black-600 hover:bg-gray-200 ${activeSection === 'legal-guarantees' ? 'font-bold bg-gray-200'  : ''}`}
                            >
                                Legal Guarantees
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 pl-50 ml-50 pt-4"> {/* Padding to the top to avoid overlap with header */}
                    <h1 className="font-bold text-5xl mt-20">Terms and Conditions</h1>

                    {/* Use of Service Section */}
                    <h2 className="font-semibold text-5xl mt-8 pt-6" id="use-of-service-general">Use of Service -General</h2>
                    <p className="text-2xl tracking-widest pt-5">This page explains the terms by which you may use our online and/or mobile services, website, and software provided on or in connection with our services. By accessing or using iLovePDF you agree to be conformant to this Terms and Conditions agreement ("Agreement") whether or not you are registered on our services. In the case of disagreement with all or part of these Terms and Conditions, you should abstain from using the Service..</p>

                    <h2 className="font-semibold text-4xl mt-8 pt-6" id="service-rules">Service Rules</h2>
                    <p className="text-2xl tracking-widest pt-5">Your use of the Service and iLovePDF Desktop is subject to this Reasonable Use Policy, which has been created to ensure that our service is fair for both users and developers.

The following is not permitted in connection with iLovePDF Services and Desktop App:

Using any automated or non-automated scraping process (including bots, scrapers, and spiders) in conjunction with iLovePDF Desktop;
Converting or otherwise editing documents with iLovePDF Desktop at a rate that exceeds what a human can reasonably do by using manual means and a conventional device;
Providing your password to any other person or using any other persons username and password to access iLovePDF Desktop;
Abusing iLovePDF Desktop in excess of what is reasonably needed or required for legitimate business or personal purposes. iLovePDF may investigate any account that registers over 1000 tasks in a month to determine compliance with this requirement.</p>

                    <h2 className="font-semibold text-4xl mt-8 pt-6" id="cookies">Cookies</h2>
                    <p className="text-2xl tracking-widest pt-5">iLovePDF websites are a Software as a Service (SaaS), and use cookies, which are essential for the operations of the service and for its correct functionality. A minimal number of other non-essential cookies will be placed under your consent. In case you do not accept, manage or reject the use of cookies, consent will be granted by using our software; yet you can give or withdraw consent to these from our Cookie Policy page anytime.

                     </p>
                 <hr />


                    {/* Accounts Section */}
                    <h2 className="font-semibold text-5xl mt-8 pt-6" id="accounts">Accounts</h2>
                    <p className="text-2xl tracking-widest pt-5">iLovePDF accounts give the user access to the services and functionality that we may establish and maintain from time to time and in our sole discretion. We may maintain different types of accounts for different types of Users. The different account types allow the user to work within different file size and file number limitations. Our Service users' types are as follows:

Not registered
Registered
Premium
User is solely responsible for the activity that occurs on his account and must keep his account password secure.

iLovePDF owns the right to totally or partially stop providing any of its Services whenever it considers it appropriate and would only give prior notification to Premium Users. In the previous operations, the corresponding taxes will be applied to the Users, assuming payment whomever, in conformity with the current regulation, is considered a passive subject of these operations.</p>


                    <hr />
                    {/* User Content Section */}
                    <h2 className="font-semibold text-5xl mt-8 pt-6" id="user-content-general">User Content</h2>
                    <p className="text-2xl tracking-widest pt-5" >iLovePDF does not analyse the content of files whilst processing them and only Users will have access to the edited files once iLovePDF has processed them. If chosen by the user, this link can be shared with someone else.Certified signatures and signature requests will be saved for as long as required by law, whilst simple signatures will be deleted automatically after 2 hours.

Users bear the sole responsibility for the usage of their own files.

iLovePDF is limited to offer users access to their own processed files. These files will only remain stored on our servers during the time that the download link is available.</p>

                    <h2 className="font-semibold text-4xl mt-8 pt-6" id="content-manipulation">Content Manipulation</h2>
                    <p className="text-2xl tracking-widest pt-5">iLovePDF provides all the necessary information to assist the user in processing files, and only the User is responsible for contacting iLovePDF in case of technical problems. iLovePDF is highly concerned about file security, thus its servers have limited access, are secured and strategically placed. User will be able to modify his User type or cancel his account at any time, by means of the contact form.</p>

                    <h2 className="font-semibold text-3xl mt-8 pt-6" id="responsibility">Responsibility for the Content of the Files</h2>
                    <p className="text-2xl tracking-widest pt-5">iLovePDF does not analyze the content of processed files and thus is not responsible for its tools misuse nor copyright infringements which may affect third- parties. The User will be responsible before iLovePDF of any penalty, sanction, and/or fine which the courts or other competent authorities could issue against iLovePDF for noncompliance with any part of this Agreement.</p>



                    <hr />
                    {/* Signature Section */}
                    <h2 className="font-semibold text-5xl mt-8 pt-6" id="how-it-works">How It Works</h2>
                    <p className="text-2xl tracking-widest pt-5">iLovePDF Signature permits documents to be signed electronically by signatory's self or one can request for signatures from other signatories by means of email delivery. Signatories will have the ability to review the document before proceeding with the application of an electronic signature. "Signatory" means a natural person who creates an electronic signature.

Signatory has two electronic signature options:

Simple electronic signature (defined as "data in electronic form which is attached to or logically associated with other data in electronic form and which is used by the signatory to sign; in sum is the signature that allows the signer to be digitally identified with their data but does not offer a minimum level of security").
Advanced electronic signature (defined as "an electronic signature which meet the following requirements: (a) it is uniquely linked to the signatory; (b) it is capable of identifying the signatory; (c) it is created using electronic signature creation data that the signatory can, with a high level of confidence, use under his sole control; and (d) it is linked to the data signed therewith in such a way that any subsequent change in the data is detectable)</p>

                    <h2 className="font-semibold text-4xl mt-8 pt-6" id="legal-guarantees">Legal Guarantees</h2>
                    <p className="text-2xl tracking-widest pt-5"> The electronic signature services provided by iLovePDF are regulated by Spanish and European Laws, particularly, by EU Regulation 910/2014 ("eIDAS Regulation"), directly applicable in all member countries of the European Union, and Spanish Law 6/2020 (trusted electronic services) where iLovePDF is located. Services could also comply with the requirements of the U.S. Electronic Signature in Global and National Commerce Act of 2000 (ESIGN), and the Uniform Electronic Transactions Act (UETA) or other Laws in many jurisdictions . However, iLovePDF disclaims any liability in this regard and it's the Signatory's sole responsibility to confirm and ensure the suitability and fitness of the Signature service for its purposes and legal requirements and laws in the country or region in which the signature takes place. Electronic signatures may have different legal standards depending on the jurisdiction.

iLovePDF, in case of advance signature, provides a detailed audit trail, timestamps, and signature biometric tracing which are held into account in legal proceedings.

iLovePDF is at disposition to provide the advanced electronically signed document as well as audit trail if required by a court of law (and in case iLovePDF still preserves this information), yet exempts itself from prosecution if the document is not upheld or found lacking.</p>
                </div>
            </div>
        </div>
    );
};

export default Term;
