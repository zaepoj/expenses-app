import styled from "styled-components";
import ReactModal from "react-modal";
import Typography from "../Typography";
import Balancer from 'react-wrap-balancer'

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
};

const StyledDialog = styled(ReactModal)`
  top: 50%;
  left: 50%;
  margin-left: -300px;
  right: auto;
  bottom: auto;
  border-radius: 0.5em;
  box-shadow: rgb(0 0 0 / 6%) 0px 4px 44px;
  border: 1px solid rgb(239, 241, 244);
  position: absolute;
  padding: 1.5em;
  padding-top: 0;
  max-width: 600px;
  width: 90vh;
  background: ${(props) => props.theme.ghostWhite};
  @media only screen and (max-width: 700px) {
    width: 100%;
    top: 0;
    left: 0;
    margin-left: 0;
    height: 100%;
  }
`;

const ModalHeader = styled.div`
  padding-top: 1em;
  padding-bottom: 2em;
`;

const ModalContent = styled.div``;

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <StyledDialog isOpen={open} onRequestClose={onClose}>
      <ModalHeader>
        <Typography text={title} type="h2" />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </StyledDialog>
  );
};

export default Modal;
