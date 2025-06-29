const Spinner: React.FC = () => {
  return (
    <div className="py-2.5" aria-label="spinner-icon">
      <div className="absolute inset-0 w-full h-full bg-inherit flex items-center justify-center rounded-inherit p-2 px-4"></div>
    </div>
  );
};

export default Spinner;
