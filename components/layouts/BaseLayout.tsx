import React, { Children } from "react";
import Header from "../shared/Header";

interface Props {
  className?: string;
}

const BaseLayout: React.FC<Props> = (props) => {
  const { className, children } = props;

  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

BaseLayout.defaultProps = {
  className: "",
};

export default BaseLayout;
