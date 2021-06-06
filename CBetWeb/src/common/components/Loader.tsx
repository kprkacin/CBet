import { Spinner } from 'react-bootstrap';

export const Loader: React.FC = () => {
  return (
    <div className="spinnerContainer">
      <Spinner animation="border" />
    </div>
  );
};
