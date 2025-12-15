import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CategorySection = () => {
  const axiosSecure = useAxiosSecure();
  const { data: categories = [] } = useQuery({
    queryKey: [`category`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/category`);
      return res.data;
    },
  });
  return (
    <div className="my-12 md:p-0 p-8">
      <h2 className="section-title">Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center py-6 px-3 space-y-2 
            rounded-xl border-2 border-gray-100 
            transition transform duration-300 shadow-sm ease-in-out 
            hover:border-primary hover:scale-105 hover:shadow-md"
          >
            <img src={cat.image} alt={cat.title} className="w-20" />

            <h3 className="text-lg font-semibold text-accent">{cat.title}</h3>
            <p className="text-accent text-sm text-center">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
