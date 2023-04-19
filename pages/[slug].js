import Link from 'next/link';

export default function Post({ post }) {
  return (
    <>
      <Link href='/'>-- Back Home</Link>
      <div>{post.title}</div>
    </>
  );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const res = await fetch('http://127.0.0.1:8082/api/posts');
  let posts = await res.json();
  posts = posts.data;

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // change to true if I want incremental static generation
  };
}

// `getStaticPaths` requires using `getStaticProps`
// fer each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;
  const res = await fetch(
    `http://127.0.0.1:8082/api/posts?filters\[Slug\][$eq]=${slug}`
  );
  const { data } = await res.json();
  const post = data[0];
  return {
    props: { post },
  };
}
