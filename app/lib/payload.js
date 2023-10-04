import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.PAYLOADCMS_API_ENDPOINT;
const token = process.env.PAYLOADCMS_API_KEY;

export async function fetchPosts() {
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    query {
      Posts {
        docs {
          id
          title
          excerpt
          coverImage {
            url,
            alt
          }
          content
          author {
            firstName,
            lastName
          }
          publishDate
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.Posts.docs;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
