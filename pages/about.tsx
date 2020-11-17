import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { getAbout } from "../actions";
import { Jumbotron } from "reactstrap";

interface aboutData {
  title: string;
  content: string;
  cover: any;
}

interface Props {
  about: aboutData;
}

const About: React.FC<Props> = ({ about }) => {
  const { API_URL } = process.env;

  return (
    <BaseLayout>
      <BasePage>
        <Jumbotron>
          <h1 className="display-3">{about.title}</h1>
          <p className="lead">{about.content}</p>
          <hr className="my-2" />
          <div className="text-center"></div>
          {about.cover.url !== null && (
            <img
              src={API_URL + about.cover.url}
              className="img-fluid about-img"
              alt=""
            />
          )}
          {about.cover.url === null && (
            <p>
              Like with project updates on Heroku, the file system doesn't
              support local uploading of files as they will be wiped when Heroku
              "Cycles" the dyno.
            </p>
          )}
        </Jumbotron>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      about: await getAbout(),
    },
  };
}

export default About;
