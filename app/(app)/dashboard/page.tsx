"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Post = {
  id: string;
  run_id: string;
  prd_content: string;
  created_at: string;
  fact_check_passed: boolean;
  retry_count: number;
};

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const postsData = await response.json();
      setPosts(Array.isArray(postsData) ? postsData : postsData.posts || []);
      setIsLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats
  const totalPosts = posts.length;
  const successfulPosts = posts.filter((p) => p.fact_check_passed).length;
  const successRate =
    totalPosts > 0 ? Math.round((successfulPosts / totalPosts) * 100) : 0;
  const avgRetries =
    totalPosts > 0
      ? (posts.reduce((acc, p) => acc + p.retry_count, 0) / totalPosts).toFixed(
          1
        )
      : "0";

  // Loading skeleton
  if (isLoading) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="animate-pulse">
            <div className="h-10 bg-slate-800 rounded-lg w-80 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-800 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-800 rounded-xl"></div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-red-900/20 border-red-800/50">
            <CardContent className="py-12 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Failed to load dashboard
              </h3>
              <p className="text-red-400 mb-6">{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  fetchPosts();
                }}
                className="bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 cursor-pointer"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">
              Track your content generation performance
            </p>
          </div>
          <Link href="/generate" className="mt-4 sm:mt-0">
            <Button className="bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:scale-105 cursor-pointer">
              <span className="mr-2">✍️</span> Generate New Post
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Posts */}
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-400 text-sm font-medium">
                  Total Posts
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg shadow-lg shadow-blue-500/20">
                  📊
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">
                {totalPosts}
              </div>
              <p className="text-sm text-slate-500">Generated blog posts</p>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-400 text-sm font-medium">
                  Success Rate
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-green-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-400 mb-1">
                {successRate}%
              </div>
              <p className="text-sm text-slate-500">Fact-check pass rate</p>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${successRate}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Average Retries */}
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-400 text-sm font-medium">
                  Avg Retries
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-500 flex items-center justify-center text-lg shadow-lg shadow-violet-500/20">
                  🔄
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-violet-400 mb-1">
                {avgRetries}
              </div>
              <p className="text-sm text-slate-500">Per successful post</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table/List */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="border-b border-slate-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-xl">📝</span> Recent Posts
              </CardTitle>
              {posts.length > 0 && (
                <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                  {posts.length} total
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {posts.length === 0 ? (
              // Empty state
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Generate your first blog post to see it here. Our AI agents
                  will research, write, fact-check, and polish your content.
                </p>
                <Link href="/generate">
                  <Button className="bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:scale-105 px-8 py-6 text-lg rounded-xl cursor-pointer">
                    <span className="mr-2">✍️</span> Generate Your First Post
                  </Button>
                </Link>
              </div>
            ) : (
              // Posts list
              <div className="divide-y divide-slate-800">
                {posts.map((post, index) => {
                  const topic =
                    post.prd_content
                      ?.split("\n")[0]
                      .replace(/^Topic:\s*/i, "")
                      .trim()
                      .slice(0, 60) || `Post #${post.run_id.slice(0, 8)}`;

                  return (
                    <div
                      key={post.id}
                      className="p-4 hover:bg-slate-800/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-slate-300 font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-medium group-hover:text-violet-400 transition-colors">
                              {topic}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              post.fact_check_passed
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }
                          >
                            {post.fact_check_passed
                              ? "✓ Verified"
                              : "⚠ Pending"}
                          </Badge>
                          <Badge className="bg-slate-800 text-slate-400">
                            {post.retry_count} retries
                          </Badge>
                          <Link href={`/timeline/${post.run_id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                            >
                              View →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Tips Card */}
        <Card className="mt-8 bg-slate-900/50 border-violet-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/10 to-cyan-600/10" />
          <CardContent className="py-6 relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xl shrink-0">
                💡
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Pro Tip</h4>
                <p className="text-slate-400 text-sm">
                  For best results, provide specific topics with context. For
                  example, instead of &quot;AI&quot;, try &quot;How AI is
                  transforming healthcare diagnostics in 2025&quot;. More
                  context helps our agents create more targeted, valuable
                  content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
