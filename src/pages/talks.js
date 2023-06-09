import React from "react";
import Layout from "../components/Layout";
import SquareVideo from "../components/SquareVideo";
import { talks, participations, podcasts } from "../utils/talks";

import Styled from "../styles/talks";
import Seo from "../components/seo";

const Talks = () => {
  return (
    <Layout>
      <Seo title="Talks" />
      <Styled.Container>
        <Styled.ContainerTitle>
          <Styled.Title>会谈</Styled.Title>
        </Styled.ContainerTitle>

        <Styled.ContainerTalks>
          {talks.map((talk) => (
            <SquareVideo
              key={talk.id}
              description={talk.description}
              title={talk.title}
              url={talk.url}
              imageURI={talk.imageURI}
            />
          ))}
        </Styled.ContainerTalks>

        <Styled.Divider />

        <Styled.ContainerTitle>
          <Styled.Title>播客</Styled.Title>
        </Styled.ContainerTitle>

        <Styled.ContainerTalks>
          {podcasts.map((podcast) => (
            <SquareVideo
              key={podcast.id}
              description={podcast.description}
              title={podcast.title}
              url={podcast.url}
              imageURI={podcast.imageURI}
            />
          ))}
        </Styled.ContainerTalks>

        <Styled.Divider />

        <Styled.ContainerTitle>
          <Styled.Title>Youtube参与</Styled.Title>
        </Styled.ContainerTitle>

        <Styled.ContainerTalks>
          {participations.map((participation) => (
            <SquareVideo
              key={participation.id}
              description={participation.description}
              title={participation.title}
              url={participation.url}
              imageURI={participation.imageURI}
            />
          ))}
        </Styled.ContainerTalks>
      </Styled.Container>
    </Layout>
  );
};

export default Talks;
