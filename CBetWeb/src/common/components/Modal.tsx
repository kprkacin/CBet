import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Modal as BootstrapModal } from 'react-bootstrap';

export const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, title, show, form, onClose, onSave } = props;

  return (
    <BootstrapModal
      dialogClassName={className}
      show={show}
      centered
      onHide={onClose}
    >
      <BootstrapModal.Header>
        {title && <BootstrapModal.Title>{title}</BootstrapModal.Title>}
        <div className="modal__headerToolbar">
          {onSave && (
            <IconButton
              icon={<Icon name="check_circle_24px" color="primary" />}
              title="save changes"
              form={form}
              onClick={onSave}
            />
          )}
          <IconButton
            icon={<Icon name="close_24px" color="gray" />}
            onClick={onClose}
          />
        </div>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export interface ModalProps {
  title?: string;
  show: boolean;
  form?: string;
  className?: string;
  onClose(): void;
  onSave?(): Promise<void> | void;
}
