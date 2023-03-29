/* 该路径可以采用文件夹的路径，而不会混淆API*/
const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(
    `
    type MarkdownRemarkFrontmatter {
      thumbnail: String
    }

    type markdwonRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    `
  );
};

// 将段塞添加到每个帖子
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // 检查我们是否只处理降价文件
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
    });

    // 以URL等于值的方式创建名称为slug的新字段
    createNodeField({
      node,
      name: 'slug',
      /* 限制字符数量，使我们只能在URL中看到
      没有日期的职位名称 */
      value: `posts/${slug.slice(12)}`,
    });
  }
};

// 从每个帖子创建页面
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              category
              date(locale: "zh-CN", formatString: "YYYY [年] MM [月] DD [日]")
              description
              background
              thumbnail
            }
            timeToRead
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    const posts = result.data.allMarkdownRemark.edges;

    const postsPerPage = 15;
    const numPages = Math.ceil(posts.length / postsPerPage);

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/components/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
          previousPost: next,
          nextPost: previous,
        },
      });
    });

    Array.from({ length: numPages }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/` : `/page/${index + 1}`,
        component: path.resolve(`./src/components/templates/blog-list.js`),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: index + 1,
        },
      });
    });
  });
};
