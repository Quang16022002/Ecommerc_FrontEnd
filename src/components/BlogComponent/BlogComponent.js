import React, { useEffect, useState } from "react";
import "./BlogComponent.scss";
import { Link } from "react-router-dom";
import * as PostService from "../../services/PostService";
import moment from "moment";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
const BlogComponent = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostService.getAllPosts();
        setBlogs(data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);
  console.log('blogs',blogs)

  return (
    <div >
   
   <p>adaad</p>
   <div className="container px-5">

   <div className="blog-container">
  {blogs.map((post, index) => (
    <div 
      key={index}
      className="blog"
      style={{ width: '24%', marginRight:12 }} // Đặt width cho mỗi div blog là 24% để hiển thị 4 div trên mỗi hàng
    >
      <div>
        <Link to={`/blog/${post._id}`}>
          <img
            className="img"
            style={{ width: '100%', cursor: 'pointer', marginBottom: 10 }}
            src={post.image[0]}
            alt={`Image ${index}`}
          />
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'black', width: '100%' }}
          to={`/blog/${post._id}`}
        >
          <strong style={{ marginTop: 20, fontSize: 16, color: '#444444', cursor: 'pointer' }}>
            {post.describe.slice(0, 60)}...
          </strong>
        </Link>
      </div>
    </div>
  ))}
</div>




  </div>
</div>

    
  );
};

export default BlogComponent;
