# Flow - Frontend App
![Project-image](documentation/responsive.png)

Flow is an image-sharing social media site. Users can post images, comment on posts, and follow other users.
Users can also create personal feeds by following other users and liking posts. They can also hide unwanted content, block users, create their own inner circle of selected followers, and more.

I wanted a site similar to Instagram and Tumblr but where users can interact in a more direct and genuine way, without clutter and redundant functions meant to distract the user and bloat their feed. That's where Flow is different, and it will always stay focused on what draws people to these types of platforms in the first place.

[View the website here](https://emil-pp5-frontend-9557540625e4.herokuapp.com/)

## Contents

* [Features](#Features)
  * [Existing Features](#existing-features)
    * [General Features](#general-features)
    * [Navigation Bar](#navigation-bar)
    * [Profiles Sidebar](#profiles-sidebar)
    * [Post List](#post-list)
    * [Post Page](#post-page)
    * [Profile Page](#profile-page)
    * [Register/Login page](#registerlogin-page)
    * [Post Report](#post-report)
  * [Future Implementations](#future-implementations)
  * [Defensive Design Feaures](#defensive-design-features)

* [User Experience](#User-Experience)
  * [User Stories](#User-Stories)

* [Design](#Design)
  * [Color Scheme](#color-scheme)
  * [Typography](#typography)
  * [Wireframes](#wireframes)
  * [Reusable Component Design](#reusable-component-design)
  * [Accessibility](#Accessibility)
  * [Agile Methodology](#agile-methodology)

* [Technologies Used](#Technologies-Used)
  * [Languages Used](#Languages-Used)
  * [Frameworks, Libraries & Programs Used](#frameworks--libraries-used)
  * [Other Technologies Used](#other-technologies-used)

* [Deployment](#Deployment)
  * [Heroku](#heroku)
  * [GitHub](#github)

* [Testing](#Testing)
  * [Solved Bugs](#solved-bugs)
  * [Unfixed Bugs](#unfixed-bugs)
  
* [Credits](#Credits)
  * [Tutorials & Code Used](#tutorials--code-used)
  * [Acknowledgments](#acknowledgments)

## Features

### Existing Features

#### General Features

* Fully responsive design
* Full frontend CRUD for user content and profiles 
* Custom toast notification system
* Advanced user interaction options
* Redirection of users based on authorization

#### Navigation Bar:
![Profiles Sidebar](documentation/navbar.png)

The navigation is omnipresent across the site and displays a different set of links depending on whether or not the user is signed in. The layout and content are responsive and adapt to the screen size.

#### Profiles Sidebar:
![Profiles Sidebar](documentation/sidebar.png)

Users can see a list of the most popular profiles in a dedicated sidebar. It lists the profiles with the most followers. Users can acess these profiles from the sidebar, and signed-in users can follow or unfollow them directly from the sidebar.

The profile sidebar is always present on screens that are big enough. On smaller screens, it instead appears in the form of a smaller section above the main content, and on certain pages it is removed.

#### Post List:
![Post list](documentation/post-list.png)

The main page of the app lets the user browse all posts in an infinite scroll format. A simple search bar enables filtering by page titles and usernames in real-time. Clicking a post opens the post page for that particular post.

Signed-in users also have access to a filtered feed of the users they follow, and one for only the posts they have liked. If the user has blocked another user, their posts will not appear in the post list. Any post that is set to "friends only" visibility only appears in the post list if its owner has marked you as a friend.

#### Post Page:
![Post page](documentation/post-page.png)

On the post page, users can see the details of a specific post. They can also see a feed of user comments for the post. Comments appear in an infinite scroll format.

Signed-in users can also edit or delete any post they own from its post page.

#### Profile Page:
![Profile page](documentation/profile-page.png)

The profile page displays information about the associated user. For example, you can see how many posts they've made, how many followers they have, and how many profiles they're following. If the user is your follower, you see a line about that as well. There's also an information section where the user can add their own information.

Next to this section, a signed-in user can see buttons for following and blocking the profile owner, unless the profile belongs to the signed-in user. If the profile owner is a follower of the signed-in user, there's also a button for marking the profile owner as a friend.

Below the main profile section, you can see all posts made by the profile owner.

#### Register/Login Page:
![Login page](documentation/auth-pages.png)

The register page lets users create a new user without any hassle. Upon registration, the user is redirected to the sign-in page. If a signed-in user somehow navigates to either of these pages, they are redirected to the home page.

#### Post Report
![Post Report](documentation/report.png)

Signed-in users can see a "report" button on posts in the post list and on the post page. Clicking the button opens a report form where they can state the reason for reporting the post. When a report is submitted, it appears on the admin page to let admins quickly find potentially illicit/offensive content.

### Future Implementations:

Future iterations of the project will include more user pages. Users will have access to lists of friends, comments, and blocked users. Profile pages will include more information as well. Blocking a user will also have more extensive effects beyond simply hiding content.

### Defensive Design Features

* Authorization checks
  * There are multiple layers of authorization, using JWT tokens and CORS headers to grant access to the selected client
  * The app checks for auth status wherever it's relevant
  * Unauthorized users are redirected away from pages that require authorization
  * Sensitive operations check the authorized user's owner status
  * The app always checks for auth status before trying to access anything related to user data

* Form validation
  * Submitted data is validated on both the frontend and the backend
  * Any invalid data sent to the backend is rejected and throws an error
  * Image file size is restricted using a custom validator
  * Model fields that can be manipulated have default values and restrictions such as maximum character count

* Backup and default values
  * Profile images have a default value to prevent broken image elements
  * Profiles are automatically created when users are created, to prevent any risk of null references

* Error pages
  * A "page not found" appears whenever a user tries to access an invalid URL

## User Experience

### User stories

EPIC - Navigation
* Navigation bar: As a user I can see a navigation menu on every page so that I can navigate with ease
* Routing: As a user I can navigate easily through pages so that I can browse the site without reloading the page

EPIC - Authentication
* Sign up: As a user I can create an account so that I can access member-only features
* Sign in: As a registered user I can sign in to the app so that I can use my account
* Authentication status: As a user I can see whether or not I am signed in so that I can sign in or out as needed
* Stay logged in: As a user I can stay logged-in until I choose to log out so that I can have a smooth experience

EPIC - Posting
* Create post: As a signed-in user I can create new posts so that I can show my images to other users
* Edit post: As a post owner I can edit the details of my post so that I can update posts or fix mistakes
* Delete post: As a post owner I can delete my post so that I have control over my content

EPIC - Browsing
* View recent posts: As a user I can view all the most recent posts, ordered by most recently created first so that I am up to date with the newest content
* Personal feed: As a user, I can choose to view only the content I choose to follow, so that I can find the most relevant content for me
* Search posts: As a user, I can search for specific posts, so that I can find the content that I seek
* View post details: As a user I can open a single post so that I can see its details and comments
* Infinite scroll: As a user I can keep scrolling down the page to load more posts automatically so that I have a smooth experience

EPIC - Comments
* View comments: As a user I can view comments on posts so that I can read other users' thoughts about the post
* Create a comment: As a signed-in user I can add my own comments to posts so that I can share what I think and feel about posts
* Delete comments: As the owner of a comment I can delete the comment so that I can remove comments I no longer want to share
* Edit a comment: As the owner of a comment I can edit the comment so that I can update comments and fix errors

EPIC - Like Posts
* Like posts: As a signed-in user I can like posts so that I can show my what content I like
* Unlike posts: As a signed-in user I can unlike a liked post so that I can change my mind
* View liked posts: As a signed-in user I can view a feed of only my liked posts so that I can look at my favorite content

EPIC - Follow Users
* Follow users: As a signed-in user I can follow users so that I can support users who post interesting content
* View followed user posts: As a signed-in user I can view a feed of only posts by users I follow so that I can see what they're posting
* Unfollow users: As a signed-in user I can unfollow my followed users so that I can remove their posts from my feed

EPIC - User Profile
* Profile page: As a user I can view the profiles of other users so that I can see their content and profile information
* Most popular profiles: As a user I can see a list of the users with the most followers so that I can see what's popular
* User stats: As a user I can see the number of posts, follows and followed users of any profile so that I can learn more about the users
* View user's posts: As a user I can view all of a user's posts from their profile page so that I can find their content and see whether I should follow them
* Edit profile: As a signed-in user I can edit my profile so that I can update my avatar and profile information
* Update username and password: As a signed-in user I can change my username and password so that I have control over my account

EPIC - Block Unwanted Content 
* Block user: As a signed-in user I can block another user so that I do not have to see their posts
* Report content: As a signed-in user I can report a post so that inappropriate content can be moderated

EPIC - Friends
* Add friend: As an authenticated user I can add followers to a list of friends so that I can have an inner circle of selected followers
* Friends only: As an authenticated user I can restrict the visibility of my post so that only followers on my friends list can see it

## Design

### Color Scheme

![Color Scheme](documentation/color-scheme.png)

I went with a mellow blue color scheme for the app design. I wanted something that's subtle and consistent but still more interesting than grayscale.

### Typography

For this app, I wanted something linear and punchy. I also wanted something that could be used consistently for many languages. Kanit was an obvious top candidate. It's simple and powerful, and it was originally designed for the Thai alphabet and then adapted to work with Roman letters and various other symbols.

### Wireframes

<details>
<summary>Wireframes</summary>

![Wireframe](documentation/wf-feed-mobile.png)
![Wireframe](documentation/wf-profile-mobile.png)

![Wireframe](documentation/wf-feed-desktop.png)
![Wireframe](documentation/wf-profile-desktop.png)
</details>

### Reusable Component Design

This application was built with modularity and reusability in mind. Components are meant to work on their own and be easy to take out of their context and use elsewhere. Some components are used in multiple places across the app, with more potential uses within reach.

__Post__

Purpose: Display a specific post.
Props:
* ```id```
* ```title```
* ```content```
* ```owner```
* more...
Used in: Post feed, Post detail page, Profile page.
Potential uses: Could be used for a "featured post" component or a list of the most popular posts of all time.

__Comment__

Purpose: Display a specific comment.
Props:
* ```id```
* ```content```
* ```owner```
* more...
Used in: Post detail page
Potential uses: The comment component could be easily reused on profile pages to display all comments made by a specific user.

__Profile__

Purpose: Display a specific profile.
Props:
* ```profile```
* ```owner```
* ```image```
Used in: Post feed, Post detail page, Profile page.
Potential uses: Highly reusable, convenient to use anywhere where you need to show the profile/user associated with a piece of content.

__Avatar__

Purpose: Display a profile avatar.
Props:
* ```profile```
* ```owner```
* ```image```
Used in: Post feed, Post detail page, Profile page, NavBar.
Potential uses: Highly reusable, convenient to use anywhere where you need to show the avatar associated with a profile.

__Asset__

Purpose: Display a media asset.
Props:
* ```src```
* ```message```
* ```spinner```
Used in: Post feed, Post detail page, Profile page, NavBar.
Potential uses: Highly reusable, handy for displaying static images, loading animations, and more.

__NavBar__

Purpose: Supply navigation links across the site.
Props: None
Used in: Everywhere.
Potential uses: Could be fitted onto a completely different app with small routing adjustments.

### Accessibility

To help with accessibility, I have made use of aria features such as aria-label and aria-hidden to help screen readers give correct information. I have also used icons for most user interactions to make it easier for users who struggle with reading.

### Agile Methodology

I implemented the Agile method for my project by defining the epics seen earlier in the document and breaking them into smaller user stories. I then made issues for each epic and user story and assigned each epic to a milestone, connecting each user story issue to its associated epic milestone.

To keep track of the user stories and tasks, I used a Kanban board. All of this can be seen by clicking to the 'Issues' and 'Projects' tabs of this repository.

## Technologies Used

### Languages Used

JavaScript, Python, JSX, HTML, CSS.

### Frameworks & Libraries Used

Django REST - The framework used for building the backend API.

React - The main framework, used for building the frontend application. React allows for efficient and modular design, making it ideal for a content platform like this.

PostgreSQL - Used for the database schema.

Bootstrap - Used for more efficient styling and scripting. Allows for intricate, responsive designs with fewer lines of code.

FontAwesome - Supplies the icons used across the site. I use a lot of icons for this app, to create a better user experience and a better look.

Google Fonts - Supplies the webfont used.

### Other Technologies Used

VSCode - Used for all the coding.

Git - For version control.

GitHub - For project management and storage

Heroku - For live site deployment

AWS - Hosting the database

Cloudinary - Hosting the images

Google & Mozilla Developer Tools - For debugging and trying out design improvements on the fly.

GNU Image Manipulation Program - Cropping and scaling images for faster load times.

Figma - Wireframing

Postman - Testing the API connection

AmIResponsive - For testing how the site looks on different devices.

WAVE Evaluation Tool - To check accessibility.

Web Disability Simulator - To check accessibility.

## Deployment

### Heroku

To deploy the project to Heroku, I took the following steps.

__Project Settings:__

* Go to the axiosDefaults.js file and locate the baseUrl variable.
* Copy the URL from your API and paste it as the value of the baseUrl variable, and make sure that it's within quotation marks.

__Create the Heroku app:__

* Sign in or sign up to [Heroku](https://heroku.com/).
* Click the button that says "Create new app."
* Enter a unique app name.
* Choose your region from the dropdown menu.
* Click the "Create app" button.

__Connect the repository__

Once your Heroku settings and GitHub repository are up to date, it's time to connect the two.

* Go to the Deploy tab of your Heroku app.
* Find the "Deployment method" section and click GitHub.
* Type in the name of your GitHub repository to search for it
* Click 'Connect' to connect the repository
* (Optional) Enable automatic deployment to automatically update the Heroku app whenever you push to GitHub

__Deploy the project to Heroku__

Now, all that's left to do is to deploy and open the app.

* Click "Deploy branch"
* Wait for Heroku to finish building the app.
* Upon successful deployment, click the "View" button to open the app.

### GitHub

__How to Fork the Repository__

1. Log in (or sign up) to GitHub.
2. Go to the repository for this project, [EmilionR/pp5-frontend](https://github.com/EmilionR/pp5-frontend)
3. Click the Fork button in the top right corner.

__How to Clone the Repository__

1. Log in (or sign up) to GitHub.
2. Go to the repository for this project, [EmilionR/pp5-frontend](https://github.com/EmilionR/pp5-frontend)
3. Click on the code button, select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown.
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
5. Type 'git clone' into the terminal and then paste the link you copied in step 3. Press enter.

## Testing

Please refer to [TESTING.md](TESTING.md) for full testing documentation.

### Solved Bugs

* The friend/unfriend button would not change without refreshing the page. I had created two different ways of checking friendship status and was using the wrong one.
* The navbar would get thicker and expand downward on medium screen sizes, covering the top of the page. I had to reduce the nav links and prevent them from wrapping the text.
* When deleting a profile, the auth token would sometimes remain, making the browser think that the user was signed in with an account that doesn't exist. The page could not load correctly. I changed the way the app disposes of tokens when deleting user accounts.
* When deleting a profile, the page would refresh and the toast notification would never appear. I changed the way the site redirects the user.
* Comments could not load the user profile avatar. It was referencing the wrong profile image variable.
* The default avatar would fail to load because the way cloudinary generates URLs did not match the default settings for the model.

### Unfixed Bugs

* When loading certain pages, a 401 error occurs because the app checks for a non-existent authorization token. This is as described in the course material.

* Interface elements that are conditional based on the authorization state of the users sometimes do not load without refreshing the page. This is also in line with the course material. 

## Credits

### Tutorials & Code Used

The project is based on the Code Institute Advanced Frontend course material.

My custom toast notification system is inspired by [React-Toastify](https://www.npmjs.com/package/react-toastify).

### Acknowledgments

Jonathan Zakrisson - help with troubleshooting early connection issues.

Erik Jädersten & Nichamolkan Gjertz - additional user experience testing and moral support

