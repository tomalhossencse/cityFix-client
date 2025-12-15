import React from "react";
import HeroSlider from "./HeroSlider/HeroSlider";
import LatestResolveIssue from "./LatestResolveIssue/LatestResolveIssue";
import CategorySection from "./CategorySection/CategorySection";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <LatestResolveIssue />
      <CategorySection />
    </div>
  );
};

export default Home;
