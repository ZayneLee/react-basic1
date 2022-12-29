import propTypes from "prop-types";

const Card = ({ title, children }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.element,
};

Card.defaultProps = {
  children: null,
};

export default Card;
