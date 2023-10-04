import Image from 'next/image';
import styles from './article.module.css';
import serialize from '../helpers/serialize';

const formatDate = (date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const Article = ({ post }) => {
  return (
    <article className={styles.article} key={post.id}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.details}>Published by <em>{post.author.firstName}</em> <em>{post.author.lastName}</em> on <em>{formatDate(post.publishDate)}</em></p>
      <figure className={styles.image}>
        <Image
          src={`http://localhost:3000${post.coverImage.url}`}
          alt={post.coverImage.alt}
          width={680}
          height={400}
        />
      </figure>
      <blockquote className={styles.excerpt}>{post.excerpt}</blockquote>
      <div className={styles.content}>
        {serialize(post.content, post.id)}
      </div>
    </article>
  )
}

export default Article;