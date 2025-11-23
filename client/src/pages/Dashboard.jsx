import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinks, addLink, deleteLink } from "../slices/linkSlice";
import FilterBar from "../components/FilterBar";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.links.all);

  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSortType] = useState("none");

  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    dispatch(fetchLinks());
  }, []);

  const [error, setError] = useState("");

const handleAdd = async () => {
  setError(""); // Clear old error

  try {
    await dispatch(addLink({ url, code })).unwrap();
    setUrl("");
    setCode("");

    // refresh list
    dispatch(fetchLinks());
  } catch (err) {
    setError(err); // Store error in local state
  }
};


  const handleDelete = (shortCode) => {
    dispatch(deleteLink(shortCode));
  };

  let filtered = [...links];

  // FILTER
  filtered = filtered.filter((l) => {
    const x = filter.toLowerCase();
    if (filterType === "code") return l.code.toLowerCase().includes(x);
    if (filterType === "url") return l.url.toLowerCase().includes(x);
    return (
      l.code.toLowerCase().includes(x) || l.url.toLowerCase().includes(x)
    );
  });

  // SORT
  if (sortType === "code-asc") filtered.sort((a, b) => a.code.localeCompare(b.code));
  if (sortType === "code-desc") filtered.sort((a, b) => b.code.localeCompare(a.code));
  if (sortType === "clicks-asc") filtered.sort((a, b) => a.clicks - b.clicks);
  if (sortType === "clicks-desc") filtered.sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="max-w-3xl mx-auto">

      {/* ADD LINK FORM */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Create Short Link</h2>
        <input className="border p-2 w-full" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Long URL" />
        <input className="border p-2 w-full mt-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Custom code" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
          Add Link
        </button>
        {error && (
  <p className="text-red-600 mt-2 font-medium">
    {error}
  </p>
)}

      </div>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        filterType={filterType}
        setFilterType={setFilterType}
        sortType={sortType}
        setSortType={setSortType}
      />

      <div className="bg-white p-5 rounded-lg shadow mt-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">All Links</h2>
        <LinkTable links={filtered} onDelete={handleDelete} />
      </div>
    </div>
  );
}
