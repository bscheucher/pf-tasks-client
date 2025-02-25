import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-3">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
