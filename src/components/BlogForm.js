import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/toast";

const BlogForm = ({ editing }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const { addToast } = useToast();

  const goBack = () => {
    if (editing) {
      navigate(`/blogs/${id}`);
    } else {
      navigate("/blogs");
    }
  };

  const validateForm = () => {
    let validated = true;

    if (title === "") {
      setTitleError(true);
      validated = false;
    }

    if (body === "") {
      setBodyError(true);
      validated = false;
    }

    return validated;
  };

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if (validateForm()) {
      if (editing) {
        axios
          .patch(`http://localhost:3001/posts/${id}`, {
            title,
            body,
            publish,
          })
          .then(() => {
            navigate(`/blogs/${id}`);
          });
      } else {
        axios
          .post("http://localhost:3001/posts", {
            title,
            body,
            publish,
            createdAt: Date.now(),
          })
          .then(() => {
            addToast({
              type: "success",
              text: "Successfully created!",
            });
            navigate("/admin");
          });
      }
    }
  };
  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalPublish(res.data.publish);
      });
    }
  }, [id, editing]);

  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError ? "border-danger" : ""}`}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        {titleError && <div className="text-danger">Title is required.</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={`form-control ${bodyError ? "border-danger" : ""}`}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          rows="10"
        />
        {bodyError && <div className="text-danger">Body is required.</div>}
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="form-check-label">Publish</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={goBack}>
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
