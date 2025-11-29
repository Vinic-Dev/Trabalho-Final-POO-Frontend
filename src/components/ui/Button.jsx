import React from "react";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const styles = {
        primary: "bg-red-600 text-white hover:bg-red-700 shadow-red-200",
        secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200",
        ghost: "text-slate-500 hover:text-red-600 hover:bg-red-50",
        outline: "border border-slate-200 text-slate-600 hover:bg-slate-50"
    };

    return (
        <button
            className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
