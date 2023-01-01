import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal";
import Typography from "../Typography";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  confirmText: string;
  onPrimary: () => void;
};

const ActionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 2%;
`;

const ConfirmModalContent = styled.div``;
const ConfirmModal = ({
  open,
  title,
  onClose,
  confirmText,
  onPrimary,
}: ConfirmModalProps) => {
  return (
    <Modal title={title} onClose={onClose} open={open}>
      <>
        <ConfirmModalContent>
          <Typography type="body1">{confirmText}</Typography>
        </ConfirmModalContent>
        <ActionContainer>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button onClick={onPrimary}>Confirm</Button>
        </ActionContainer>
      </>
    </Modal>
  );
};

export default ConfirmModal;
