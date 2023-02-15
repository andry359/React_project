import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from "../pages/Error";
import Login from "../pages/Login";

export const privateRoutes = [
    { path: '/about', element: About },
    { path: '/', element: About },
    { path: '/*', element: About },
    { path: '/posts', element: Posts },
    { path: '/posts/:id', element: PostIdPage },
];

export const publicRoutes = [
    { path: '/login', element: Login },
    { path: '/about', element: Login },
    { path: '/', element: Login },
    { path: '/*', element: Login },
    { path: '/posts', element: Error },
];