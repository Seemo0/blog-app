import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';

export default function Posts({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={
              "https://cdn.motor1.com/images/mgl/mrz1e/s3/coolest-cars-feature.jpg"
            }
            alt="semo"
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>blogggg</h2>
        </Link>
        <p className="info">
          <a className="author">semo</a>
          <time>{formatISO9075(new Date())}</time>
        </p>
        <p className="summary">summary</p>
      </div>
    </div>
  );
}
