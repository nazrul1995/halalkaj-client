import React from 'react';
import Banner from './Banner';
import LatestJobs from './LatestJobs';
import PopularCategory from './PopularCategory';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestJobs></LatestJobs>
            <PopularCategory></PopularCategory>
        </div>
    );
};

export default Home;