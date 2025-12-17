"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Types for agent logs
interface AgentLog {
  id: number;
  run_id: string;
  agent:
    | "researcher"
    | "writer_agent"
    | "fact_checker_agent"
    | "polisher_agent";
  input: string;
  output: string;
  metadata?: {
    sources?: string[];
    retry_count?: number;
    error_message?: string;
    word_count?: number;
    facts_verified?: number;
    facts_flagged?: number;
  };
  created_at: string;
}

interface TimelineRun {
  id: number;
  run_id: string;
  agent:
    | "researcher"
    | "writer_agent"
    | "fact_checker_agent"
    | "polisher_agent";
  content: string;
  status: "completed";
  metadata?: {
    sources?: string[];
    retry_count?: number;
    error_message?: string;
    word_count?: number;
    facts_verified?: number;
    facts_flagged?: number;
  };
  created_at: string;
}

function TransformData(backEndLog: AgentLog): TimelineRun {
  return {
    id: backEndLog.id,
    run_id: backEndLog.run_id,
    agent: backEndLog.agent,
    status: "completed",
    content: backEndLog.output,
    metadata: backEndLog.metadata,
    created_at: backEndLog.created_at,
  };
}

// Agent configuration for display
const agentConfig: Record<
  string,
  {
    icon: string;
    title: string;
    color: string;
    bgColor: string;
    borderColor: string;
    badgeClass: string;
  }
> = {
  researcher: {
    icon: "🔍",
    title: "Research Agent",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  writer_agent: {
    icon: "✍️",
    title: "Writer Agent",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    badgeClass: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  },
  fact_checker_agent: {
    icon: "✓",
    title: "Fact-Checker Agent",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  polisher_agent: {
    icon: "✨",
    title: "Polisher Agent",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
};

const defaultAgentConfig = {
  icon: "🤖",
  title: "Unknown Agent",
  color: "from-slate-500 to-slate-600",
  bgColor: "bg-slate-500/10",
  borderColor: "border-slate-500/30",
  badgeClass: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};
// Status badge configuration
const statusConfig = {
  pending: {
    label: "Pending",
    class: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
  running: {
    label: "Running",
    class: "bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse",
  },
  completed: {
    label: "Completed",
    class: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  failed: {
    label: "Failed",
    class: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  retrying: {
    label: "Retrying",
    class:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse",
  },
};

export default function TimelinePage() {
  const params = useParams();
  const runId = params.runId as string;

  const [run, setRun] = useState<TimelineRun | null>(null);
  const [logs, setLogs] = useState<TimelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (runId) {
      fetchTimelineData();
    }
  }, [runId]);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      setError(null);

      const logsResponse = await fetch(
        `http://localhost:8000/api/runs/${runId}/logs`
      ); // TODO: Replace with actual Supabase client
      if (!logsResponse.ok) {
        throw new Error("Failed to fetch timeline logs");
      }
      const logsData = await logsResponse.json();

      const transformedLogs = logsData.logs.map((log: AgentLog) => {
        return TransformData(log);
      });
      setLogs(transformedLogs);

      // TODO: Replace with actual Supabase client
    } catch (err) {
      setError("Failed to fetch timeline data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return "In progress...";
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="bg-red-500/10 border-red-500/30 max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button
              onClick={fetchTimelineData}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm fixed w-full z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-cyan-500 rounded-lg" />
              <span className="text-xl font-bold text-white">ContentOps</span>
            </Link>
            <div className="flex gap-3">
              <Link href="/generate">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-600 hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  New Post
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-600 hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Run Header */}
          {run && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={statusConfig[run.status].class}>
                  {statusConfig[run.status].label}
                </Badge>
                <span className="text-slate-500 text-sm">
                  Run ID: {Number(run.id).toString().slice(0, 8)}...
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {run.content.slice(0, 50)}...
              </h1>
              <div className="flex gap-4 text-sm text-slate-400">
                <span>Started: {formatTimestamp(run.created_at)}</span>
                {run.created_at && (
                  <>
                    <span>•</span>
                    <span>
                      Duration:{" "}
                      {calculateDuration(run.created_at, run.created_at)}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <Separator className="bg-slate-800 mb-8" />

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {logs.map((log, index) => {
                const config = agentConfig[log.agent];
                const status = statusConfig[log.status];

                return (
                  <div key={log.id} className="relative pl-16">
                    {/* Timeline Node */}
                    <div
                      className={`absolute left-3 w-7 h-7 rounded-full bg-linear-to-br ${config.color} flex items-center justify-center text-sm shadow-lg`}
                    >
                      {config.icon}
                    </div>

                    {/* Card */}
                    <Card
                      className={`${config.bgColor} ${config.borderColor} border`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-white flex items-center gap-2">
                            {config.title}
                            {log.metadata?.retry_count &&
                              log.metadata.retry_count > 0 && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs"
                                >
                                  🔄 {log.metadata.retry_count} retry
                                </Badge>
                              )}
                          </CardTitle>
                          <Badge className={status.class}>{status.label}</Badge>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span>{formatTimestamp(log.created_at)}</span>
                          {log.created_at && (
                            <span>
                              • Duration:{" "}
                              {calculateDuration(
                                log.created_at,
                                log.created_at
                              )}
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 mb-4">{log.content}</p>

                        {/* Metadata Display */}
                        {log.metadata && (
                          <div className="flex flex-wrap gap-3 text-xs">
                            {log.metadata.word_count && (
                              <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                                📝 {log.metadata.word_count} words
                              </span>
                            )}
                            {log.metadata.facts_verified !== undefined && (
                              <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                                ✅ {log.metadata.facts_verified} facts verified
                              </span>
                            )}
                            {log.metadata.facts_flagged !== undefined &&
                              log.metadata.facts_flagged > 0 && (
                                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">
                                  ⚠️ {log.metadata.facts_flagged} flagged
                                </span>
                              )}
                            {log.metadata.sources &&
                              log.metadata.sources.length > 0 && (
                                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                                  🔗 {log.metadata.sources.length} sources
                                </span>
                              )}
                          </div>
                        )}

                        {/* Sources Expandable */}
                        {log.metadata?.sources &&
                          log.metadata.sources.length > 0 && (
                            <details className="mt-4">
                              <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300">
                                View Sources ({log.metadata.sources.length})
                              </summary>
                              <ScrollArea className="h-32 mt-2 rounded bg-slate-900/50 p-3">
                                <ul className="space-y-2">
                                  {log.metadata.sources.map((source, i) => (
                                    <li key={i}>
                                      <a
                                        href={source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-cyan-400 hover:text-cyan-300 break-all"
                                      >
                                        {source}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </ScrollArea>
                            </details>
                          )}
                      </CardContent>
                    </Card>

                    {/* Connector Arrow */}
                    {index < logs.length - 1 && (
                      <div className="absolute left-5 -bottom-3 text-slate-600">
                        ↓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          {run?.status === "completed" && (
            <div className="mt-10 flex justify-center gap-4">
              <Button className="bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white cursor-pointer ">
                View Final Post
              </Button>
              <Button
                variant="outline"
                className="bg-white text-slate-900 hover:bg-slate-100 rounded-sm font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                Export as Markdown
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
