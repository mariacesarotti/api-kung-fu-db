import React from "react";

interface KatiProps {
  nome: string;
  faixa: string;
}

const Kati = ({ nome, faixa }: KatiProps) => {
  return (
    <div className="kati">
      <h2 className="responsive-paragraph">{nome} | {faixa}</h2>
    </div>
  );
};

export default Kati;
