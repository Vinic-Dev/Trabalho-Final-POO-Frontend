import React from "react";

const StatsCard = ({ icon: Icon, iconColor, iconBg, title, value }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 ${iconBg} ${iconColor} rounded-xl`}>
                    <Icon size={24} />
                </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    );
};

export default StatsCard;
