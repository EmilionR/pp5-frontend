import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Options.module.css";
import { useHistory } from "react-router";

const OptionsToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`fas fa-ellipsis ${styles.Toggle}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const OptionsDropdown = ({ handleEdit, handleDelete, showToast }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={OptionsToggle} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-pencil" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function ProfileEditDropdown({ id, handleDelete }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={OptionsToggle} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="Edit profile"
        >
          <i className="fas fa-user-pen" /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="Edit username"
        >
          <i className="fas fa-file-signature" />
          Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="Ddit password"
        >
          <i className="fas fa-key" />
          Change password
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleDelete}
          aria-label="Delete this account"
        >
          <i className="fas fa-user-slash" />
          Delete account
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}