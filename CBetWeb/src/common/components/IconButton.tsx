import { Button } from 'react-bootstrap';

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, title, form, onClick } = props;

  return (
    <Button
      form={form}
      size="sm"
      className="iconButton"
      variant="light"
      type={form ? 'submit' : undefined}
      onClick={onClick}
    >
      <div className="iconButton__icon">{icon}</div>
      {title && <div className="iconButton__title">{title}</div>}
    </Button>
  );
};

export interface IconButtonProps {
  icon: React.ReactNode;
  title?: string;
  form?: string;
  onClick?: () => void;
}
