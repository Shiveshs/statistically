import { Link } from "react-router-dom";

const Header = () => {
    return (
      <div className="bg-gray-700 text-white">
        <header>
          <ul className="list-none flex justify-center gap-4">
            <Link to="/"><li className="p-2">Home</li></Link>
          </ul>
        </header>
      </div>
    );
  };
  
  export default Header;