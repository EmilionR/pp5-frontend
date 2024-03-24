import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { OptionsDropdown } from "../../components/Options";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_on,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      // Delete the comment
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comment_count: prevPost.results[0].comment_count - 1,
          },
        ],
      }));
      // Remove the comment from the comments state
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div className={styles.Comment}>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.User}>{owner}</span>
          <span className={styles.Time}>{updated_on}</span>
          <p>{content}</p>
        </Media.Body>

        {/* Display options dropdown if the user is the owner of the comment */}
        {is_owner && (
          <OptionsDropdown handleEdit={() => {}} handleDelete={handleDelete} />
        )}
      </Media>
    </div>
  );
};

export default Comment;
