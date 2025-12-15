import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const HowItWorks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: howItWorksSteps = [] } = useQuery({
    queryKey: [`howItWorksSteps`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/howItWorksSteps`);
      return res.data;
    },
  });
  return (
    <section className="py-8 from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="section-title">How It Works</h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {howItWorksSteps.map((step) => (
            <div
              key={step.id}
              className="relative group bg-base-100 rounded-2xl p-8
              border border-gray-100 shadow-sm
              hover:shadow-xl hover:-translate-y-2
              transition-all duration-300"
            >
              {/* Step Number */}
              <div
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full
                bg-primary text-white flex items-center justify-center
                font-bold shadow-md"
              >
                {step.id}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full bg-primary/10
                  flex items-center justify-center group-hover:scale-110
                  transition-transform duration-300"
                >
                  <img src={step.image} alt={step.title} className="w-10" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-center text-accent">
                {step.title}
              </h3>
              <p className="text-sm text-center text-accent mt-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
