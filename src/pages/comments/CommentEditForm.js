import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import { Button } from "react-bootstrap";
import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right pb-3">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Black}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Black}`}
          disabled={!content.trim()}
          type="submit"
        >
          Update
        </Button>
      </div>
    </Form>
  );
}

export default CommentEditForm;