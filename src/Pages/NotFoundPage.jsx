import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <h1>Error 404</h1>
      <p>Page not found.</p>
    </>
  );
};
export default NotFoundPage;
