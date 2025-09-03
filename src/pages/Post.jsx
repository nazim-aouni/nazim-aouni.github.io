import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavHeader from '../components/NavHeader';
import BlogFooter from '../components/BlogFooter';
import { Helmet } from 'react-helmet';
import { supabase } from '../SupabaseClient'; 

const details = {
  mail: 'cslegacy10@gmail.com',
};
//lazy loading this heavy ressource
const SyntaxHighlighter = React.lazy(() => 
  import('react-syntax-highlighter').then(mod => ({ default: mod.Prism }))
);

const Post = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      // ✅ Fetch post details
      const { data: postData, error: postError } = await supabase
        .from('post')
        .select('*')
        .eq('post_id', id)
        .single();

      if (postError) {
        console.error('Error fetching post:', postError);
        setLoading(false);
        return;
      }

      // ✅ Fetch blocks for this post
      const { data: blockData, error: blockError } = await supabase
        .from('block')
        .select('*')
        .eq('post_id', id)
        .order('orderr', { ascending: true });

      if (blockError) console.error('Error fetching blocks:', blockError);

      // ✅ Fetch keywords (via join through post_keyword)
      const { data: keywordData, error: keywordError } = await supabase
        .from('post_keyword')
        .select('keyword(keyword_id, keyword)')
        .eq('post_id', id);

      if (keywordError) console.error('Error fetching keywords:', keywordError);

      setPost(postData);
      setBlocks(blockData || []);
      setKeywords(keywordData?.map((k) => k.keyword.keyword) || []);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavHeader />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">Loading post…</p>
        </main>
        <BlogFooter contactDetails={details} />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <NavHeader />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-red-500">Post not found.</p>
        </main>
        <BlogFooter contactDetails={details} />
      </>
    );
  }

  const formattedDate = new Date(post.pub_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description || post.title} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Helmet>

      <NavHeader />

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">
              <Link
                to={`/category/${post.category}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {post.category}
              </Link>
            </span>
            •
            <span className="ml-2">{formattedDate}</span>
          </div>
          
        </header>

        {/* Post Content */}
        <article className="space-y-10">
          {blocks.map((block) => (
            <div key={block.block_id}>
              {block.type === 'text' && (
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {block.content}
                </p>
              )}
              {block.type === 'image' && (
                <img
                  className="rounded-xl shadow-md w-full object-cover"
                  src={block.content}
                  alt="Post media"
                />
              )}
              {block.type === 'code' && (
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                  <SyntaxHighlighter
                    language="javascript"
                    style={oneDark}
                    customStyle={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      borderRadius: '0.75rem',
                    }}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Author */}
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {post.author}
            </span>
          </p>
        </footer>
      </main>

      <BlogFooter contactDetails={details} />
    </>
  );
};

export default Post;
