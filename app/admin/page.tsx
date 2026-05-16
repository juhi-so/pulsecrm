"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

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

  const updateStatus = async (id: number, status: string) => {
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

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-violet-400 uppercase tracking-[0.2em] text-sm mb-2">
              NexCRM Dashboard
            </p>

            <h1 className="text-5xl font-black leading-tight">
              Leads Overview
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-6 py-4">
            <p className="text-sm text-gray-400">Total Leads</p>
            <h2 className="text-3xl font-bold mt-1">{leads.length}</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-300">
                    Name
                  </th>

                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-300">
                    Email
                  </th>

                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-300">
                    Company
                  </th>

                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-300">
                    Created
                  </th>

                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-12 text-gray-400"
                    >
                      Loading leads...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-12 text-gray-400"
                    >
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead:any) => (
                    <tr
                      key={lead.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-all"
                    >
                      <td className="px-6 py-5 font-medium">{lead.name}</td>

                      <td className="px-6 py-5 text-gray-300">
                        {lead.email}
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {lead.company}
                      </td>

                      <td className="px-6 py-5 text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <select
  value={lead.status}
  onChange={(e) => updateStatus(lead.id, e.target.value)}
  className="bg-[#111827] border border-white/10 rounded-xl px-3 py-2 text-sm"
>
  <option>New Lead</option>
  <option>Contacted</option>
  <option>Interested</option>
  <option>Demo Scheduled</option>
  <option>Closed</option>
</select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


