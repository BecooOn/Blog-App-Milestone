## Blog Application

This application allows users to create, publish, and manage their personal blogs. Users can easily create blog posts to share their original content and have the option to publish them or save them as drafts whenever they wish. Additionally, users can discover, read, comment on, and like blogs shared by other users. This enables users to find content on various topics and interact with other users. In this way, blog authors can share their own content while engaging within the community.

## Live Demo

Check out the live demo of the application [here](https://blog-app-milestone.netlify.app/).

## Features

- **User Blog Creation and Management**: Users can easily create their own personal blogs, publish their content, edit, and manage them. They also have the option to save their posts as drafts.
- **Blog Discovery and Reading**: Users can discover and read blogs shared by other users. This allows them to find content on different topics.
- **Commenting and Liking**: Users can comment on and like blogs they read, allowing them to interact with content creators.
- **Profile Management**: Users can edit their information from their personal profiles.

## Installation

To get started with the Blog App, follow these steps:

1. Clone the repository to your computer:

```
git clone https://github.com/BecooOn/Blog-App-Milestone.git

```

2. Navigate to the project directory

```
cd blog-app
```

3. Install the required packages

```
yarn install
```

4. Start the application

```
yarn start
```

5. Open the browser and navigate to http://localhost:3000

## Usage

1. **Home Page**: Access the home page to view the latest blogs and explore content.
2. **User Authentication**: Register or log in to read and interact with blogs.
3. **Reading Blogs**: Once logged in, users can read blogs shared by other users.
4. **Interacting with Blogs**: Users can comment on blogs, like them, and share their thoughts.
5. **Profile Management**: Update personal information and settings from the profile page.
6. **Creating Blogs**: Authenticated users can create new blogs, either publishing them immediately or saving them as drafts.
7. **Managing Own Blogs**: Users can view and manage their own blogs, editing or deleting them as necessary.
8. **Responsive Design**: The application is designed to work seamlessly across various devices and screen sizes.

## Project Skeleton

```
Blog App Milestone

|----readme.md
SOLUTION
├── public
|    ├── index.html
|    ├── logo.png
|    ├── manifest.json
|    └──  robots.txt
├── src
|    ├── index.css
|    ├── index.js
|    ├── App.js
|    ├── app
|    │   └── store.jsx
|    ├── assets
|    │   ├── 404.png
|    │   ├── blog-app.gif
|    │   └── logo.png
|    ├── components
|    │   ├── auth
|    │   │   ├── LoginFom.jsx
|    │   │   └── RegisterForm.jsx
|    │   ├── blog
|    │   │   ├── Card.jsx
|    │   │   ├── CommentCard.jsx
|    │   │   ├── CommentEditor.jsx
|    │   │   ├── CommentForm.jsx
|    │   │   └── UpdateModal.jsx
|    │   ├── skeleton
|    │   │   └── SkeletonCard.jsx
|    │   ├── DataFetchMessages.jsx
|    │   ├── FooTer.jsx
|    │   ├── NavBar.jsx
|    │   └── UpdateProfile.jsx
|    ├── features
|    │   ├── authSlice.jsx
|    │   └── blogSlice.jsx
|    ├── helper
|    │   └── ToastNotify.jsx
|    ├── hooks
|    │   ├── useAuthCalls.jsx
|    │   ├── useAxios.jsx
|    │   └── useBlogCalls.jsx
|    ├── pages
|    │   ├── About.jsx
|    │   ├── Dashboard.jsx
|    │   ├── Detail.jsx
|    │   ├── Login.jsx
|    │   ├── MyBlog.jsx
|    │   ├── NewBlog.jsx
|    │   ├── NotFound.jsx
|    │   ├── Profile.jsx
|    │   └── Register.jsx
|    ├── router
|    |    ├── AppRouter.jsx
|    |    └── PrivateRouter.jsx
|    └── styles
|        └── globalStyles.jsx
├── LICENSE
├── netlify.toml
└── package.json
```

## Technologies I used

- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework with pre-styled components.
- **Redux** Toolkit: Provides a standardized way to write Redux logic, including store configuration and slice management.
- **Redux Toolkit**: A Redux library used for application state management.
- **Redux Persist**: Persist and rehydrate a Redux store.
- **React Redux**: Official React bindings for Redux.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router DOM**: Declarative routing for React applications.
- **Formik**: Form management library for React.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **React Toastify**: Library for creating beautiful toast notifications.
- **SweetAlert2**: A library used for displaying notifications to users.

## Dev Tools

- Redux DevTools: A browser extension that allows developers to inspect every action and state change in their Redux application.

## Contributions

I welcome contributions! If you find any bugs, have suggestions, or want to contribute, please open an issue or send a pull request. Your feedback and contributions are greatly appreciated.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/BecooOn/Blog-App-Milestone/blob/main/LICENSE) file for more details.
