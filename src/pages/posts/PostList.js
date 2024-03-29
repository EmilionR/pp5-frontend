import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import Post from "./Post";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostList.module.css";
import NoResults from "../../assets/no-results.png";
import { Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostList({ message, filter = "" }) {
  const [posts, setPosts] = React.useState({ results: [] });
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [blocks, setBlocks] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [{ data: friends }, { data: blocks }] =
        await Promise.all([
          axiosReq.get(`/friends/`),
          axiosReq.get("/blocks/"),
        ]);
        setFriends(friends.results);
        setBlocks(blocks.results);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    

    // Reset hasLoaded to false
    setHasLoaded(false);
    // Fetch posts after half a second
    const timer = setTimeout(() => {
      fetchPosts();
      fetchData();
    }, 500);
    // Clear timer
    return () => clearTimeout(timer);
  }, [filter, query, pathname]);

  console.log(posts.results);
  console.log(friends);
  console.log(currentUser);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {/* Search bar */}
        <i className={`fas fa-search ${styles.SearchIcon}`}></i>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            type="text"
            value={query}
            placeholder="Search"
            className="mr-sm-2"
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        {/* Posts */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) =>
                  // If the current user is blocked by the post owner
                  blocks.some(block => block.target === post.profile_id) ? null : (
                  // If the post is friends-only and the current user is not signed in
                  post.friends_only && !currentUser ? (
                      null
                      // If the post is friends-only and the user is not the post owner or friends with the post owner
                    ) : post.friends_only && post.owner !== currentUser.username && !friends.some(pair => pair.friend === currentUser.pk) ? (
                      null
                    ) : (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ) 
                  )
                )}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostList;
