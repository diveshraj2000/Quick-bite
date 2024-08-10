import './App.css';

const Shimmer = () => {
  return (
    <>
      <div className="image-shimmer-container">
        <div className="shimmer-header relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="p-4 md:w-4/12 lg:w-3/12 xl:w-3/12">
            <div className="bg-slate-200 rounded-2xl shadow-lg p-3 h-52 w-60 relative overflow-hidden shimmer-card">
              <div className="shimmer absolute inset-0"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shimmer;
