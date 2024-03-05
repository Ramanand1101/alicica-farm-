import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import logo from "../asset/logo.jpg"
// import logo from "../asset/logoAlicia.png"

const Footer = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ marginBottom: "-10px" }}>
                <path fill="#111827" fillOpacity="1" d="M0,288L80,282.7C160,277,320,267,480,234.7C640,203,800,149,960,154.7C1120,160,1280,224,1360,256L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <div className="footerSection bg-gray-900"  >
                <footer className="text-white footer py-3s text-light relative z-10 p-8 rounded-md ">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 text-center">
                        <img src={logo} alt="" className="mx-auto max-w-full h-auto md:w-full lg:w-full base:w-1/5" />
                           <div>

                            <b className="block mb-3">
                                <h6 className="text-white hover:cursor-pointer">CUSTOMER SERVICE</h6>
                            </b>
                            <ul className="list-unstyled hover:cursor-pointer text-white">
                                <li>Help & FAQs</li>
                                <li>Order Tracking</li>
                                <li>Shipping & Delivery</li>
                                <li>Order History</li>
                                <li>Advanced Search</li>
                                <li>Login</li>
                            </ul>
                        </div>
                        <div>
                            <b className="block mb-3">
                                <h6 className="text-white hover:cursor-pointer">ABOUT US</h6>
                            </b>
                            <ul className="list-unstyled hover:cursor-pointer">
                                <li>About Us</li>
                                <li>Career</li>
                                <li>Our Stores</li>
                                <li>Coporate Sales</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div>
                            <b className="block mb-3">
                                <h6 className="text-white hover:cursor-pointer">MORE INFORMATION</h6>
                            </b>
                            <ul className="list-unstyled hover:cursor-pointer">
                                <li>Affiliates</li>
                                <li>Refer a Friend</li>
                                <li>Student Beans Offers</li>
                                <li>Gift Vouchers</li>
                            </ul>
                        </div>
                        <div>
                            <b className="block mb-3">
                                <h6 className="text-white hover:cursor-pointer">SOCIAL MEDIA</h6>
                            </b>
                            <BsFacebook className="inline-block me-4 hover:cursor-pointer" />
                            <BsTwitter className="inline-block me-4 hover:cursor-pointer" />
                            <BsInstagram className="inline-block me-4 hover:cursor-pointer" />
                            <BsYoutube className="inline-block me-4 hover:cursor-pointer" />
                            <BsLinkedin className="inline-block me-4 hover:cursor-pointer" />
                        </div>
                    </div>
                    <div className="w-full h-0.5 bg-white mt-6"></div>
                    <div className="mt-8 text-center">
                        <p className="text-white">© Copyright 2022. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>

        </>
    );
};

export default Footer;
