import React from "react";
import HeroSlider from "./HeroSlider/HeroSlider";
import LatestResolveIssue from "./LatestResolveIssue/LatestResolveIssue";
import CategorySection from "./CategorySection/CategorySection";
import HowItWorks from "./HowItWorks/HowItWorks";
import CommunityStats from "./CommunityStats/CommunityStats";
import JoinCleanDrive from "./JoinCleanDrive/JoinCleanDrive";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <LatestResolveIssue />
      <CategorySection />
      <HowItWorks />
      <CommunityStats />
      <JoinCleanDrive />
    </div>
  );
};

export default Home;
