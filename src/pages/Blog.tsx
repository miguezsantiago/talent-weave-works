import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { getAllPosts, formatDate } from "@/lib/blog";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Seo
        title="Blog | Meiba Talent"
        description="Ideas, datos y guías sobre headhunting tecnológico, contratación y talento tech en Argentina y LATAM."
        path="/blog"
      />
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-primary font-medium mb-3">Blog</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Talento tech, sin vueltas.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Datos, criterios y guías prácticas sobre contratación tecnológica en Argentina y la región.
            </p>
          </motion.header>

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">Muy pronto, los primeros artículos.</p>
          ) : (
            <div className="grid gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-2xl border border-border p-6 md:p-8 hover:shadow-card hover:border-primary/40 transition-all"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} /> {post.readingMinutes} min
                      </span>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Leer artículo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
