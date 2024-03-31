import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import {
  blockHelper,
  followHelper,
  friendHelper,
  unblockHelper,
  unfollowHelper,
  unfriendHelper,
} from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  // The profileData state will hold the popular profiles and the page profile
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  // Follow / Unfollow

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  // Block / Unblock

  const handleBlock = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/blocks/", {
        target: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            blockHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnblock = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/blocks/${clickedProfile.block_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unblockHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  // Friend / Unfriend

  const handleFriend = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/friends/", {
        friend: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            friendHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnfriend = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/friends/${clickedProfile.friend_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfriendHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  // Fetch the popular profiles on mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-follower_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{
          setProfileData,
          handleFollow,
          handleUnfollow,
          handleBlock,
          handleUnblock,
          handleFriend,
          handleUnfriend,
        }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
