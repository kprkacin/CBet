import React from 'react';

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, action, details } = props;

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__titleBox">
          <h1 className="header__title">{title ? title : ''}</h1>
        </div>
        {details && <div className="header__details">{details}</div>}
      </div>
      {action && <div className="header__right">{action}</div>}
    </div>
  );
};

export interface HeaderProps {
  title: string | null;
  action?: JSX.Element;
  details?: JSX.Element;
}
