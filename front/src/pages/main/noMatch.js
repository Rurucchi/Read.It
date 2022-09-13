import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/navbar";
import { Button } from "@mui/material";

const NoMatch = () => {
  return (
    <div className="main">
      <div className="appBody">
        <h1>404</h1>
        <p>Looks like you are lost...</p>
        <Link to="/">
          <Button variant="outlined">Back to hub</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
