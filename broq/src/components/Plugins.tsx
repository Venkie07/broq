import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../App";
import { styles } from "../theme";

const PLUGINS = [
    {
        name: "AI Summarizer",
        description: "Helps you to summarize the data in a concise manner.",
    },
    {
        name: "Data Processor",
        description: "Processes the data and provides insights based on it.",
    },
    {
        name: "Data Analyzer",
        description: "Analyzes and visualizes your datasets.",
    },
    {
        name: "Visualize Generator",
        description: "Creates visualizations from text prompts and data.",
    },
];

const Plugins: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const { activeTheme } = useTheme();
    const t = styles[activeTheme];
    const [expanded, setExpanded] = useState<number | null>(null);
    const [toggles, setToggles] = useState<boolean[]>(PLUGINS.map(() => false));

    const handleToggle = (idx: number) => {
        setToggles((prev) => {
            const copy = [...prev];
            copy[idx] = !copy[idx];
            return copy;
        });
    };

    return (
        <div
            className="flex flex-col h-full w-full animate-in fade-in duration-300 transition-colors duration-300"
            style={{ backgroundColor: t.bg, color: t.text }}
        >
            {/* Header */}
            <div
                className="relative flex items-center p-4 shrink-0 transition-colors duration-300"
                style={{ borderBottom: `1px solid ${t.border}` }}
            >
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 p-2 rounded-lg transition-colors text-inherit z-10"
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = t.hoverBg)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                    <ArrowLeft size={20} />
                </button>

                <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
                    Plugins
                </h2>
            </div>
            {/* Body */}
            <div className="p-6 flex-1 overflow-y-auto transition-colors duration-300" style={{ backgroundColor: t.bg }}>
                <div className="max-w-2xl mx-auto grid gap-4">
                    {PLUGINS.map((plugin, idx) => (
                        <div
                            key={plugin.name}
                            className={`rounded-xl shadow transition-all duration-300 overflow-hidden border flex flex-col ${expanded === idx ? "max-h-64" : "max-h-20"}`}
                            style={{
                                backgroundColor: t.card,
                                borderColor: t.border,
                                transitionProperty: "max-height, box-shadow, background-color, color",
                            }}
                        >
                            <div
                                className="flex items-center justify-between px-5 py-4 cursor-pointer select-none group"
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                style={{ transition: "background-color 0.3s" }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-base" style={{ color: t.text }}>{plugin.name}</span>
                                </div>
                                <button
                                    className={`ml-4 relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 focus:outline-none ${toggles[idx] ? "bg-purple-500" : "bg-gray-300"}`}
                                    onClick={e => { e.stopPropagation(); handleToggle(idx); }}
                                    style={{ border: `1px solid ${t.border}` }}
                                    aria-label={toggles[idx] ? "Disable" : "Enable"}
                                >
                                    <span
                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${toggles[idx] ? "translate-x-6" : "translate-x-0"}`}
                                    />
                                </button>
                            </div>
                            <div
                                className={`transition-all duration-300 px-5 ${expanded === idx ? "py-2 opacity-100 max-h-32" : "py-0 opacity-0 max-h-0"}`}
                                style={{ color: t.mutedText }}
                            >
                                {plugin.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plugins;
