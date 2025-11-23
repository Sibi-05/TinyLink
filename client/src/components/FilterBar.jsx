import React from "react";

export default function FilterBar({
  filter,
  setFilter,
  filterType,
  setFilterType,
  sortType,
  setSortType,
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      {/* SEARCH BAR */}
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Search by code or URL..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <button
          onClick={() => setFilter(filter.trim())}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* FILTER + SORT OPTIONS */}
      <div className="flex gap-4 mt-4">

        {/* Filter dropdown */}
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Filter: Code + URL</option>
          <option value="code">Filter: Code only</option>
          <option value="url">Filter: URL only</option>
        </select>

        {/* Sort dropdown */}
        <select
          className="border p-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">Sort: None</option>
          <option value="code-asc">Code A → Z</option>
          <option value="code-desc">Code Z → A</option>
          <option value="clicks-asc">Clicks Low → High</option>
          <option value="clicks-desc">Clicks High → Low</option>
          <option value="date-newest">Newest Click</option>
          <option value="date-oldest">Oldest Click</option>
        </select>

      </div>
    </div>
  );
}
