import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const SystemLoader = () => {
  const isLoading = useSelector((state: RootState) => state.system.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[100]">
      <div className="flex gap-2">
        <span className="loading loading-bars loading-md"></span>
      </div>
    </div>
  );
}
export default SystemLoader

