import React, { useEffect } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
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
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-2"
      }`}
    >
      {/* Check if there are popular profiles to display */}
      {popularProfiles.results.length ? (
        <>
          <h4 className="pt-2">Most popular profiles</h4>
          {mobile ? (
            <div className="d-flex flex-wrap g-2 justify-content-around">
              {popularProfiles.results.slice(0, 5).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            <div className="pb-1">
            {popularProfiles.results.slice(0,10).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
            </div>
          )}
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
