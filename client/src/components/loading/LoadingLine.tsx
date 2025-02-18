import "./loading.css";

const LoadingLine = () => {
  return (
    <div className="absolute inset-0 bg-gray-700/30 overflow-hidden">
      <div className="loading-line ">
        <div className=" w-1/3 h-1 bg-warning_color rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingLine;
