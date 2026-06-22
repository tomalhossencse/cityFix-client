import React from "react";
import HeroSlider from "./HeroSlider/HeroSlider";
import LatestResolveIssue from "./LatestResolveIssue/LatestResolveIssue";
import CategorySection from "./CategorySection/CategorySection";
import HowItWorks from "./HowItWorks/HowItWorks";
import CommunityStats from "./CommunityStats/CommunityStats";
import JoinCleanDrive from "./JoinCleanDrive/JoinCleanDrive";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import Banner from "./HeroSlider/Banner";

const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* <HeroSlider /> */}
      <Banner />
      <FeaturesSection />
      <LatestResolveIssue />
      {/* <HowItWorks /> */}
      <CommunityStats />
      {/* <CategorySection /> */}
      <JoinCleanDrive />
    </div>
  );
};

export default Home;
