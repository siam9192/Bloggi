import React from "react";
import Container from "../container/Container";

const PageNotFound = () => {
  return (
    <div className="h-screen bg-white ">
      <Container>
        <img
          className="mx-auto"
          src="https://cdni.iconscout.com/illustration/premium/thumb/webpage-not-found-illustration-download-in-svg-png-gif-file-formats--result-search-404-error-pack-design-development-illustrations-3809638.png"
          alt=""
        />
        <h1 className="text-3xl font-medium text-center">Page Not Found</h1>
      </Container>
    </div>
  );
};

export default PageNotFound;
