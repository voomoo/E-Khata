import { Grid, Segment, Label, Button, Modal } from "semantic-ui-react";
import { RiFileEditFill, RiDeleteBin2Fill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../_redux/slices/authSlice";
import TransactionModal from "../TransectionModal/TransactionModal"

const ExpenseCard = ({ id, title, date, description, amount, category, icon, color }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false)
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
            textTransform:"capitalize"
          }}
        >
          {color === "red" ? `Expense (৳ -${amount})` : `Income (৳ +${amount})`}
          <div>
            <Button icon size="mini" color="yellow" onClick={() => setOpen(!open)}>
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
          <Grid.Column computer={2} tablet={4}>{icon}</Grid.Column>
          <Grid.Column computer={14} tablet={12}>
            <h5>{title}</h5>
            <small>
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
            <p>{description}</p>
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
      <TransactionModal
        open={open}
        setOpen={setOpen}
        type={color === "red" ? "expense" : "income"}
        description={description}
        category={category}
        amount={amount}
        operation = {id}
      />
    </div>
  );
};

export default ExpenseCard;
