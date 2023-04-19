import Link from 'next/link';

export default function Home({ posts }) {
  console.log('I am on the client');
  console.log('posts', posts);
  return (
    <div>
      {/* loop over post and show them */}
      {posts &&
        posts.map((post) => (
          <Link href={`/${post.slug}`} key={post.id}>
            <h2>{post.title}</h2>
            <div style={{ marginLeft: '10px' }}>by {post.author}</div>
          </Link>
        ))}
    </div>
  );
}

// Can get data from the server side (node) or the client side
// this is server side
export async function getStaticProps() {
  //? change localhost to 127.0.0.1 because of issue with node v18
  //? https://stackoverflow.com/questions/74165121/next-js-fetch-request-gives-error-typeerror-fetch-failed

  const res = await fetch('http://127.0.0.1:8082/api/posts');
  let posts = await res.json();
  console.log('POSTS: ', posts);
  posts = posts.data;
  return {
    props: { posts },
    revalidate: 10,
  };
}
