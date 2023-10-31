import { Link } from 'gatsby';
import React from 'react';
import './style.scss';

function Substring({ excerpt }) {
  const index = excerpt.indexOf('@');
  const substring = index !== -1 ? excerpt.substring(0, index) : excerpt; // '@' 문자가 있다면, 그 전까지의 문자열을 가져오고, 없다면 전체 문자열을 가져옵니다.

  return substring;
}

function PostCard({ post }) {
  const { id, slug, title, excerpt, date, categories } = post;
  return (
    <div className="post-card-wrapper">
      <Link className="post-card" key={id} to={slug}>
        <div className="title">{title}</div>
        <p className="description">{Substring({ excerpt })}</p>
        {/* <p className="description" dangerouslySetInnerHTML={{ __html: excerpt }} /> */}
        <div className="info">
          <div className="date">{date}</div>
          <div className="categories">
            {categories?.map((category) => (
              <Link className="category" key={category} to={`/posts/${category}`}>
                {category}
              </Link>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
