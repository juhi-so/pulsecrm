"use client";

import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { supabase } from "@/lib/supabase";

const columns = [
  "New Lead",
  "Contacted",
  "Interested",
  "Demo Scheduled",
  "Closed",
];

export default function KanbanPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*");

    if (data) {
      setLeads(data);
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const leadId = result.draggableId;

    const newStatus =
      result.destination.droppableId;

    await supabase
      .from("leads")
      .update({
        status: newStatus,
      })
      .eq("id", leadId);

    fetchLeads();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <div className="mb-8">
        <p className="text-violet-400 uppercase tracking-[0.2em] text-sm mb-2">
          NexCRM
        </p>

        <h1 className="text-5xl font-black">
          Sales Pipeline
        </h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

          {columns.map((column) => {

            const columnLeads = leads.filter(
              (lead) =>
                lead.status === column
            );

            return (
              <Droppable
                droppableId={column}
                key={column}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white/5 border border-white/10 rounded-3xl p-4 min-h-[600px]"
                  >

                    <div className="flex items-center justify-between mb-5">

                      <h2 className="font-bold text-lg">
                        {column}
                      </h2>

                      <div className="bg-violet-500/20 text-violet-300 text-sm px-3 py-1 rounded-full">
                        {columnLeads.length}
                      </div>

                    </div>

                    <div className="space-y-4">

                      {columnLeads.map(
                        (lead, index) => (

                          <Draggable
                            draggableId={lead.id.toString()}
                            index={index}
                            key={lead.id}
                          >
                            {(provided) => (
                              <div
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl hover:bg-white/[0.08] transition-all"
                              >

                                <div className="flex items-start justify-between mb-3">

                                  <div>
                                    <h3 className="font-semibold text-base">
                                      {lead.name}
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">
                                      {lead.company}
                                    </p>
                                  </div>

                                  <div
                                    className={`text-xs px-2 py-1 rounded-full border ${
                                      lead.priority ===
                                      "High"
                                        ? "bg-red-500/10 text-red-300 border-red-500/20"
                                        : lead.priority ===
                                          "Medium"
                                        ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                                        : "bg-green-500/10 text-green-300 border-green-500/20"
                                    }`}
                                  >
                                    {lead.priority ||
                                      "Medium"}
                                  </div>

                                </div>

                                <div className="space-y-2 text-sm">

                                  <p className="text-gray-300">
                                    {lead.email}
                                  </p>

                                  <div className="flex items-center justify-between">

                                    <span className="text-violet-300 text-xs bg-violet-500/10 px-2 py-1 rounded-full">
                                      {lead.source ||
                                        "Website"}
                                    </span>

                                    {lead.follow_up_date && (
                                      <span className="text-xs text-gray-400">
                                        Follow-up:
                                        {" "}
                                        {
                                          lead.follow_up_date
                                        }
                                      </span>
                                    )}

                                  </div>

                                  {lead.notes && (
                                    <div className="bg-black/20 rounded-xl p-3 mt-3 text-xs text-gray-300">
                                      {lead.notes}
                                    </div>
                                  )}

                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}

                      {provided.placeholder}

                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}