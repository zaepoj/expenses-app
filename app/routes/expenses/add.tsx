import { Form, useNavigate } from "@remix-run/react";
import react from "react";
import Modal from "~/components/Modal";
import TextField from "~/components/TextField";

const ExpensesEditModal = () => {
  const navigate = useNavigate();
  const onClose = () => navigate("/expenses");

  return (
    <Modal title={"New expense"} open={true} onClose={onClose}>
      <Form>
        <TextField name="name" type="text" label="Name" />
        <TextField name="price" type="text" label="Price" />
      </Form>
    </Modal>
  );
};

export default ExpensesEditModal;
