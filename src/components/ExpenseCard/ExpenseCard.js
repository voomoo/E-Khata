import { Grid, Segment, Label, Button, Modal } from "semantic-ui-react";
import { RiFileEditFill, RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../_redux/slices/authSlice";

const ExpenseCard = ({ id, title, date, description, amount, icon, color }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteExpense(id));
    setModalOpen(false);
  };
  return (
    <div className="expense-card">
      <Segment color={color}>
        <Label
          attached="top"
          color={color}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {color === "red" ? "Expense" : "Income"}
          <div>
            <Button icon size="mini" color="yellow">
              <RiFileEditFill />
            </Button>
            <Button
              icon
              size="mini"
              color="orange"
              onClick={(e) => setModalOpen(!modalOpen)}
            >
              <RiDeleteBin2Fill />
            </Button>
          </div>
        </Label>

        <Grid style={{ marginTop: "10px" }}>
          <Grid.Column width={2}>{icon}</Grid.Column>
          <Grid.Column width={4}>
            <h5>{title}</h5>
            <small>
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
          </Grid.Column>
          <Grid.Column width={6}>
            <p>{description}</p>
          </Grid.Column>
          <Grid.Column width={4}>
            <h4>
              {color === "red" ? "- ৳" : "+ ৳"}
              {amount}
            </h4>
          </Grid.Column>
        </Grid>
      </Segment>
      <Modal open={modalOpen}>
        <Modal.Header>Warning</Modal.Header>
        <Modal.Content>
          <h4>
            {`Are you sure you want to delete this ${
              color === "red" ? "Expense" : "Income"
            }`}
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={(e) => setModalOpen(!modalOpen)}>
            Cancel
          </Button>
          <Button color="red" onClick={(e) => deleteHandler()}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ExpenseCard;
