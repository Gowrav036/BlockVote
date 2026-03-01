import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/votes/results")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      {results.map((item, index) => (
        <div key={index}>
          {item._id} : {item.count} votes
        </div>
      ))}
    </div>
  );
}