import { getBlogPosts, getPost, BlogPost } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTeam } from '@/lib/data';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const team = await getTeam();
  const author = team.find(member => member.name === post.author);

  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          {author && (
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">
              {format(post.publishedAt.toDate(), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
        <Image
          src={post.imageUrl}
          alt={post.title}
          data-ai-hint={post.imageHint}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-invert max-w-none prose-lg mx-auto">
        {/* This is where you would render your markdown content */}
        <p>{post.content}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
        <p>Vestibulum diam quam, mollis vitae, consectetuer in, pretium vel, mauris. Curabitur placerat, nisl quis pellentesque scelerisque, nunc sem egestas enim, et consectetuer elit augue sit amet erat. Ut id magna. Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nunc interdum lacus sit amet orci. Vestibulum sed ante. Donec sagittis euismod purus.</p>
      </div>
    </article>
  );
}
