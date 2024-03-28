import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/Options";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const {
    setProfileData,
    handleFollow,
    handleUnfollow,
    handleBlock,
    handleUnblock,
    handleFriend,
    handleUnfriend,
  } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const [myFollowers, setMyFollowers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePosts },
          { data: followerData },
          { data: friendsData },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get("/followers/"),
          axiosReq.get("/friends/"),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);

        // Filter followers and friends
        const filteredFollowers = followerData.results.filter(
          (follow) => follow.followed === currentUser?.pk
        );
        setMyFollowers(filteredFollowers);

        const filteredFriends = friendsData.results.filter(
          (friend) => friend.owner === currentUser?.username
        );
        setMyFriends(filteredFriends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setProfileData, currentUser]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="p-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          {/* Show whether the user is following you */}
          {currentUser &&
          myFollowers.some((follow) => follow.owner === profile?.owner) ? (
            <span className={styles.FollowsYou}>
              Follows you<i className="fas fa-check"></i>
            </span>
          ) : null}
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.post_count}</div>
              <div>Posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.follower_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="mt-3 d-flex flex-lg-column">

          {/* Display friend/unfriend button only if the profile owner is following the current user */}
          {currentUser &&
          myFollowers.some((follow) => follow.owner === profile?.owner) ? (
            myFriends.some((item) => item.friend_name === profile?.owner) ? (
              <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline} m-1`}
              onClick={() => {handleUnfriend(profile)}}
            >
              Unfriend
            </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black} m-1`}
                onClick={() => {handleFriend(profile)}}
              >
                Friend
              </Button>
            
            )
          ) : null}

          {/* Follow / Unfollow user */}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline} m-1`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black} m-1`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
          {/* Block / Unblock user */}
          {currentUser &&
            !is_owner &&
            (profile?.block_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline} m-1`}
                onClick={() => handleUnblock(profile)}
              >
                Unblock
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black} m-1`}
                onClick={() => handleBlock(profile)}
              >
                Block
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
