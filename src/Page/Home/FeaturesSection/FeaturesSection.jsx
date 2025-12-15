import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

const FeaturesSection = () => {
  const axiosSecure = useAxiosSecure();
  const { data: features = [], isLoading } = useQuery({
    queryKey: [`features`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/features`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-8 from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Latest Features</h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 p-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-accent text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
