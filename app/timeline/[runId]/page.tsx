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
  id: string;
  run_id: string;
  agent_type: "research" | "writer" | "fact_checker" | "polisher";
  status: "pending" | "running" | "completed" | "failed" | "retrying";
  content: string;
  metadata?: {
    sources?: string[];
    retry_count?: number;
    error_message?: string;
    word_count?: number;
    facts_verified?: number;
    facts_flagged?: number;
  };
  created_at: string;
  completed_at?: string;
}

interface TimelineRun {
  id: string;
  topic: string;
  status: "pending" | "running" | "completed" | "failed";
  created_at: string;
  completed_at?: string;
}

// Agent configuration for display
const agentConfig = {
  research: {
    icon: "🔍",
    title: "Research Agent",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  writer: {
    icon: "✍️",
    title: "Writer Agent",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    badgeClass: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  },
  fact_checker: {
    icon: "✓",
    title: "Fact-Checker Agent",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  polisher: {
    icon: "✨",
    title: "Polisher Agent",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
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
  const [logs, setLogs] = useState<AgentLog[]>([]);
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

      // TODO: Replace with actual Supabase client
      // Example Supabase query:
      // const { data: runData, error: runError } = await supabase
      //   .from('runs')
      //   .select('*')
      //   .eq('id', runId)
      //   .single();
      //
      // const { data: logsData, error: logsError } = await supabase
      //   .from('agent_logs')
      //   .select('*')
      //   .eq('run_id', runId)
      //   .order('created_at', { ascending: true });

      // Mock data for development
      const mockRun: TimelineRun = {
        id: runId,
        topic: "The Future of AI in Healthcare",
        status: "completed",
        created_at: new Date(Date.now() - 3600000).toISOString(),
        completed_at: new Date().toISOString(),
      };

      const mockLogs: AgentLog[] = [
        {
          id: "1",
          run_id: runId,
          agent_type: "research",
          status: "completed",
          content:
            "Found 15 relevant sources about AI applications in healthcare, including recent FDA approvals, clinical trials, and expert opinions from leading medical institutions.",
          metadata: {
            sources: [
              "https://www.nature.com/articles/ai-healthcare",
              "https://www.fda.gov/ai-medical-devices",
              "https://pubmed.ncbi.nlm.nih.gov/ai-diagnostics",
            ],
          },
          created_at: new Date(Date.now() - 3500000).toISOString(),
          completed_at: new Date(Date.now() - 3400000).toISOString(),
        },
        {
          id: "2",
          run_id: runId,
          agent_type: "writer",
          status: "completed",
          content:
            "Generated a comprehensive 1,500-word article covering AI diagnostics, drug discovery, personalized medicine, and ethical considerations in healthcare AI.",
          metadata: {
            word_count: 1523,
          },
          created_at: new Date(Date.now() - 3300000).toISOString(),
          completed_at: new Date(Date.now() - 3000000).toISOString(),
        },
        {
          id: "3",
          run_id: runId,
          agent_type: "fact_checker",
          status: "completed",
          content:
            "Verified all statistical claims and citations. Found 2 claims that needed additional sourcing. All facts now verified with primary sources.",
          metadata: {
            facts_verified: 12,
            facts_flagged: 2,
            retry_count: 1,
          },
          created_at: new Date(Date.now() - 2900000).toISOString(),
          completed_at: new Date(Date.now() - 2500000).toISOString(),
        },
        {
          id: "4",
          run_id: runId,
          agent_type: "polisher",
          status: "completed",
          content:
            "Final polish complete. Improved readability score from 65 to 78. Added SEO-optimized headings, meta description, and internal linking suggestions.",
          metadata: {
            word_count: 1547,
          },
          created_at: new Date(Date.now() - 2400000).toISOString(),
          completed_at: new Date(Date.now() - 2200000).toISOString(),
        },
      ];

      setRun(mockRun);
      setLogs(mockLogs);
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
                  Run ID: {run.id.slice(0, 8)}...
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {run.topic}
              </h1>
              <div className="flex gap-4 text-sm text-slate-400">
                <span>Started: {formatTimestamp(run.created_at)}</span>
                {run.completed_at && (
                  <>
                    <span>•</span>
                    <span>
                      Duration:{" "}
                      {calculateDuration(run.created_at, run.completed_at)}
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
                const config = agentConfig[log.agent_type];
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
                          {log.completed_at && (
                            <span>
                              • Duration:{" "}
                              {calculateDuration(
                                log.created_at,
                                log.completed_at
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
