import React from "react";

const howItWorksSteps = [
  {
    id: 1,
    title: "Report an Issue",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
    description:
      "Submit your issue with details, location, and photos using our platform.",
  },
  {
    id: 2,
    title: "Issue Verification",
    image: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    description:
      "Authorities review and verify the reported issue for accuracy.",
  },
  {
    id: 3,
    title: "Assigned to Staff",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
    description:
      "The issue is assigned to the responsible department or staff.",
  },
  {
    id: 4,
    title: "Issue Resolved",
    image: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
    description:
      "The issue is resolved and the status is updated in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <div className="my-16 md:p-0 p-8">
      <h2 className="section-title text-center">How It Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-10">
        {howItWorksSteps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col justify-center items-center py-6 px-4 space-y-3
            rounded-xl border-2 border-gray-100 
            transition transform duration-300 ease-in-out
            shadow-sm hover:border-primary hover:scale-105 hover:shadow-md"
          >
            <img src={step.image} alt={step.title} className="w-20" />

            <h3 className="text-lg font-semibold text-accent text-center">
              {step.title}
            </h3>

            <p className="text-accent text-sm text-center">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
