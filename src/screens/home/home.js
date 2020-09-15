import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <Link to='/startPage'>生成图片</Link>
    </div>
  );
}

export default Home;
