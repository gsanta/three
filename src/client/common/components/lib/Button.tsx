import { MouseEventHandler, ReactNode, useMemo } from 'react';

type ButtonType = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  colorScheme?: 'primary' | 'neutral';
  isDisabled?: boolean;
};

const Button = ({ children, colorScheme, isDisabled, onClick }: ButtonType) => {
  const colorClass = useMemo(() => {
    switch (colorScheme) {
      case 'neutral':
        return 'btn-neutral';
      case 'primary':
      default:
        return 'btn-primary';
    }
  }, [colorScheme]);

  const disabledClass = isDisabled ? 'btn-disabled' : '';

  return (
    <button className={`btn ${colorClass} ${disabledClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
