import { useEffect, useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { postExpense } from "../../_redux/slices/authSlice";
import { useDispatch } from "react-redux";

const expenseCategory = [
  {
    key: 1,
    text: "Food",
    value: "food",
  },
  {
    key: 2,
    text: "Transport",
    value: "transport",
  },
  {
    key: 3,
    text: "Rent",
    value: "rent",
  },
  {
    key: 4,
    text: "Equipment",
    value: "equipment",
  },
  {
    key: 5,
    text: "Entertainment",
    value: "entertainment",
  },
  {
    key: 6,
    text: "Education",
    value: "education",
  },
  {
    key: 7,
    text: "Salary",
    value: "salary",
  },
  {
    key: 8,
    text: "Freelance",
    value: "freelance",
  },
  {
    key: 9,
    text: "Gift",
    value: "gift",
  },
  {
    key: 10,
    text: "Parents",
    value: "parents",
  },
  {
    key: 11,
    text: "Others",
    value: "others",
  },
];

const TransactionModal = ({
  open,
  setOpen,
  type,
  description,
  category,
  amount,
}) => {
  const dispatch = useDispatch();

  const [transValues, setTransValues] = useState({
    accountType: type,
    description: description,
    category: category,
    amount: amount,
  });
  const submitHandler = () => {
    dispatch(postExpense(transValues));
    setTransValues({
      accountType: type,
      description: "",
      category: "",
      amount: 0,
    });
  };
  useEffect(() => {
    setTransValues({ ...transValues, accountType: type });
  }, [type]);
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Add New Expense</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Select
                options={expenseCategory}
                placeholder="Select Category"
                label="Category"
                width={8}
                onChange={(e, data) => {
                  setTransValues({ ...transValues, category: data.value });
                }}
              />
              <Form.Input
                label="Amount"
                placeholder="Amount"
                type="number"
                width={8}
                value={transValues.amount}
                onChange={(e) => {
                  setTransValues({
                    ...transValues,
                    amount: parseFloat(e.target.value),
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label="Description"
                placeholder="Description"
                type="text"
                width={16}
                value={transValues.description}
                onChange={(e) => {
                  setTransValues({
                    ...transValues,
                    description: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              submitHandler();
              setOpen(false);
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TransactionModal;
