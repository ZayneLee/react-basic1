import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {posts.map((post) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            onClick={() => history.push("/blogs/edit")}
          >
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("delete blog");
                }}
              >
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListPage;