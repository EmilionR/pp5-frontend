import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { OptionsDropdown } from "../../components/Options";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import btnStyles from "../../styles/Button.module.css";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comment_count,
    like_count,
    like_id,
    title,
    content,
    image,
    updated_on,
    postPage,
    setPosts,
    showToast,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportText, setReportText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, like_count: post.like_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, like_count: post.like_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      showToast("Success!", "Post deleted.")
      history.goBack();
    } catch (err) {
      //console.log(err);
    }
  };

  const toggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleReport = async (event) => {
    event.preventDefault();
    // Send a POST request to the API to report the post
    try {
      await axiosRes.post("/reports/", {
        owner: currentUser,
        post: id,
        content: reportText
      });
      setShowReportForm(false);
      setShowConfirmation(true);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      {}
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_on}</span>
            {is_owner && postPage && (
              // Display options dropdown if the user is the owner of the post
              <OptionsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            // Display a tooltip if the user is the owner of the post
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-thumbs-up" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-thumbs-up ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-thumbs-up ${styles.LikeOutline}`} />
            </span>
          ) : (
            // Display a tooltip if the user is not logged in
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-thumbs-up" />
            </OverlayTrigger>
          )}
          {/* Display the number of likes and comments */}
          {like_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comment_count}
          {!is_owner && currentUser ? (
            <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={toggleReportForm}>
              {showReportForm
              ? 
                <><i className={`fas fa-xmark ${styles.Flag}`}></i>Cancel</>
                 : 
                <><i className={`far fa-flag ${styles.Flag}`}></i>Report</>
                }
            </Button>
          ) : null}
        </div>
        {showReportForm && (
          <div className="mt-3">
            {/* Report form */}
            <Form onSubmit={handleReport}>
              {/* Form fields for the report */}
              <Form.Group>
                <InputGroup>
                  <Form.Label className="d-none">Reason for report</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please provide a reason for reporting this post."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Button
              className={`${btnStyles.Button} ${btnStyles.Black} mx-2`}
              type="submit"
              >
                Submit Report</Button>
            </Form>
          </div>
        )}
        {showConfirmation && (
          <div className="pt-3">
            <strong className="h4">Your report has been sent!</strong>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Post;
