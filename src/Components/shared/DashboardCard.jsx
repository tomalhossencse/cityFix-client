import React from 'react';

const DashboardCard = ({ label, value, icon }) => {
    return (
        <div className="bg-white rounded-2xl p-5 border border-app-border flex justify-between gap-3">

            <div>
                <h3 className="text-2xl font-semibold text-zinc-900">{value}</h3>
                <p className="text-sm text-app-text-light">{label}</p>
            </div>
            <div className="size-10 rounded-xl flex-center bg-orange-50 text-orange-600">
                {icon}
            </div>
        </div>
    );
};

export default DashboardCard;
