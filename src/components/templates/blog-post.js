import React from "react";
import { graphql } from "gatsby";

import Layout from "../Layout";
import Seo from "../seo.js";
import RecommendedPosts from "../RecommendedPosts";
import Comments from "../Comments";

import * as s from "../Post/style";

const BlogPost = ({ data, pageContext }) => {
  const title = data.markdownRemark.frontmatter.title;
  const html = data.markdownRemark.html;
  const date = data.markdownRemark.frontmatter.date;
  const timeToRead = data.markdownRemark.timeToRead;
  const description = data.markdownRemark.frontmatter.description;
  const url = data.markdownRemark.fields.slug;
  const post = data.markdownRemark;

  const next = pageContext.nextPost;
  const previous = pageContext.previousPost;

  return (
    // 通过布局和SEO标签将帖子与布局集成
    <Layout>
      <Seo
        title={title}
        description={description}
        thumbnail={post.frontmatter.thumbnail}
      />
      <s.PostHeader>
        <s.PostDate>
          {date} • {timeToRead} 最小读数
        </s.PostDate>
        <s.PostTitle>{title}</s.PostTitle>
        <s.PostDescription>{description}</s.PostDescription>
      </s.PostHeader>
      <s.MainContent>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </s.MainContent>
      <Comments url={url} title={title} />
    </Layout>
  );
};

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(locale: "zh-CN", formatString: "YYYY [年] MMMM [月] DD")
        thumbnail
      }
      html
      timeToRead
    }
  }
`;

export default BlogPost;
