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
    <Seo title="About" />
    <AboutHeader>关于我</AboutHeader>
    <AboutDescription>你好，我叫Luacher</AboutDescription>
    <AboutDescription>
      在技术领域工作了7年多，我发现了我对
      编程，所以我是一名移动开发人员。
    </AboutDescription>

    <AboutDescription>
      我的工作重点是用户体验和可用性，总是思考
      如何创建美观的界面，响应迅速，始终专注于
      使用者
    </AboutDescription>

    <AboutDescription>
      此外，我努力与我们的社区保持持续的联系，
      通过内容制作、指导、生活和参与谈话
      国内和国际技术。
    </AboutDescription>

    <AboutDescription>
      我目前正在为我的博客开发一个新版本
      此外，对于应用程序的中心来说，还有更多的经验和可用性
      实施新语言，帮助生活在其他语言中的人
      国家可以访问所制作的内容。
    </AboutDescription>

    <AboutDescription>
      我对你的来访感到非常高兴，并希望能更多地在这里见到你。
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
