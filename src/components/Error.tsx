interface ErrorProps {
  children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children, ...props }) => {
  return (
    <div
      style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Error;
