import { useState } from "react";
import usePosts from "../hooks/usePosts";
import React from "react";

const PostList = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((error) => setError(error));
  // }, []);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({
    page,
    pageSize,
    userId,
  });

  if (isLoading) return <p>Is loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        className="form-select mb-3"
        onChange={(event) =>
          setUserId(
            event.target.value === "" ? null : parseInt(event.target.value)
          )
        }
        value={userId ?? ""}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>
      <ul className="list-group">
        {posts?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {/* <button
        disabled={page === 1}
        className="btn btn-primary"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button> */}
      {/* <button
        className="btn btn-primary ms-1"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button> */}
      <button
        disabled={isFetchingNextPage}
        className="btn btn-primary ms-1"
        onClick={() => fetchNextPage()}
      >
        More
      </button>
    </>
  );
};

export default PostList;
