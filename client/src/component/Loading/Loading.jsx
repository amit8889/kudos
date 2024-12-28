
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
       </div>
    </div>
  );
};

export default Loading;
