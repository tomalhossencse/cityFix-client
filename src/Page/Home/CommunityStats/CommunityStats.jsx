import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../Components/Loading/Loading";
import Container from "../../../Utility/Container";
import { Users, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const CommunityStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminDashboard/stats`);
      return res.data;
    },
  });


  return (
    <section className="my-12">
      <div className="relative overflow-hidden bg-white border border-app-border/70 rounded-3xl p-8 md:p-16 shadow-xs group">

        {/* Decorative corner background accent element */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-app-cream to-transparent rounded-bl-full pointer-events-none opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">

          {/* Left Column Aspect: Dynamic Editorial Copy Section */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-app-cream px-3 py-1.5 rounded-full border border-app-border/50">
                <span className="size-2 bg-app-orange rounded-full animate-pulse-soft" />
                <span className="text-xs font-bold text-app-green-light uppercase tracking-wider">Live Metrics</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl text-app-green font-black tracking-tight leading-[1.1]">
                Assisting Communities <br />
                <span className="text-app-orange relative inline-block">
                  for a Better Tomorrow

                </span>
              </h2>
            </div>

            <p className="font-sans text-app-text-light text-base md:text-lg leading-relaxed max-w-sm">
              We translate raw numbers into direct community progress, working step-by-step to improve urban infrastructure.
            </p>
          </div>

          {/* Right Column Aspect: Premium Interlocking Matrix Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 self-center">

            {/* Metric Block Unit: Total Community Registrations */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-app-cream/30 border border-app-border/40 hover:bg-white hover:border-app-green-lighter/30 hover:shadow-xl hover:shadow-app-green/5 transition-all duration-300 group/card animate-slide-in-up">
              <div className="size-12 rounded-xl bg-app-cream border border-app-border/60 flex-center shrink-0 group-hover/card:bg-app-green group-hover/card:text-white transition-colors duration-300">
                <Users className="size-5 text-app-green-light group-hover/card:text-white" strokeWidth={1.8} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-app-text-light/80 uppercase tracking-widest">Total Active Users</p>
                <h3 className="text-3xl md:text-4xl font-sans font-black text-app-green tracking-tight">
                  {stats?.issues?.totalUsers || 0}
                </h3>
              </div>
            </div>

            {/* Metric Block Unit: Pending Review Cases */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-app-cream/30 border border-app-border/40 hover:bg-white hover:border-app-green-lighter/30 hover:shadow-xl hover:shadow-app-green/5 transition-all duration-300 group/card animate-slide-in-up" style={{ animationDelay: "40ms" }}>
              <div className="size-12 rounded-xl bg-app-cream border border-app-border/60 flex-center shrink-0 group-hover/card:bg-app-warning group-hover/card:text-white transition-colors duration-300">
                <Clock className="size-5 text-app-warning group-hover/card:text-white" strokeWidth={1.8} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-app-text-light/80 uppercase tracking-widest">Pending Incidents</p>
                <h3 className="text-3xl md:text-4xl font-sans font-black text-app-green tracking-tight">
                  {stats?.issues?.pending || 0}
                </h3>
              </div>
            </div>

            {/* Metric Block Unit: Successfully Resolved Updates */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-app-cream/30 border border-app-border/40 hover:bg-white hover:border-app-green-lighter/30 hover:shadow-xl hover:shadow-app-green/5 transition-all duration-300 group/card animate-slide-in-up" style={{ animationDelay: "80ms" }}>
              <div className="size-12 rounded-xl bg-app-cream border border-app-border/60 flex-center shrink-0 group-hover/card:bg-app-success group-hover/card:text-white transition-colors duration-300">
                <CheckCircle2 className="size-5 text-app-success group-hover/card:text-white" strokeWidth={1.8} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-app-text-light/80 uppercase tracking-widest">Resolved Actions</p>
                <h3 className="text-3xl md:text-4xl font-sans font-black text-app-green tracking-tight">
                  {stats?.issues?.resloved || 0}
                </h3>
              </div>
            </div>

            {/* Metric Block Unit: Combined System Totals */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-app-cream/30 border border-app-border/40 hover:bg-white hover:border-app-green-lighter/30 hover:shadow-xl hover:shadow-app-green/5 transition-all duration-300 group/card animate-slide-in-up" style={{ animationDelay: "120ms" }}>
              <div className="size-12 rounded-xl bg-app-cream border border-app-border/60 flex-center shrink-0 group-hover/card:bg-app-orange group-hover/card:text-white transition-colors duration-300">
                <AlertTriangle className="size-5 text-app-orange group-hover/card:text-white" strokeWidth={1.8} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-app-text-light/80 uppercase tracking-widest">Total Reports Logged</p>
                <h3 className="text-3xl md:text-4xl font-sans font-black text-app-green tracking-tight">
                  {stats?.issues?.total || 0}
                </h3>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
