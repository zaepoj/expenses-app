import Button from "../Button";
import Modal from "../Modal";
import Typography from "../Typography";
import * as styles from "./styles.css";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  confirmText: string;
  onPrimary: () => void;
};

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
        <div>
          <Typography type="body1">{confirmText}</Typography>
        </div>
        <div className={styles.actionContainer}>
          <Button onClick={onClose} secondary={true}>
            Cancel
          </Button>
          <Button onClick={onPrimary}>Confirm</Button>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmModal;
