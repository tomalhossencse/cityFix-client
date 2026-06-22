import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import * as Icons from "lucide-react"; // Dynamically imports all icons

const CategorySection = () => {
  const axiosSecure = useAxiosSecure();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get("/category");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex-center min-h-[300px]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-semibold">Explore Categories</h2>
        <p className="text-sm text-app-text-light mt-1">
          Find exactly what you need
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {categories.map((cat, index) => {
          // Fallback to 'Layers' icon if the database icon name doesn't match a Lucide icon
          const IconComponent = Icons[cat.icon] || Icons.Layers;

          return (
            <div
              key={cat._id || index}
              className="group relative flex flex-col items-center p-6 bg-white
                         rounded-2xl border border-app-border/60 shadow-xs
                         transition-all duration-300 ease-out
                         hover:-translate-y-1.5 hover:border-app-green-lighter/30 hover:shadow-xl hover:shadow-app-green/5
                         animate-slide-in-up"
            // style={{ animationDelay: `${index * 50}ms` }} // Staggered entry animation effect
            >
              {/* Image / Icon Container */}
              <div className="relative flex-center w-20 h-20 mb-5 rounded-xl bg-app-cream-dark/50 group-hover:bg-app-orange/10 transition-colors duration-300">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <IconComponent
                    className="w-8 h-8 text-app-green-light group-hover:text-app-orange transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                )}
              </div>

              {/* Text Content */}
              <h3 className="font-sans text-lg font-bold text-app-green mb-2 tracking-wide group-hover:text-app-orange-dark transition-colors duration-300">
                {cat.title}
              </h3>
              <p className="font-sans text-app-text-light text-sm text-center line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              {/* Subtle hover accent line at the bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-app-orange rounded-full transition-all duration-300 group-hover:w-1/3" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
