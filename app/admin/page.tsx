"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchLeads();
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
    }
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setLeads(data);
    }

    setLoading(false);
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      fetchLeads();
    }
  };

  const updateNotes = async (
    id: number,
    notes: string
  ) => {
    await supabase
      .from("leads")
      .update({ notes })
      .eq("id", id);
  };

  const updateFollowUp = async (
    id: number,
    follow_up_date: string
  ) => {
    await supabase
      .from("leads")
      .update({ follow_up_date })
      .eq("id", id);
  };

  const updateSource = async (
    id: number,
    source: string
  ) => {
    await supabase
      .from("leads")
      .update({ source })
      .eq("id", id);
  };

  const updatePriority = async (
    id: number,
    priority: string
  ) => {
    await supabase
      .from("leads")
      .update({ priority })
      .eq("id", id);
  };

  const deleteLead = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.company
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const interestedLeads = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const conversionRate =
    leads.length > 0
      ? (
          (closedLeads / leads.length) *
          100
        ).toFixed(1)
      : 0;

  const chartData = [
    {
      status: "New",
      count: leads.filter(
        (lead) => lead.status === "New Lead"
      ).length,
    },

    {
      status: "Contacted",
      count: leads.filter(
        (lead) => lead.status === "Contacted"
      ).length,
    },

    {
      status: "Interested",
      count: leads.filter(
        (lead) => lead.status === "Interested"
      ).length,
    },

    {
      status: "Demo",
      count: leads.filter(
        (lead) =>
          lead.status === "Demo Scheduled"
      ).length,
    },

    {
      status: "Closed",
      count: leads.filter(
        (lead) => lead.status === "Closed"
      ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-8">
      <div className="max-w-[96vw] mx-auto">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">

         <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

  <div>
    <p className="text-violet-400 uppercase tracking-[0.2em] text-sm mb-3">
      NexCRM Dashboard
    </p>

    <h1 className="text-4xl md:text-5xl font-black leading-tight">
      Leads Overview
    </h1>
  </div>

  <button
    onClick={() => router.push("/kanban")}
    className="bg-violet-600 hover:bg-violet-700 transition-all px-5 py-3 rounded-2xl font-medium text-sm shadow-lg shadow-violet-500/20"
  >
    Open Kanban Pipeline
  </button>

  <button
  onClick={async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }}
  className="bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition-all px-5 py-3 rounded-2xl font-medium text-sm"
>
  Logout
</button>

</div>

          {/* ANALYTICS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 min-w-[140px]">
              <p className="text-gray-400 text-xs mb-2">
                Total Leads
              </p>

              <h2 className="text-2xl font-bold">
                {leads.length}
              </h2>
            </div>

            <div className="bg-violet-500/10 border border-violet-500/20 rounded-3xl p-4 min-w-[140px]">
              <p className="text-violet-300 text-xs mb-2">
                Interested
              </p>

              <h2 className="text-2xl font-bold text-violet-200">
                {interestedLeads}
              </h2>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-4 min-w-[140px]">
              <p className="text-emerald-300 text-xs mb-2">
                Closed
              </p>

              <h2 className="text-2xl font-bold text-emerald-200">
                {closedLeads}
              </h2>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-4 min-w-[140px]">
              <p className="text-orange-300 text-xs mb-2">
                Conversion
              </p>

              <h2 className="text-2xl font-bold text-orange-200">
                {conversionRate}%
              </h2>
            </div>

          </div>
        </div>

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 w-full md:w-80 text-sm text-white outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white w-full md:w-56"
          >
            <option
              value="All"
              className="text-black"
            >
              All
            </option>

            <option
              value="New Lead"
              className="text-black"
            >
              New Lead
            </option>

            <option
              value="Contacted"
              className="text-black"
            >
              Contacted
            </option>

            <option
              value="Interested"
              className="text-black"
            >
              Interested
            </option>

            <option
              value="Demo Scheduled"
              className="text-black"
            >
              Demo Scheduled
            </option>

            <option
              value="Closed"
              className="text-black"
            >
              Closed
            </option>
          </select>
        </div>

     

        {/* TABLE */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 bg-white/5 text-xs">

                <th className="text-left px-3 py-4 text-gray-300">
                  Name
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Email
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Company
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Created
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Notes
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Follow Up
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Source
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Priority
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Status
                </th>

                <th className="text-left px-3 py-4 text-gray-300">
                  Delete
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-12 text-gray-400"
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-12 text-gray-400"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(
                  (lead: any) => (

                    <tr
                      key={lead.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-all text-sm"
                    >

                      <td className="px-3 py-4 whitespace-nowrap">
                        {lead.name}
                      </td>

                      <td className="px-3 py-4 text-gray-300 whitespace-nowrap">
                        {lead.email}
                      </td>

                      <td className="px-3 py-4 text-gray-300 whitespace-nowrap">
                        {lead.company}
                      </td>

                      <td className="px-3 py-4 text-gray-400 whitespace-nowrap">
                        {new Date(
                          lead.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-3 py-4">
                        <textarea
                          defaultValue={
                            lead.notes || ""
                          }
                          onBlur={(e) =>
                            updateNotes(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs w-36 h-16 resize-none"
                        />
                      </td>

                      <td className="px-3 py-4">
                        <input
                          type="date"
                          defaultValue={
                            lead.follow_up_date ||
                            ""
                          }
                          onChange={(e) =>
                            updateFollowUp(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs w-32"
                        />
                      </td>

                      <td className="px-3 py-4">
                        <select
                          value={
                            lead.source ||
                            "Website"
                          }
                          onChange={(e) =>
                            updateSource(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-xs w-28"
                        >
                          <option>
                            Website
                          </option>

                          <option>
                            Instagram
                          </option>

                          <option>
                            LinkedIn
                          </option>

                          <option>
                            Referral
                          </option>
                        </select>
                      </td>

                      <td className="px-3 py-4">
                        <select
                          value={
                            lead.priority ||
                            "Medium"
                          }
                          onChange={(e) =>
                            updatePriority(
                              lead.id,
                              e.target.value
                            )
                          }
                          className={`rounded-lg px-2 py-2 text-xs w-24 border ${
                            lead.priority ===
                            "High"
                              ? "bg-red-500/10 text-red-300 border-red-500/20"
                              : lead.priority ===
                                "Medium"
                              ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                              : "bg-green-500/10 text-green-300 border-green-500/20"
                          }`}
                        >
                          <option>
                            High
                          </option>

                          <option>
                            Medium
                          </option>

                          <option>
                            Low
                          </option>
                        </select>
                      </td>

                      <td className="px-3 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="bg-[#111827] border border-white/10 rounded-lg px-2 py-2 text-xs w-32"
                        >
                          <option>
                            New Lead
                          </option>

                          <option>
                            Contacted
                          </option>

                          <option>
                            Interested
                          </option>

                          <option>
                            Demo Scheduled
                          </option>

                          <option>
                            Closed
                          </option>
                        </select>
                      </td>

                      <td className="px-3 py-4">
                        <button
                          onClick={() =>
                            deleteLead(
                              lead.id
                            )
                          }
                          className="bg-red-500/10 border border-red-500/20 text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/20 transition-all text-xs"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}