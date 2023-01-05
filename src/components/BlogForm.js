import axios from "axios";
import { bool } from "prop-types";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const onSubmit = () => {
    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      axios
        .post("http://localhost:3001/posts", {
          title,
          body,
          createdAt: Date.now(),
        })
        .then(() => {
          history.push("/blogs");
        });
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setBody(res.data.body);
    });
  }, [id]);
  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          rows="10"
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        {editing ? "Edit" : "Post"}
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
