import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchLink, fetchLinks } from "../slices/linkSlice.js";
import { format } from "timeago.js";

const baseURL = import.meta.env.VITE_API_BASE;

export default function StatsPage() {
  const { code } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.links.single);
  const error = useSelector((state) => state.links.error);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchLink(code))
      .unwrap()
      .catch(() => {}) // Error is stored in Redux
      .finally(() => setLoading(false));
  }, [code, dispatch]);

  const handleRedirect = () => {
    setTimeout(() => {
      dispatch(fetchLink(code));
      dispatch(fetchLinks());
    }, 500);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  if (error)
    return (
      <div className="max-w-lg mx-auto bg-white p-5 shadow rounded text-red-600">
        <p>{error}</p>
        <Link to="/" className="text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>
    );

  if (!data)
    return (
      <p className="text-center py-4 text-gray-500">
        Link not found.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto bg-white p-5 shadow rounded">
      <Link
        to="/"
        className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded"
      >
        ← Back
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        Stats for{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${baseURL}/${code}`}
          onClick={handleRedirect}
          className="text-blue-600 underline text-sm"
        >
          {baseURL.slice(8)}/{code}
        </a>
      </h1>

      <p className="flex"> {/* Make the paragraph a flex container */}
        <strong className="shrink-0 mr-1">URL:</strong>{" "} {/* Prevent "URL:" from shrinking */}
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline min-w-0 break-words" // ✨ ADDED CLASSES HERE ✨
        >
          {data.url}
        </a>
      </p>
      <p><strong>Total Clicks:</strong> {data.clicks}</p>
      <p>
        <strong>Last Clicked:</strong>{" "}
        {data.last_clicked ? format(data.last_clicked) : "-"}
      </p>
    </div>
  );
}