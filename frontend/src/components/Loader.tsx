const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="flex gap-2">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </div>
  );
};
export default Loader;
