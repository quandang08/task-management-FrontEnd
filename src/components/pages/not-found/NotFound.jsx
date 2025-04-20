import { Link } from "react-router-dom";
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Trang này không tồn tại.</h2>
        <p>Bạn có thể đã nhập sai URL hoặc trang đã bị xóa.</p>
        <Link to="/" className="home-button">
          Về trang chủ
        </Link>
      </div>
      <div className="not-found-illustration">
        <img src="https://i.pinimg.com/564x/d4/46/fd/d446fdda8b9a0d046be21001d6a66689.jpg" alt="404 Error" />
      </div>
    </div>
  );
};

export default NotFound;