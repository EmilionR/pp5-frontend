import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import PopularProfiles from "../profiles/PopularProfiles";
import appStyles from "../../App.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import Post from "./Post";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import BlockedComment from "../comments/BlockedComment";

function PostPage({showToast}) {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [blocks, setBlocks] = React.useState([]);

  // Fetch post data
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [ { data: post }, { data: comments }, {data: blockData} ] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
          axiosReq.get("/blocks/"),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        setBlocks(blockData.results);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularProfiles mobile />
        <Post {...post.results[0]} setPosts={setPost} postPage showToast={showToast}  />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
              showToast={showToast}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}

          {/* Display comments */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                blocks.some(block => block.target === comment.profile_id)
                ? (
                  <BlockedComment
                  key={comment.id} />
                ) : (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                  showToast={showToast}
                />
                )
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;
