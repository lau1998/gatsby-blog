import React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";
import links from "../components/SocialLinks/content";

import Icons from "../components/SocialLinks/icons";

import {
  AboutHeader,
  AboutDescription,
  AboutSubTitle,
  AboutLinksList,
} from "../styles/about";

import {
  SocialLinksItem,
  SocialLinksLink,
  IconWrapper,
} from "../components/SocialLinks/style";

const AboutPage = () => (
  <Layout>
    <Seo title="关于我" />
    <AboutHeader>关于我</AboutHeader>

    <AboutDescription>
      我知道你会来，所以我在等
    </AboutDescription>

    <AboutDescription>
      欢迎访问我的Blog！我是刘承，生活在成都
    </AboutDescription>

    <AboutDescription>
      我发现我对编程很感兴趣，因此我成为了一名前端开发人员，目前我在这个领域工作了3年多
    </AboutDescription>

    <AboutDescription>
      在我的Blog中，我会分享我的技术和创意，并展示我的作品
    </AboutDescription>

    <AboutDescription>
      我喜欢将技术和创造力相结合，创造出更好的用户体验和可用性，并在我的作品中表达我的思考和情感，同时也喜欢专研一些新鲜的技术，将它们融入到我的作品里，我觉得这样很棒
    </AboutDescription>

    <AboutDescription>
      我目前正在为我的博客开发一个新版本，如果你有好的建议，那就太好了
    </AboutDescription>

    <AboutDescription>
      如果你想了解更多关于我，请随时联系我，我会很高兴与你交流。
    </AboutDescription>

    <AboutSubTitle>与我联系</AboutSubTitle>

    <AboutLinksList>
      {links.map((link, index) => {
        const Icon = Icons[link.label];

        return (
          <SocialLinksItem key={index}>
            <SocialLinksLink
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWrapper>
                <Icon />
              </IconWrapper>
            </SocialLinksLink>
          </SocialLinksItem>
        );
      })}
    </AboutLinksList>
  </Layout>
);

export default AboutPage;
