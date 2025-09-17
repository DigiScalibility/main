import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, BlogPost } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          data-ai-hint={post.imageHint}
          width={600}
          height={400}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h3 className="mt-2 font-headline text-xl font-semibold group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-muted-foreground">{post.summary}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {format(post.publishedAt.toDate(), 'MMMM d, yyyy')}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Digital Insights
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Explore our latest articles, guides, and thoughts on digital strategy, design, and development.
        </p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
