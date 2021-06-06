import { Loader } from './Loader';

export const Page: React.FC<PageProps> = ({ children, isLoading = false }) => {
  return (
    <div className="page">
      {isLoading && <Loader />}
      {children}
    </div>
  );
};

export interface PageProps {
  isLoading?: boolean;
}
