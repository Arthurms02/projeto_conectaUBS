import React from "react";

// Definimos o componente usando o tipo React.FC (Function Component)
const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Olá, Mundo! 👋</h1>
    </div>
  );
};

export default Home;
