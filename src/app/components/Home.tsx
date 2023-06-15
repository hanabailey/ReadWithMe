import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-item">logo</div>
        <div className="page-header-item">Read with ME</div>
        <div className="page-header-item">USER ID </div>
      </header>
      <div className="img-container">
        <img
          src="https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
    </>
  );
}

export default Home;
