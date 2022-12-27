export interface IFooter {}

const Header: React.FC<IFooter> = () => {
  return (
    <input
      placeholder="Type your ingredients"
      className="text-center text-green-500"
    ></input>
  );
};

export default Header;
