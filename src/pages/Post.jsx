import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavHeader from '../components/NavHeader';
import BlogFooter from '../components/BlogFooter';
import { Helmet } from 'react-helmet';
import { supabase } from '../SupabaseClient';

const details = {
  mail: 'cslegacy10@gmail.com',
};

// Lazy loading the heavy resource
const SyntaxHighlighter = React.lazy(() =>
  import('react-syntax-highlighter').then((mod) => ({ default: mod.Prism }))
);

// Fetch function with all queries
const fetchPostData = async (id) => {
  const [postRes, blockRes, keywordRes] = await Promise.all([
    supabase.from('post').select('*').eq('post_id', id).single(),
    supabase
      .from('block')
      .select('*')
      .eq('post_id', id)
      .order('orderr', { ascending: true }),
    supabase
      .from('post_keyword')
      .select('keyword(keyword_id, keyword)')
      .eq('post_id', id),
  ]);

  if (postRes.error) throw postRes.error;

  return {
    post: postRes.data,
    blocks: blockRes.data || [],
    keywords: keywordRes.data?.map((k) => k.keyword.keyword) || [],
  };
};

const Post = () => {
  const { id } = useParams();

  // React Query hook
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(['postData', id], () => fetchPostData(id), {
    staleTime: 1000 * 60 * 5, // cache considered fresh for 5 mins
    cacheTime: 1000 * 60 * 10, // data stays in cache for 10 mins
    retry: 1, // retry once if fail
  });

  if (isLoading) {
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

  if (isError || !data?.post) {
    return (
      <>
        <NavHeader />
        <main className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-red-500">
            {error?.message || 'Post not found.'}
          </p>
        </main>
        <BlogFooter contactDetails={details} />
      </>
    );
  }

  const { post, blocks, keywords } = data;

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
                  <Suspense fallback={<p className="text-sm text-gray-500">Loading code…</p>}>
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
                  </Suspense>
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
