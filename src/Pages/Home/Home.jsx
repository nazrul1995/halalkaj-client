import React from 'react';
import Banner from './Banner';
import LatestJobs from './LatestJobs';
import PopularCategory from './PopularCategory';
import TestimonialSection from './Testimonial';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';

import TopRatedFreelancers from './TopRatedFreelancers';
import AppSection from './AppSection';
import Statistics from './Statistics';
import FAQ from './FAQ';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            <Banner />

            <PopularCategory />

            <LatestJobs />

            <HowItWorks />
            <WhyChooseUs />

            <TestimonialSection />

            <TopRatedFreelancers />

            <AppSection />

            <Statistics />

            <FAQ />

            <ContactUs />

        </div>
    );
};

export default Home;
