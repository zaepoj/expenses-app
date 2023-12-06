import ReactModal from "react-modal";
import Typography from "../Typography";
import { AiOutlineClose } from "react-icons/ai/index.js";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
};
ReactModal.defaultStyles.overlay!.backgroundColor = "rgba(0, 0, 0, 0.8)";

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    return () => {
      document.body.style.overflow = "initial";
      document.body.style.paddingRight = "initial";
    };
  }, []);

  ReactModal.setAppElement("body");
  return (
    <ReactModal
      className="absolute pt-0 rounded-lg top-1/4 left-1/2 transform -translate-x-1/2 bg-card w-1/2 border-transparent border-r border-t border-b border-l overscroll-contain max-lg:w-full max-lg:h-full max-lg:top-0 max-lg:z-[9999]"
      isOpen={open}
      onRequestClose={onClose}
    >
      <div className="pt-4 pl-4 pb-8 text-almostWhite">
        <Typography type="h1">{title}</Typography>
        <AiOutlineClose
          className="absolute top-0 right-0 pt-4 pr-4 text-5xl cursor-pointer hover:text-slate-400 text-almostWhite hover:text-5"
          onClick={onClose}
        />
      </div>
      <div className="p-8 h-full">{children}</div>
    </ReactModal>
  );
};

export default Modal;
