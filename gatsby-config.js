require("dotenv").config();

const queries = require("./src/utils/algolia_queries");

module.exports = {
  siteMetadata: {
    title: `LAUCHER`,
    position: `前端开发工程师`,
    description: `通过知识共享寻求改变我们社会的移动开发者。 `,
    author: `LAUCHER`,
    siteURL: `https://czhlove.cn`,
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // 需要成为第一个使用盖茨比备注图像的人
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/assets/img`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // 物业ID；没有跟踪代码就不会生成
        trackingId: "UA-120929041-1",
        // 定义跟踪脚本的放置位置—头部为“true”，正文为“false”
        head: false,
        // 设置此参数是可选的
        anonymize: true,
        // 设置此参数也是可选的
        respectDNT: true,
        // 避免从自定义路径发送页面浏览点击
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // 延迟发送路由更新时的页面视图命中（以毫秒为单位）
        pageTransitionDelay: 0,
        // 使用您的容器Id启用谷歌优化
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // 启用谷歌优化实验ID
        experimentId: "RB7v2vfWRhe7rz35q3O_eA",
        // Set Variation ID. 0 for original 1,2,3....
        variationId: "original 1",
        // 页面加载后延迟执行谷歌分析脚本
        defer: false,
        // 任何其他可选字段
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "example.com",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images-v2",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-lazy-load`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-algolia-search`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    //     queries,
    //     chunkSize: 10000, // 一次的数据量
    //     enablePartialUpdates: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LAUCHER`,
        short_name: `LAUCHER`,
        start_url: `/`,
        background_color: `#191921;`,
        theme_color: `#191921;`,
        display: `minimal-ui`,
        // favicon
        icon: `src/images/favicon.png`, // 此路径相对于网站的根目录。
      },
    },
    // 此（可选）插件启用渐进式Web应用程序+脱机功能
    // 要了解更多信息，请访问: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
  ],
};
