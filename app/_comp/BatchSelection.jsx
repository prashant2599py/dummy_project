import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function BatchSelection({ selectedBatch }) {
  const [batches, setBatches] = useState(['1', '2', '3']);  // Hardcoded batch names
  const [error, setError] = useState(null);

  useEffect(() => {
    // If you were fetching batches from an API before, you can remove that logic now.
    // In case you still need to fetch any data, you can keep the fetch logic but it's not needed for static values like F7, F8, F9.
  }, []);

  return (
    <div className="p-4 max-w-sm mx-auto">
      {/* <label className="block text-lg font-semibold mb-2">Select Batch:</label> */}
      <select
        onChange={(e) => selectedBatch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white"
      >
        {batches.map((batch, index) => (
          <option key={index} value={batch} className="text-gray-800">
            {batch}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default BatchSelection;
