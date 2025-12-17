"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { MarkdownContent } from "@/components/MarkDownContent";

const formSchema = z.object({
  topic: z
    .string()
    .min(1, "Topic is required")
    .min(3, "Topic must be at least 3 characters"),
  instructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
  run_id: string;
  retry_count: number;
  fact_check_passed: boolean;
  final_post: string;
};

export default function GeneratePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      instructions: "",
    },
  });

  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const prdContent = values.instructions
        ? `${values.topic}\n\nAdditional Instructions: ${values.instructions}`
        : values.topic;

      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prd_content: prdContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog post");
      }

      const data = await response.json();

      setResult(data);

      console.log("Generated Blog Post:", data);
      form.reset();
      setIsLoading(false);
    } catch (error) {
      form.setError("root", {
        message: "Failed to generate content. Please try again.",
      });
      setIsLoading(false);
    }
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
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">
                          Topic / Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., The Future of AI in Healthcare"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-500">
                          Enter the main topic or title for your blog post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">
                          Additional Instructions (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Add any specific requirements, target audience, tone preferences..."
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-500">
                          Provide any additional context or preferences for the
                          AI.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white py-6 text-lg rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 cursor-pointer"
                    disabled={isLoading}
                  >
                    🚀 Generate Blog Post
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Agent Status Cards */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* Success Message */}
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
                <h2 className="text-green-400 text-xl font-bold mb-2">
                  ✓ Blog Post Generated Successfully!
                </h2>
                <p className="text-green-500/80 text-sm">
                  Run ID: {result.run_id}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-white">
                      {result.retry_count}
                    </div>
                    <div className="text-xs text-slate-500">Retries</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-white">
                      {result.fact_check_passed ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-slate-500">Fact Check</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-white">
                      {result.final_post.length}
                    </div>
                    <div className="text-xs text-slate-500">Characters</div>
                  </CardContent>
                </Card>
              </div>

              {/* Final Post */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Final Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-800/50 rounded-lg p-6 text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
                    <MarkdownContent content={result.final_post} />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setResult(null);
                    form.reset();
                  }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700"
                >
                  Generate Another
                </Button>
                <Link href={`/timeline/${result.run_id}`} className="flex-1">
                  <Button className="w-full bg-linear-to-r from-violet-600 to-cyan-600">
                    View Timeline →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
