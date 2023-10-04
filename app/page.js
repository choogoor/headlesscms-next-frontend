import Image from 'next/image'
import styles from './page.module.css'
import { fetchPosts } from './lib/payload'
import Article from './components/Article'

const Home = async () => {
  const posts = await fetchPosts();

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      {posts && (
        <section className={styles.wrapper}>
          {posts.map((post) => <Article post={post} key={post.id} />)}
        </section>
      )}
    </main>
  )
}

export default Home;