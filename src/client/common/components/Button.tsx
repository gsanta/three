import { MouseEventHandler, ReactNode } from 'react';

type ButtonType = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({ children, onClick }: ButtonType) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
