const Page = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-3xl self-center">
        Meet the crew
      </h1>

      {Array.from({ length: 13 }).map((_, index) => (
        <div
          key={index}
          className="gap-20 inline-grid"
        >
          <div className="flex gap-4">
            <div className="rounded-full w-24 h-24 bg-white" />

            <div className="flex flex-col gap-2">
              <h3 className="font-bold">David Forren</h3>

              <span className="text-sm">Founder / CEO</span>

              <div className="flex text-accent text-xs">
                <a className="btn btn-ghost btn-sm btn-circle">
                  <i className="fa-brands fa-github text-lg"></i>
                </a>

                <a className="btn btn-ghost btn-sm btn-circle">
                  <i className="fa-brands fa-twitter text-lg"></i>
                </a>

                <a className="btn btn-ghost btn-sm btn-circle">
                  <i className="fa-brands fa-facebook text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
