import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do I post a job?",
            answer: "Sign up for an account, go to the dashboard, and click on 'Add Job' to post your project. Fill in the details, set your budget, and publish it for freelancers to see."
        },
        {
            question: "How do I become a freelancer?",
            answer: "Register as a user and start browsing jobs. You can accept jobs that match your skills. Build your profile with your expertise and portfolio to attract more clients."
        },
        {
            question: "Is there a fee to use the platform?",
            answer: "Basic usage is free for both clients and freelancers. We charge a small commission on completed projects. Premium features and verified badges may have associated costs."
        },
        {
            question: "How do I contact support?",
            answer: "Use the contact form below or email us at support@halalkaj.com. Our support team typically responds within 24 hours."
        },
        {
            question: "How does payment work?",
            answer: "Payments are held in escrow until the project is completed and approved. Once you're satisfied with the work, release the payment to the freelancer."
        },
        {
            question: "Can I cancel a job after it's started?",
            answer: "Yes, but cancellation policies apply. If you cancel after work has begun, you may be charged a cancellation fee. We recommend communicating with your freelancer first."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our platform
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-blue-600" />
                                    ) : (
                                        <FaChevronDown className="text-blue-600" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">Still have questions?</p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;