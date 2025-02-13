import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h6 className="card-title fw-bold">User Data</h6>
        <p className="card-text text-muted">Username: {user.username}</p>
        <p className="card-text">Email: {user.email}</p>

        <Link
          to={`/users/${user.id}/update`}
          role="button"
          className="btn btn-primary mt-3"
        >
          Update User
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
