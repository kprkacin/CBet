export const Icon: React.FC<IconProps> = (props) => {
  const { name, color, className } = props;

  const iconColor = color ? `text-${color}` : '';

  return (
    <span className={`icon material-icons-outlined  ${iconColor} ${className}`}>
      {name}
    </span>
  );
};

export interface IconProps {
  name: string;
  color?: 'primary' | 'secondary' | 'light' | 'gray' | 'icon';
  className?: string;
}
