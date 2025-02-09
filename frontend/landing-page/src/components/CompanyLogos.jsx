import coinbase from "../assets/Coinbase_Wordmark_White.png";
import ethglobal from "../assets/white-512px.webp";
import arbitrum from "../assets/WhiteText_horizontal_RGB.png";
import base from "../assets/Base_Wordmark_White.png";
import nethermind from "../assets/Nethermind_White_Horizontal.png";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Supporting orphaned elephants through innovative web3 solutions
      </h5>
      <ul className="flex justify-center space-x-6">
        <li>
          <img src={coinbase} width={134} height={28} alt="Logo Coinbase" />
        </li>
        <li>
          <img src={ethglobal} width={134} height={28} alt="Logo EthGlobal" />
        </li>
        <li>
          <img src={arbitrum} width={170} height={28} alt="Logo Arbitrum" />
        </li>
        <li>
          <img src={base} width={110} height={28} alt="Logo Base" />
        </li>
        <li>
          <img src={nethermind} width={150} height={20} alt="Logo Nethermind" />
        </li>
      </ul>
    </div>
  );
};

export default CompanyLogos;
