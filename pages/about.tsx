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
      <BasePage className="about-page">
        <Jumbotron>
          <h1 className="display-3">{about.title}</h1>
          <p className="lead">{about.content}</p>
          <hr className="my-2" />
          <div className="text-center">
          {about.cover !== null && (
            <img
              src={API_URL + about.cover.url}
              className="img-fluid about-img"
              alt=""
            />
          )}
          {about.cover === null && (
            <img
            src="/static/images/next+strapi.png"
            className="img-fluid about-img"
          />
          )}
          </div>
        </Jumbotron>
      </BasePage>
    </BaseLayout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      about: await getAbout(),
    },
  };
}

export default About;
