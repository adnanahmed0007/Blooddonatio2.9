import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Heart, Users, Droplet, LogOut, Shield,
    Search, ChevronDown, Trash2, Eye, Bell, BarChart2,
    TrendingUp, CheckCircle, AlertCircle, X, Menu, HandHeart, Syringe,
    RefreshCw, WifiOff
} from "lucide-react";



// ─── Helpers ──────────────────────────────────────────────────────────────────
const BloodBadge = ({ group }) => {
    const colors = {
        "A+": "bg-red-100 text-red-700", "A-": "bg-red-200 text-red-800",
        "B+": "bg-orange-100 text-orange-700", "B-": "bg-orange-200 text-orange-800",
        "O+": "bg-rose-100 text-rose-700", "O-": "bg-rose-200 text-rose-800",
        "AB+": "bg-pink-100 text-pink-700", "AB-": "bg-pink-200 text-pink-800",
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${colors[group] || "bg-gray-100 text-gray-600"}`}>
            {group || "—"}
        </span>
    );
};

const RoleBadge = ({ role }) => (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold
    ${role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
        {role || "donor"}
    </span>
);

const StatusBadge = ({ status }) => {
    const map = {
        pending: "bg-yellow-100 text-yellow-700",
        fulfilled: "bg-green-100 text-green-700",
        urgent: "bg-red-100 text-red-700",
        completed: "bg-blue-100 text-blue-700",
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${map[status?.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>
            {status || "pending"}
        </span>
    );
};

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" /> {trend}
                </span>
            )}
        </div>
        <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
);

const Spinner = () => (
    <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    </div>
);

const ErrorState = ({ onRetry }) => (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-red-400" />
        </div>
        <div className="text-center">
            <p className="font-bold text-gray-700 text-lg mb-1">Could not reach server</p>
            <p className="text-sm text-gray-400 mb-4">Make sure the backend is running and CORS is configured.</p>
            <button
                onClick={onRetry}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors mx-auto"
            >
                <RefreshCw className="w-4 h-4" /> Retry
            </button>
        </div>
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
const Admin = () => {
    const [users, setUsers] = useState([]);
    const [bloodRequired, setBloodRequired] = useState([]);
    const [bloodDonation, setBloodDonation] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredRequired, setFilteredRequired] = useState([]);
    const [filteredDonation, setFilteredDonation] = useState([]);

    const [search, setSearch] = useState("");
    const [filterGroup, setFilterGroup] = useState("All");

    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [notification, setNotification] = useState(null);

    const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    useEffect(() => { fetchAll(); }, []);

    // ── CORRECT API URL ───────────────────────────────────────────────────────
    // Router is mounted at: /auth/dontaion
    // Route inside router:  GET /donation/api/getallusers
    // Full path:            /auth/dontaion/donation/api/getallusers
    const fetchAll = async () => {
        setLoading(true);
        setApiError(false);
        try {
            const res = await axios.get(
                `https://blooddonatio2-9.onrender.com/auth/dontaion/api/donation/api/getallusers`,
                { withCredentials: true }
            );
            console.log(res)
            const u = res.data.users || [];
            const br = res.data.bloodrequired || [];
            const bd = res.data.blooddonation || [];
            setUsers(u); setBloodRequired(br); setBloodDonation(bd);
            setFilteredUsers(u); setFilteredRequired(br); setFilteredDonation(bd);
        } catch (err) {
            console.error("API error:", err);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

    // ── Filter ────────────────────────────────────────────────────────────────
    useEffect(() => {
        const s = search.toLowerCase();
        setFilteredUsers(users.filter(u =>
            (!s || u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s) || u.phone?.includes(s)) &&
            (filterGroup === "All" || u.bloodGroup === filterGroup)
        ));
        setFilteredRequired(bloodRequired.filter(r =>
            (!s || r.name?.toLowerCase().includes(s) || r.hospital?.toLowerCase().includes(s) || r.phone?.includes(s)) &&
            (filterGroup === "All" || r.bloodGroup === filterGroup)
        ));
        setFilteredDonation(bloodDonation.filter(d =>
            (!s || d.name?.toLowerCase().includes(s) || d.location?.toLowerCase().includes(s) || d.phone?.includes(s)) &&
            (filterGroup === "All" || d.bloodGroup === filterGroup)
        ));
    }, [search, filterGroup, users, bloodRequired, bloodDonation]);

    const showNotification = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // ── Delete handlers ───────────────────────────────────────────────────────
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Remove this user?")) return;
        try {
            await axios.delete(`${API_BASE}/auth/api/donors/${id}`, { withCredentials: true });
            showNotification("User removed");
        } catch (err) {
            showNotification(err.response?.data?.message || "Failed to delete user", "error");
            return;
        }
        setUsers(p => p.filter(u => u._id !== id));
    };

    const handleDeleteRequired = async (id) => {
        if (!window.confirm("Remove this blood request?")) return;
        try {
            await axios.delete(`${API_BASE}/auth/api/bloodrequired/${id}`, { withCredentials: true });
            showNotification("Blood request removed");
        } catch (err) {
            showNotification(err.response?.data?.message || "Failed to delete request", "error");
            return;
        }
        setBloodRequired(p => p.filter(r => r._id !== id));
    };

    const handleDeleteDonation = async (id) => {
        if (!window.confirm("Remove this donation record?")) return;
        try {
            await axios.delete(`${API_BASE}/auth/api/blooddonation/${id}`, { withCredentials: true });
            showNotification("Donation record removed");
        } catch (err) {
            showNotification(err.response?.data?.message || "Failed to delete record", "error");
            return;
        }
        setBloodDonation(p => p.filter(d => d._id !== id));
    };

    const stats = [
        { icon: Users, label: "Total Users", value: users.length, color: "bg-gradient-to-br from-red-500 to-rose-600", trend: null },
        { icon: Droplet, label: "Blood Requests", value: bloodRequired.length, color: "bg-gradient-to-br from-orange-500 to-red-500", trend: null },
        { icon: Syringe, label: "Willing Donors", value: bloodDonation.length, color: "bg-gradient-to-br from-pink-500 to-rose-500", trend: null },
        { icon: CheckCircle, label: "Fulfilled Requests", value: bloodRequired.filter(r => r.status === "fulfilled").length, color: "bg-gradient-to-br from-red-600 to-pink-600", trend: null },
    ];

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: BarChart2 },
        { id: "users", label: "All Users", icon: Users },
        { id: "requests", label: "Blood Requests", icon: Droplet },
        { id: "donations", label: "Willing Donors", icon: HandHeart },
    ];

    const FilterBar = ({ placeholder }) => (
        <div className="flex gap-3 flex-wrap">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text" placeholder={placeholder || "Search..."} value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all w-52"
                />
            </div>
            <div className="relative">
                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                    value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
                    className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer"
                >
                    {bloodGroups.map(g => <option key={g}>{g}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );

    const tabTitles = {
        dashboard: "Dashboard",
        users: "All Users",
        requests: "Blood Requests",
        donations: "Willing Donors",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 flex">

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            {/* ── Sidebar ── */}
            <aside className={`${sidebarOpen ? "w-64" : "w-20"} relative z-10 transition-all duration-300 bg-white/90 backdrop-blur-lg border-r border-gray-200 flex flex-col shadow-xl min-h-screen`}>
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <Heart className="w-5 h-5 text-white fill-current" />
                        </div>
                        {sidebarOpen && (
                            <div>
                                <p className="font-black text-gray-900 text-sm leading-tight">BloodConnect</p>
                                <p className="text-xs text-red-600 font-semibold">Admin Panel</p>
                            </div>
                        )}
                    </div>
                </div>

                {sidebarOpen && (
                    <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-100">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-600" />
                            <div>
                                <p className="text-xs font-bold text-gray-800">Admin Access</p>
                                <p className="text-xs text-gray-500">Full Permissions</p>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-4 space-y-1 mt-2">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id} onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-semibold text-sm
                                ${activeTab === id
                                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"}`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all font-semibold text-sm">
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-xl font-black text-gray-900">{tabTitles[activeTab]}</h1>
                            <p className="text-xs text-gray-500">Welcome back, Admin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchAll}
                            title="Refresh data"
                            className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="relative p-2 rounded-xl hover:bg-red-50 transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                            {bloodRequired.filter(r => r.status === "urgent").length > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            )}
                        </button>
                        <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Notification toast */}
                    {notification && (
                        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white font-semibold text-sm
                            ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                            <CheckCircle className="w-4 h-4" />
                            {notification.msg}
                            <button onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
                        </div>
                    )}

                    {/* API Error banner */}
                    {apiError && !loading && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 flex items-center gap-3 text-red-700 text-sm font-medium">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>Could not connect to API. Check your backend and CORS settings.</span>
                            <button
                                onClick={fetchAll}
                                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" /> Retry
                            </button>
                        </div>
                    )}

                    {/* ── DASHBOARD ── */}
                    {activeTab === "dashboard" && (
                        <>
                            {loading ? <Spinner /> : apiError ? <ErrorState onRetry={fetchAll} /> : (
                                <>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {stats.map((s, i) => <StatCard key={i} {...s} />)}
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                        {/* Recent Users */}
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-5">
                                            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-sm">
                                                <Users className="w-4 h-4 text-red-600" /> Recent Users
                                            </h3>
                                            {users.length === 0 ? (
                                                <p className="text-xs text-gray-400 text-center py-6">No users yet</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {users.slice(0, 4).map(u => (
                                                        <div key={u._id} className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                                {u.name?.charAt(0)?.toUpperCase() || "?"}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-gray-800 truncate">{u.name}</p>
                                                                <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                                            </div>
                                                            <BloodBadge group={u.bloodGroup} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <button onClick={() => setActiveTab("users")} className="w-full mt-4 text-xs font-bold text-red-600 hover:text-red-700 text-center">
                                                View all ({users.length}) →
                                            </button>
                                        </div>

                                        {/* Recent Blood Requests */}
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-5">
                                            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-sm">
                                                <Droplet className="w-4 h-4 text-orange-600" /> Recent Requests
                                            </h3>
                                            {bloodRequired.length === 0 ? (
                                                <p className="text-xs text-gray-400 text-center py-6">No requests yet</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {bloodRequired.slice(0, 4).map(r => (
                                                        <div key={r._id} className="flex items-center gap-3">
                                                            <BloodBadge group={r.bloodGroup} />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-gray-800 truncate">{r.name}</p>
                                                                <p className="text-xs text-gray-400 truncate">{r.hospital || "—"}</p>
                                                            </div>
                                                            <StatusBadge status={r.status} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <button onClick={() => setActiveTab("requests")} className="w-full mt-4 text-xs font-bold text-orange-600 hover:text-orange-700 text-center">
                                                View all ({bloodRequired.length}) →
                                            </button>
                                        </div>

                                        {/* Willing Donors */}
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-5">
                                            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-sm">
                                                <HandHeart className="w-4 h-4 text-pink-600" /> Willing Donors
                                            </h3>
                                            {bloodDonation.length === 0 ? (
                                                <p className="text-xs text-gray-400 text-center py-6">No donors yet</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {bloodDonation.slice(0, 4).map(d => (
                                                        <div key={d._id} className="flex items-center gap-3">
                                                            <BloodBadge group={d.bloodGroup} />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-gray-800 truncate">{d.name}</p>
                                                                <p className="text-xs text-gray-400 truncate">{d.location || d.Address || "—"}</p>
                                                            </div>
                                                            <StatusBadge status={d.status} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <button onClick={() => setActiveTab("donations")} className="w-full mt-4 text-xs font-bold text-pink-600 hover:text-pink-700 text-center">
                                                View all ({bloodDonation.length}) →
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* ── ALL USERS ── */}
                    {activeTab === "users" && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-red-600" /> All Users
                                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
                                </h2>
                                <FilterBar placeholder="Search name, email, phone..." />
                            </div>
                            {loading ? <Spinner /> : apiError ? <ErrorState onRetry={fetchAll} /> : filteredUsers.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="font-semibold">{search || filterGroup !== "All" ? "No matching users" : "No users found"}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/80 text-left">
                                                {["User", "Contact", "Blood Group", "Age", "Role", "Actions"].map(h => (
                                                    <th key={h} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredUsers.map(u => (
                                                <tr key={u._id} className="hover:bg-red-50/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                                {u.name?.charAt(0)?.toUpperCase() || "?"}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-sm">{u.name}</p>
                                                                <p className="text-xs text-gray-400">{u._id?.slice(-6)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-700">{u.email}</p>
                                                        <p className="text-xs text-gray-400">{u.phone}</p>
                                                    </td>
                                                    <td className="px-6 py-4"><BloodBadge group={u.bloodGroup} /></td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{u.age ? `${u.age} yrs` : "—"}</td>
                                                    <td className="px-6 py-4"><RoleBadge role={u.role} /></td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => { setSelectedItem(u); setSelectedType("user"); }} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleDeleteUser(u._id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── BLOOD REQUESTS ── */}
                    {activeTab === "requests" && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <Droplet className="w-5 h-5 text-orange-600" /> Blood Requests
                                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{filteredRequired.length}</span>
                                </h2>
                                <FilterBar placeholder="Search name, hospital..." />
                            </div>
                            {loading ? <Spinner /> : apiError ? <ErrorState onRetry={fetchAll} /> : filteredRequired.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <Droplet className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="font-semibold">{search || filterGroup !== "All" ? "No matching requests" : "No requests found"}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/80 text-left">
                                                {["Patient", "Blood Group", "Units", "Hospital", "Phone", "Status", "Actions"].map(h => (
                                                    <th key={h} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredRequired.map(r => (
                                                <tr key={r._id} className="hover:bg-orange-50/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                                {r.name?.charAt(0)?.toUpperCase() || "?"}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                                                                <p className="text-xs text-gray-400">{r._id?.slice(-6)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4"><BloodBadge group={r.bloodGroup} /></td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{r.units || 1} unit{(r.units || 1) > 1 ? "s" : ""}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{r.hospital || "—"}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{r.phone || "—"}</td>
                                                    <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => { setSelectedItem(r); setSelectedType("required"); }} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleDeleteRequired(r._id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── WILLING DONORS ── */}
                    {activeTab === "donations" && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <HandHeart className="w-5 h-5 text-pink-600" /> Willing Donors
                                    <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-0.5 rounded-full">{filteredDonation.length}</span>
                                </h2>
                                <FilterBar placeholder="Search name, location..." />
                            </div>
                            {loading ? <Spinner /> : apiError ? <ErrorState onRetry={fetchAll} /> : filteredDonation.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <HandHeart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="font-semibold">{search || filterGroup !== "All" ? "No matching donors" : "No donation records found"}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/80 text-left">
                                                {["Donor", "Blood Group", "Location", "Hospital", "Phone", "Date", "Status", "Actions"].map(h => (
                                                    <th key={h} className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredDonation.map(d => (
                                                <tr key={d._id} className="hover:bg-pink-50/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                                {d.name?.charAt(0)?.toUpperCase() || "?"}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-sm">{d.name}</p>
                                                                <p className="text-xs text-gray-400">{d._id?.slice(-6)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4"><BloodBadge group={d.bloodGroup} /></td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{d.location || d.Address || "—"}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{d.NearestHospital || "—"}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{d.phone || "—"}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {(d.date || d.Registerday)
                                                            ? new Date(d.date || d.Registerday).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                                            : "—"}
                                                    </td>
                                                    <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => { setSelectedItem(d); setSelectedType("donation"); }} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleDeleteDonation(d._id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>

            {/* ── Detail Modal ── */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
                        <button onClick={() => setSelectedItem(null)} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <div className="text-center mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3 shadow-lg
                                ${selectedType === "user"
                                    ? "bg-gradient-to-br from-red-500 to-rose-600"
                                    : selectedType === "required"
                                        ? "bg-gradient-to-br from-orange-500 to-red-500"
                                        : "bg-gradient-to-br from-pink-500 to-rose-500"}`}>
                                {selectedItem.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <h3 className="text-xl font-black text-gray-900">{selectedItem.name}</h3>
                            {selectedItem.bloodGroup && <div className="mt-1"><BloodBadge group={selectedItem.bloodGroup} /></div>}
                        </div>

                        <div className="space-y-3">
                            {(selectedType === "user" ? [
                                { label: "Email", value: selectedItem.email },
                                { label: "Phone", value: selectedItem.phone },
                                { label: "Age", value: selectedItem.age ? `${selectedItem.age} years` : "—" },
                                { label: "Role", value: selectedItem.role || "donor" },
                                { label: "User ID", value: selectedItem._id },
                            ] : selectedType === "required" ? [
                                { label: "Hospital", value: selectedItem.hospital || "—" },
                                { label: "Units Needed", value: `${selectedItem.units || 1} unit(s)` },
                                { label: "Phone", value: selectedItem.phone || "—" },
                                { label: "Status", value: selectedItem.status || "pending" },
                                { label: "Request ID", value: selectedItem._id },
                            ] : [
                                { label: "Location", value: selectedItem.location || selectedItem.Address || "—" },
                                { label: "Nearest Hospital", value: selectedItem.NearestHospital || "—" },
                                { label: "Phone", value: selectedItem.phone || "—" },
                                { label: "Preferred Date", value: (selectedItem.date || selectedItem.Registerday) ? new Date(selectedItem.date || selectedItem.Registerday).toLocaleDateString("en-IN") : "—" },
                                { label: "Status", value: selectedItem.status || "pending" },
                                { label: "Record ID", value: selectedItem._id },
                            ]).map(({ label, value }) => (
                                <div key={label} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                    <span className="text-sm font-semibold text-gray-500">{label}</span>
                                    <span className="text-sm font-bold text-gray-800 text-right max-w-xs truncate">{value}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                if (selectedType === "user") handleDeleteUser(selectedItem._id);
                                else if (selectedType === "required") handleDeleteRequired(selectedItem._id);
                                else handleDeleteDonation(selectedItem._id);
                                setSelectedItem(null);
                            }}
                            className="w-full mt-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" /> Remove Record
                        </button>
                    </div>
                </div>
            )}

            <style >{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(20px, -30px) scale(1.1); }
                    66%       { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob            { animation: blob 7s infinite; }
                .animation-delay-2000    { animation-delay: 2s; }
            `}</style>
        </div>
    );
};

export default Admin;