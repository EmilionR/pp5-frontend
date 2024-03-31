import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostList from "./pages/posts/PostList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import Toast from "./components/Toast";
import { useState } from "react";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const [notifications, setNotifications] = useState([]);
  let toastProps = null;

  const showToast = (toastTitle, toastMessage) => {
    toastProps = {
      id: notifications.length + 1,
      title: toastTitle,
      message: toastMessage,
      backgroundColor: "#fafafa"
    }
    setNotifications([...notifications, toastProps]);
  }

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostList
              message="No results found. Please change your search term."
              showToast={showToast}
              />
            )}
          />
          <Route
            exact
            path="/following"
            render={() => (
              <PostList
                message="No results found. Please change your search term or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
                showToast={showToast}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostList
                message="No results found. Please change your search term or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
                showToast={showToast}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm showToast={showToast} />} />
          <Route exact path="/signup" render={() => <SignUpForm showToast={showToast} />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm showToast={showToast} />} />
          <Route exact path="/posts/:id" render={() => <PostPage showToast={showToast} />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm showToast={showToast} />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage showToast={showToast} />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm showToast={showToast} />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm showToast={showToast} />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm showToast={showToast} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      <Toast toastList={notifications} position="top-right" setList={setNotifications} />
    </div>
  );
}

export default App;
