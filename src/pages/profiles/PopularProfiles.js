import React from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/PopularProfiles.module.css";

const PopularProfiles = ({ mobile }) => {
  
  // Get the popular profiles from the ProfileDataContext
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`pb-2 ${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-2 px-0"
      }`}
    >
      {/* Check if there are popular profiles to display */}
      {popularProfiles.results.length ? (
        <>
          <h4 className="pt-2">Most popular profiles</h4>
          {mobile ? (
            <div className={`${styles.MobileProfiles}`}>
              {popularProfiles.results.slice(0, 6).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.slice(0,10).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <>
          <Asset spinner />
        </>
      )}
    </Container>
  );
};

export default PopularProfiles;
