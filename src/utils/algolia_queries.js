const postQuery = `{
  posts: allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }){
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          background
          title
          category
          date_timestamp: date
          date(locale: "zh-CN", formatString: "YYYY [年] MMMM DD [日]")
          description
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    date_timestamp: parseInt(
      (new Date(frontmatter.date_timestamp).getTime() / 1000).toFixed(0)
    ),
    ...rest
  }));

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings: {
      attributesToSnippet: ['excerpt:20']
    }
  }
];

const settings = { attributesToSnippet: [`excerpt:20`] };

module.exports = queries;
