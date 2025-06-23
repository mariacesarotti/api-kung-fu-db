interface FaixaProps {
    faixa: string;
    onSelect: () => void;
  }
  
  const Faixa = ({ faixa, onSelect }: FaixaProps) => {
    return (
      <div className="faixa" onClick={onSelect}>
        <p>{faixa}</p>
      </div>
    );
  };
  
  export default Faixa;
  