import Link from "next/link";
import { format, parseISO } from "date-fns";
import { allBlogs } from "contentlayer/generated";

function PostCard(post) {
  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <h2 className="text-lg">
        <Link href={post.slug} className="text-blue-700 hover:text-blue-900">
          {post.title}
        </Link>
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="mb-8 text-3xl font-bold">Contentlayer Blog Example</h1>

      {allBlogs.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
