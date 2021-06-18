import { Image } from 'react-bootstrap';

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { firstName = '', lastName = '', imageUrl } = props;

  const userInitials =
    (firstName ? firstName[0].toUpperCase() : '') +
    (lastName ? lastName[0].toUpperCase() : '');

  return (
    <div className="avatar">
      {imageUrl ? (
        <Image src={imageUrl} roundedCircle />
      ) : (
        <h4>{userInitials}</h4>
      )}
    </div>
  );
};

export interface AvatarProps {
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}
