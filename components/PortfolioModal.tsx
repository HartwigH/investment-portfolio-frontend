import React, { useState } from "react";

import { useRouter } from "next/router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface data {
  name: string;
  note: string;
  amount: number;
  buy_price: number;
}

interface Props {
  initialData?: data;
  buttonStyle: string;
  buttonText: string;
  headerText: string;
  actionButtonText: string;
  handleFormSubmit: ({}) => void;
}

const PortfolioModal: React.FC<Props> = (props) => {
  const defaultData = {
    name: "",
    note: "",
    amount: "",
    buy_price: "",
  };

  const formData = props.initialData ? { ...props.initialData } : defaultData;

  const [form, setForm] = useState(formData);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitForm = () => {
    props.handleFormSubmit({ ...form });
    setModal(!modal);
    // Clean fields
    setForm(defaultData);
  };

  const buttonPosition = (style) => {
    if (style === "green-button-sm") {
      return style + " float-right";
    } else {
      return style;
    }
  };

  const { buttonStyle, buttonText, headerText, actionButtonText } = props;

  return (
    <>
      <Button className={buttonPosition(buttonStyle)} onClick={toggle}>
        {buttonText}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="portfolio-modal">
        <ModalHeader toggle={toggle}>{headerText}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name" className="label-title">
                Symbol
              </Label>
              <Input
                onChange={handleChange}
                value={form.name}
                type="text"
                name="name"
                id="name"
              />
              <Label for="note" className="label-title">
                Location note
              </Label>
              <Input
                onChange={handleChange}
                value={form.note}
                type="text"
                name="note"
                id="note"
              />
              <Label for="amount" className="label-title">
                Amount
              </Label>
              <Input
                onChange={handleChange}
                value={form.amount}
                type="number"
                name="amount"
                id="amount"
              />
              <Label for="buy_price" className="label-title">
                Buy Price
              </Label>
              <Input
                onChange={handleChange}
                value={form.buy_price}
                type="number"
                name="buy_price"
                id="buy_price"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="green-button-sm" onClick={submitForm}>
            {actionButtonText}
          </Button>{" "}
          <Button className="red-button-sm" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PortfolioModal;
