import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm fixed w-full z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-cyan-500 rounded-lg" />
              <span className="text-xl font-bold text-white">ContentOps</span>
            </div>
            <Link href="/generate">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-600 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20">
            ✨ Powered by Multi-Agent AI
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Generate Blog Posts
            <br />
            <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              10x Faster
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our AI-powered multi-agent system researches, writes, fact-checks,
            and polishes your content — delivering publish-ready blog posts in
            minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:scale-105 cursor-pointer"
              >
                Start Generating →
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-600 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-xl cursor-pointer"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Agent Pipeline Visual */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Research",
                desc: "AI scours the web for relevant data",
                icon: "🔍",
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Write",
                desc: "Expert writer agent crafts your content",
                icon: "✍️",
                color: "from-violet-500 to-purple-500",
              },
              {
                step: "03",
                title: "Fact-Check",
                desc: "Verifies claims & adds citations",
                icon: "✓",
                color: "from-emerald-500 to-green-500",
              },
              {
                step: "04",
                title: "Polish",
                desc: "Final touches for perfection",
                icon: "✨",
                color: "from-amber-500 to-orange-500",
              },
            ].map((agent, index) => (
              <div key={agent.step} className="relative">
                <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all hover:scale-105 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${agent.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {agent.icon}
                    </div>
                    <div className="text-xs text-slate-500 font-mono mb-1">
                      STEP {agent.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {agent.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{agent.desc}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-slate-700 z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose ContentOps?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for content creators, marketers, and businesses who need
              quality content at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "Multi-Agent Intelligence",
                description:
                  "Four specialized AI agents work together, each focusing on what they do best — research, writing, fact-checking, and polishing.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Generate comprehensive, well-researched blog posts in minutes instead of hours. Scale your content production effortlessly.",
              },
              {
                icon: "🎯",
                title: "SEO Optimized",
                description:
                  "Every article is crafted with SEO best practices in mind, helping your content rank higher and reach more readers.",
              },
              {
                icon: "✅",
                title: "Fact-Checked & Cited",
                description:
                  "Our fact-checker agent verifies claims and adds proper citations, ensuring your content is accurate and trustworthy.",
              },
              {
                icon: "🎨",
                title: "Your Voice, Amplified",
                description:
                  "Customize tone, style, and format to match your brand. The AI adapts to your unique voice and requirements.",
              },
              {
                icon: "📊",
                title: "Research-Backed",
                description:
                  "Every article starts with deep web research, ensuring your content is informed by the latest data and trends.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/50"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-linear-to-r from-violet-600/20 to-cyan-600/20 border-violet-500/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-r from-violet-600/10 to-cyan-600/10 blur-3xl" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Content?
              </h2>
              <p className="text-white max-w-xl mx-auto mb-8">
                Join thousands of content creators who are already using AI to
                produce better content, faster.
              </p>
              <Link href="/generate">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  Generate Your First Post — Free →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-linear-to-br from-violet-700 to-cyan-700 rounded-md" />
            <span className="text-slate-400">ContentOps © 2025</span>
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
