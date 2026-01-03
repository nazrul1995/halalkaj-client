import React from 'react';
import Banner from './Banner';
import LatestJobs from './LatestJobs';
import PopularCategory from './PopularCategory';
import TestimonialSection from './Testimonial';
import HowItWorks from './HowItWorks';
import FeaturedCompanies from './FeaturedCompanies';
import WhyChooseUs from './WhyChooseUs';
import CareerBlogs from './CareerBlogs';
import NewsLetter from './NewsLetter';
import CallToAction from './CallToAction';

const Home = () => {
    return (
        <div>

            <Banner />

            <PopularCategory />

            <LatestJobs />

            <HowItWorks />

            <FeaturedCompanies />
            <WhyChooseUs />

            <TestimonialSection />

            <CareerBlogs />

            <NewsLetter />

            <CallToAction />

        </div>
    );
};

export default Home;
