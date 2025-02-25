import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../routes/authRoutes";
import UserCard from "../../components/profile/UserCard";
import LoadingIndicator from "../../components/loading/LoadingIndicator";

function UserProfile() {
  const { isLoggedIn, userId } = useContext(AuthContext);
  console.log("userId in userProfile", userId);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true);
      try {
        const { data } = await getUserById(userId);
        console.log("User Data in UserProfile", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching User:", error.message);
        alert("Failed to fetch user. Check the console for details.");
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (userId) {
      // Only fetch if userId exists

      fetchUser();
    }
  }, [userId]);

  return (
    <div className="container mt-4">
      {isLoadingUser ? (
        <LoadingIndicator />
      ) : (
        <div className="row">
          {user ? (
            <UserCard user={user} isLoggedIn={isLoggedIn} />
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
