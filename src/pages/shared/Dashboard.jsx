import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useRequests } from "../../hooks/useRequests";
import StatusBadge from "../../components/common/StatusBadge";
import Spinner from "../../components/common/Spinner";
import Avatar from "../../components/common/Avatar";
import {
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const { requests, fetchRequests, stats } = useRequests();

  useEffect(() => {
    fetchRequests();
  }, [state.user]);

  const isWorker = state.role === "worker";
  const recentRequests = requests.slice(0, 5);

  if (state.loading) return <Spinner text="Dashboard la rarayo..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Soo dhawoow, {state.profile?.full_name?.split(" ")[0]}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5 capitalize">
            {isWorker ? "Xirfadlaha" : "Macmiilka"} Dashboard
          </p>
        </div>
        {!isWorker && (
          <Link
            to="/my-requests"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
          >
            <Plus size={17} />
            Codsi Cusub
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Wadar"
          value={stats.total}
          color="bg-blue-500"
        />
        <StatCard
          icon={Clock}
          label="Sugitaanka"
          value={stats.pending}
          color="bg-amber-500"
        />
        <StatCard
          icon={CheckCircle}
          label="Dhammaystay"
          value={stats.complete}
          color="bg-emerald-500"
        />
        <StatCard
          icon={XCircle}
          label="Diidmo"
          value={stats.reject}
          color="bg-red-500"
        />
      </div>
      {isWorker && stats.pending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <Clock size={20} className="text-amber-500 shrink-0" />
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">{stats.pending} codsi</span> ayaa
            sugaya jawaabta.{" "}
            <Link to="/all-requests" className="underline font-medium">
              Hadda eeg
            </Link>
          </p>
        </div>
      )}
      {/* Recent requests */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Codsiyada Dambe</h2>
          <Link
            to={isWorker ? "/all-requests" : "/my-requests"}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
          >
            Dhammaan Arag <ArrowRight size={14} />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="py-16 text-center">
            <ClipboardList size={40} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">Wali codsi ma jiro</p>
            {!isWorker && (
              <Link
                to="/my-requests/new"
                className="mt-3 inline-flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:underline"
              >
                <Plus size={15} /> Codsikaaga koowaad abuur
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {req.title}
                    </p>
                    {isWorker && req.profiles && (
                      <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                        <Avatar name={req.profiles.full_name} size="sm" />
                        {req.profiles.full_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {req.category} •{" "}
                    {new Date(req.created_at).toLocaleDateString("so-SO")}
                  </p>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Worker tip */}
    </div>
  );
}
