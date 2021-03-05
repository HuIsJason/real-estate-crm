
interface ModalProps {
  open: boolean
  onCancel: () => void;
  onContinue: () => void;
  actionDescription: string;
}

export default ModalProps;
