import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { getPostBySlug, formatDate } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen">
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        article={{ publishedTime: post.date, author: post.author, tags: post.tags }}
      />
      <Navbar />

      <main className="pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Volver al blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-4">
              <span>{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} /> {post.readingMinutes} min de lectura
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            {post.description && (
              <p className="text-xl text-muted-foreground mt-4">{post.description}</p>
            )}
          </header>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-14 rounded-2xl bg-azul-profundo text-background p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-2">¿Necesitás sumar talento tech?</h3>
            <p className="opacity-70 mb-6">Primera terna en 72 hs. Hablemos.</p>
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Quiero que me contacten
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
