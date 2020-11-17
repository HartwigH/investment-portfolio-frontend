import { Container } from "reactstrap";

interface Props {
  className?: string;
}

const BasePage: React.FC<Props> = (props) => {
  const { className, children } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: "",
};

export default BasePage;
