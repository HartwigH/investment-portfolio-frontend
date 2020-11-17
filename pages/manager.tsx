import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { getPortfolio } from "../actions";
import { parseCookies } from "nookies";
import PortfolioModal from "../components/PortfolioModal";
import { createPortfolio, deletePortfolio, updatePortfolio } from "../actions";

import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Spinner,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";

const cookies = parseCookies().jwt;

interface ownState {
  updateWatcher: boolean;
  loading: boolean;
  data?: any;
  pageIndex: number;
  pageSize: number;
  setVisibility?: string;
}

class Manager extends React.Component<{}, ownState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updateWatcher: false,
      loading: true,
      pageIndex: 0,
      pageSize: 6,
      setVisibility: "",
    };

    this.getData = this.getData.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.state.updateWatcher) {
      this.getData();
      this.setState({ updateWatcher: false });
    }
  }

  async getData() {
    const jwt = parseCookies().jwt;
    const portfolio = await getPortfolio(jwt);

    this.setState({
      data: portfolio,
      loading: false,
    });
  }

  async handleCreate(data) {
    const createResponse = await createPortfolio(data, cookies);
    // Handle Errors
    this.setState({ updateWatcher: true });
  }

  async handleUpdate(data) {
    const updateResponse = await updatePortfolio(data, cookies);
    // Handle Errors
    this.setState({ updateWatcher: true });
  }

  async handleDelete(id) {
    const createResponse = await deletePortfolio(id, cookies);
    // Handle Errors
    this.setState({ updateWatcher: true });
  }

  handleColor(prePrice, newPrice) {
    if (newPrice > prePrice) {
      return "gain-green";
    }
    return "loss-red";
  }

  handlePrevPageClick(event) {
    this.setState((prevState) => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  }

  handleNextPageClick(event) {
    this.setState((prevState) => ({
      pageIndex:
        prevState.pageIndex < // This is buggy
        Math.floor(prevState.data.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  }

  handleVisibility() {
    this.setState({ setVisibility: "remove-visibility" });
  }

  render() {
    const { data, loading, setVisibility } = this.state;
    return (
      <BaseLayout>
        <BasePage>
          <Container className="manager-jumbotron">
            <Row>
              <Col md="6" className="col">
                <h2 className="manager-header"> Portfolio management </h2>
              </Col>
              <Col md="6" className="col">
                <PortfolioModal
                  handleFormSubmit={this.handleCreate}
                  buttonStyle="green-button-sm"
                  buttonText="Add new"
                  headerText="Add new portfolio"
                  actionButtonText="Save"
                />
              </Col>
            </Row>
          </Container>

          <Table dark responsive className="manager-table">
            {!loading && (
              <img
                src="/static/images/gesture.gif"
                className={`img-fluid gesture-img ${setVisibility}`}
                onClick={this.handleVisibility}
              />
            )}
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Location note</th>
                <th>Amount</th>
                <th>Buy Price</th>
                <th>Price now</th>
                <th>Gain / Loss %</th>
                <th>Total</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="text-center">
                    <Spinner color="light" />
                  </td>
                </tr>
              )}

              {data &&
                this.state.data
                  .slice(
                    this.state.pageIndex * this.state.pageSize,
                    this.state.pageIndex * this.state.pageSize +
                      this.state.pageSize
                  )
                  .map((d) => {
                    return (
                      <tr key={d.id}>
                        <td>{d.name}</td>
                        <td>{d.note}</td>
                        <td>{d.amount}</td>
                        <td>{d.buy_price} $</td>
                        <td
                          className={this.handleColor(d.buy_price, d.price_now)}
                        >
                          {d.price_now} $
                        </td>
                        <td
                          className={this.handleColor(d.buy_price, d.price_now)}
                        >
                          {d.percentage} %
                        </td>
                        <td
                          className={this.handleColor(d.buy_price, d.price_now)}
                        >
                          {d.total} $
                        </td>
                        <td>
                          <PortfolioModal
                            handleFormSubmit={this.handleUpdate}
                            initialData={d}
                            buttonStyle="orange-button-sm"
                            buttonText="Edit"
                            headerText="Edit portfolio"
                            actionButtonText="Save changes"
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => this.handleDelete(d.id)}
                            className="red-button-sm"
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
          {data.length > 6 && (
            <Container className="manager-jumbotron-bottom">
              <Row>
                <Col md="6" className="col">
                  <Button
                    className="btn-sm-dark"
                    onClick={(event) => this.handlePrevPageClick(event)}
                  >
                    Prev page
                  </Button>
                </Col>
                <Col md="6" className="col">
                  <Button
                    className="btn-sm-dark float-right"
                    onClick={(event) => this.handleNextPageClick(event)}
                  >
                    Next page
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Manager;
