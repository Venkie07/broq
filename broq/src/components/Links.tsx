import React, { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../App";
import { styles } from "../theme";

type LinkItem = {
    id: number;
    name: string;
    url: string;
    key: string;
};

const initialLinks: LinkItem[] = [
    { id: 1, name: "OpenAI API", url: "https://api.openai.com", key: "sk-****abcd" },
    { id: 2, name: "MongoDB", url: "mongodb+srv://cluster0.mongodb.net", key: "mongodb+srv://user:***" },
];

const Links: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const { activeTheme } = useTheme();
    const t = styles[activeTheme];
    const [links, setLinks] = useState<LinkItem[]>(initialLinks);
    const [showKeys, setShowKeys] = useState<{ [id: number]: boolean }>({});
    const [editing, setEditing] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<LinkItem>>({});
    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => {
        setForm({});
        setEditing(null);
        setShowForm(true);
    };
    const handleEdit = (id: number) => {
        const link = links.find(l => l.id === id);
        if (link) {
            setForm(link);
            setEditing(id);
            setShowForm(true);
        }
    };
    const handleDelete = (id: number) => {
        setLinks(links.filter(l => l.id !== id));
    };
    const handleSave = () => {
        if (!form.name || !form.url || !form.key) return;
        if (editing) {
            setLinks(links.map(l => l.id === editing ? { ...l, ...form } as LinkItem : l));
        } else {
            setLinks([...links, { ...form, id: Date.now() } as LinkItem]);
        }
        setShowForm(false);
        setForm({});
        setEditing(null);
    };
    const handleCancel = () => {
        setShowForm(false);
        setForm({});
        setEditing(null);
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
                    Links
                </h2>
            </div>
            {/* Body */}
            <div className="p-6 flex-1 overflow-y-auto transition-colors duration-300" style={{ backgroundColor: t.bg }}>
                <div className="max-w-2xl mx-auto grid gap-4">
                    <button
                        className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium transition-colors duration-200"
                        style={{ backgroundColor: t.primary, color: "#fff" }}
                        onClick={handleAdd}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = t.primaryHover)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = t.primary)}
                    >
                        <Plus size={18} /> Add Link
                    </button>
                    {showForm && (
                        <div className="rounded-xl border p-4 mb-4 bg-opacity-80 shadow transition-all duration-300" style={{ backgroundColor: t.card, borderColor: t.border }}>
                            <div className="grid gap-3">
                                <input
                                    className="px-3 py-2 rounded-lg border transition-colors duration-200"
                                    style={{ backgroundColor: t.inputBg, color: t.text, borderColor: t.border }}
                                    placeholder="Name"
                                    value={form.name || ""}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                />
                                <input
                                    className="px-3 py-2 rounded-lg border transition-colors duration-200"
                                    style={{ backgroundColor: t.inputBg, color: t.text, borderColor: t.border }}
                                    placeholder="URL"
                                    value={form.url || ""}
                                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                />
                                <input
                                    className="px-3 py-2 rounded-lg border transition-colors duration-200"
                                    style={{ backgroundColor: t.inputBg, color: t.text, borderColor: t.border }}
                                    placeholder="API Key / DB URL"
                                    value={form.key || ""}
                                    onChange={e => setForm(f => ({ ...f, key: e.target.value }))}
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                        style={{ backgroundColor: t.primary, color: "#fff" }}
                                        onClick={handleSave}
                                    >{editing ? "Save" : "Add"}</button>
                                    <button
                                        className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                        style={{ backgroundColor: t.card, color: t.text, border: `1px solid ${t.border}` }}
                                        onClick={handleCancel}
                                    >Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {links.length === 0 && <div className="text-center text-sm text-gray-400">No links added yet.</div>}
                    {links.map(link => (
                        <div
                            key={link.id}
                            className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-3 shadow transition-all duration-300 bg-opacity-80"
                            style={{ backgroundColor: t.card, borderColor: t.border }}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-base mb-1" style={{ color: t.text }}>{link.name}</div>
                                <div className="text-xs break-all mb-1" style={{ color: t.mutedText }}>
                                    {link.url.length > 32 ? link.url.slice(0, 32) + "..." : link.url}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs" style={{ color: t.mutedText }}>
                                        {showKeys[link.id] ? link.key : "*".repeat(Math.max(6, link.key.length))}
                                    </span>
                                    <button
                                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        style={{ color: t.subtext }}
                                        onClick={() => setShowKeys(k => ({ ...k, [link.id]: !k[link.id] }))}
                                        title={showKeys[link.id] ? "Hide" : "Show"}
                                    >
                                        {showKeys[link.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    style={{ color: t.primary }}
                                    onClick={() => handleEdit(link.id)}
                                    title="Edit"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    style={{ color: t.primaryHover }}
                                    onClick={() => handleDelete(link.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Links;
