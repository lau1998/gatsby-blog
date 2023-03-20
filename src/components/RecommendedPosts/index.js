import React from 'react';
import propTypes from 'prop-types';

import getThemeColor from '../../utils/getThemeColor';

import * as s from './style';

const RecommendedPosts = ({ next, previous }) => (
  <s.RecommendedWrapper>
    {previous && (
      <s.RecommendedLink
        cover
        direction="left"
        bg={getThemeColor()}
        duration={0.6}
        to={previous.fields.slug}
        className="previous"
      >
        <s.ArrowLeftt />
        上一篇文章: {previous.frontmatter.title}
      </s.RecommendedLink>
    )}

    {next && (
      <s.RecommendedLink
        cover
        direction="right"
        bg={getThemeColor()}
        duration={0.6}
        to={next.fields.slug}
        className="next"
      >
        下一篇文章: {next.frontmatter.title}
        <s.ArrowRightt />
      </s.RecommendedLink>
    )}
  </s.RecommendedWrapper>
);

// 形状是一种对象属性
RecommendedPosts.propTypes = {
  next: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired
    })
  }),
  previous: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired
    })
  })
};

export default RecommendedPosts;
