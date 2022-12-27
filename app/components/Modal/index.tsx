import styled from "styled-components";
import ReactModal from "react-modal";
import Typography from "../Typography";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useLayoutEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
};

const StyledDialog = styled(ReactModal)`
  top: 15%;
  left: 50%;
  margin-left: -300px;
  right: auto;
  bottom: auto;
  border-radius: 0.5em;
  border: 1px solid rgb(239, 241, 244);
  position: absolute;
  padding-top: 0;
  min-width: 650px;
  background: ${(props) => props.theme.ghostWhite};
  @media only screen and (max-width: 800px) {
    width: 100%;
    top: 0;
    left: 0;
    margin-left: 0;
    height: 100%;
    min-width: 100%;
  }
`;

const ModalHeader = styled.div`
  padding-top: 1em;
  padding-left: 1em;
  padding-bottom: 2em;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 1em;
  padding-right: 1em;
  font-size: 1.3em;
  cursor: pointer;
  color: ${(props) => props.theme.primaryDark};
  :hover {
    color: ${(props) => props.theme.primaryDarkFaded};
  }
`;

const ModalContent = styled.div`
  padding: 1em;
`;

StyledDialog.defaultStyles.overlay!.backgroundColor = "rgba(0, 0, 0, 0.4)";

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);

  StyledDialog.setAppElement("body");
  return (
    <StyledDialog isOpen={open} onRequestClose={onClose}>
      <ModalHeader>
        <Typography type="h2">{title}</Typography>
        <CloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </StyledDialog>
  );
};

export default Modal;
