import axios from "axios";
import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToast from "../hooks/toast";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const limit = 5;

  async function getReqeusts() {
    const response = await axios.get(
      `https://zayne-blog-project.herokuapp.com/reqeusts`
    );
    return responst.data;
  }

  useEffect(() => {
    const resData = getReqeusts();
    console.log(resData);
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`);
    getPosts(page);
  };

  const getPosts = useCallback(
    (page = 1) => {
      let params = {
        _page: page,
        _limit: limit,
        _sort: "id",
        _order: "desc",
        title_like: searchText,
      };

      if (!isAdmin) {
        params = { ...params, publish: true };
      }

      axios
        .get(`http://localhost:3001/posts`, { params })
        .then((res) => {
          setNumberOfPosts(res.headers["x-total-count"]);
          setPosts(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setError("Something went wrong in database");
          addToast({
            text: "Something went wrong",
            type: "danger",
          });
        });
    },
    [isAdmin, searchText]
  );

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, [pageParam]);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      getPosts(1);
      addToast({
        text: "Successfully deleted",
        type: "success",
      }).catch((e) => {
        addToast({
          text: "The blog could not be deleted",
          type: "danger",
        });
      });
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderBlogList = () => {
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => navigate(`/blogs/${post.id}`)}
        >
          {isAdmin ? (
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => deleteBlog(e, post.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </Card>
      );
    });
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        className="form-control"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {posts.length === 0 ? (
        <div>No blog posts found</div>
      ) : (
        <>
          {renderBlogList()}
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onClick={onClickPageButton}
            />
          )}
        </>
      )}
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
