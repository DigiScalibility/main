import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BlogHighlight({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }
  
  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              From the Blog
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Insights on growth, technology, and digital strategy from our team of experts.
            </p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0 btn">
            <Link href="/blog">
              View All Posts <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <Card className="flex flex-col h-full overflow-hidden card">
                <CardHeader className="p-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    data-ai-hint={post.imageHint}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex gap-2 mb-2">
                        {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                    <h3 className="font-headline text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {format(post.publishedAt.toDate(), "MMMM d, yyyy")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
