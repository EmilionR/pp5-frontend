import React, { useEffect } from "react";
import appStyles from "../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Asset from "../components/Asset";

const PopularProfiles = () => {
  const [profileData, setProfileData] = React.useState({
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
            // Load the top 5 profiles with the most followers
          `/profiles/?ordering=-follower_count&limit=5`
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
        {/* Check if there are popular profiles to display */}
        {popularProfiles.results.length ? (
            <>
            <h4>Most popular profiles</h4>
      {popularProfiles.results.map((profile) => (
        <p key={profile.id}>{profile.owner}</p>
      ))}
            </>
        ) : (
            <>
            <p>No popular profiles found</p>
            <Asset spinner />
            </>
        )}
      
    </Container>
  );
};

export default PopularProfiles;
