"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneratePage() {
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Generate Your Blog Post
            </h1>
            <p className="text-slate-400">
              Enter a topic and let our AI agents create amazing content for
              you.
            </p>
          </div>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Blog Post Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Topic / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., The Future of AI in Healthcare"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Add any specific requirements, target audience, tone preferences..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                />
              </div>

              <Button className="w-full bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white py-6 text-lg rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40">
                🚀 Generate Blog Post
              </Button>
            </CardContent>
          </Card>

          {/* Agent Status Cards */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Research", icon: "🔍", status: "Ready" },
              { title: "Writer", icon: "✍️", status: "Ready" },
              { title: "Fact-Check", icon: "✓", status: "Ready" },
              { title: "Polish", icon: "✨", status: "Ready" },
            ].map((agent) => (
              <Card
                key={agent.title}
                className="bg-slate-900/30 border-slate-800"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{agent.icon}</div>
                  <div className="text-sm font-medium text-white">
                    {agent.title}
                  </div>
                  <div className="text-xs text-slate-500">{agent.status}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
