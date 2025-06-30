type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div role="alert" className="alert alert-warning rounded-md alert-soft">
      <span>{message}</span>
    </div>
  );
};

export default EmptyState;
