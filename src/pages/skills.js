import React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";
import links from "../components/Skills/content";
import Icons from "../components/Skills/icons";

import {
  SkillsHeader,
  SkillsList,
  SkillsItem,
  SkillsWrapper,
  SkillsSubTitle,
  SkillsP,
  Div,
  SoftSkillsWrapper,
  Spacer,
} from "../styles/skills";

const SkillsPage = () => (
  <Layout>
    <Seo title="Skills" />
    <SkillsHeader>技能</SkillsHeader>

    <SkillsSubTitle>硬技能</SkillsSubTitle>
    <SkillsList>
      {links.map((link, index) => {
        const Icon = Icons[link.label];
        return (
          <SkillsWrapper key={link}>
            <SkillsItem>
              <Icon title={link.label} />
            </SkillsItem>
          </SkillsWrapper>
        );
      })}
    </SkillsList>

    <Spacer />

    <SkillsSubTitle>软技能</SkillsSubTitle>

    <SoftSkillsWrapper>
      <Div>
        <SkillsP>清晰的沟通</SkillsP>
      </Div>
      <Div>
        <SkillsP>执行力</SkillsP>
      </Div>
      <Div>
        <SkillsP>适应性</SkillsP>
      </Div>
      <Div>
        <SkillsP>团队合作</SkillsP>
      </Div>
      <Div>
        <SkillsP>时间管理</SkillsP>
      </Div>
      <Div>
        <SkillsP>学习能力</SkillsP>
      </Div>
    </SoftSkillsWrapper>
  </Layout>
);

export default SkillsPage;
