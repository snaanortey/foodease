import styles from './Footer.module.css';
export interface IFooter {}

const Footer: React.FC<IFooter> = () => {
  return (
    <input
      placeholder="Type your ingredients"
      className="text-center text-green-500"
    ></input>
  );
};

export default Footer;
