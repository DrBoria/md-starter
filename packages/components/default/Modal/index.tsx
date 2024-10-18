import { ReactNode } from 'react';

import { ModalContent, CloseIcon, Overlay } from './styles';

type TModalProps = {
  handleClose?: () => void;
  open: boolean;
  children: ReactNode;
};

const Modal = ({ open, handleClose, children }: TModalProps) => {
  return (
    <Overlay open={open} onClick={handleClose}>
      <ModalContent>
        <CloseIcon onClick={handleClose} />
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
