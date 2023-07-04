import ReactModal from "react-modal";
import Typography from "../Typography";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import * as styles from "./styles.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
};
ReactModal.defaultStyles.overlay!.backgroundColor = "rgba(0, 0, 0, 0.4)";

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  ReactModal.setAppElement("body");
  return (
    <ReactModal
      className={styles.dialog}
      isOpen={open}
      onRequestClose={onClose}
    >
      <div className={styles.modalHeader}>
        <Typography type="h2">{title}</Typography>
        <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
      </div>
      <div className={styles.modalContent}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
