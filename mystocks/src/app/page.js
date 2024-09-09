"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/smartapi", {
          clientCode: "S1285736",
          pin: "0369",
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>Smart API Data</h1> */}
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          <h1>Smart API Data</h1>
          {error && <p>Error: {error}</p>}
          {data ? (
            <div>
              <h2>Profile Data</h2>
              <pre>{JSON.stringify(data.profile, null, 2)}</pre>

              <h2>Fund Data</h2>
              <pre>{JSON.stringify(data.fundInfo, null, 2)}</pre>

              <h2>Holdings Data</h2>
              <pre>{JSON.stringify(data.holdings, null, 2)}</pre>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
          {/* <h2>Profile Information</h2>
          <p>
            <strong>Client Code:</strong> {data?.data.clientcode}
          </p>
          <p>
            <strong>Name:</strong> {data?.data.name}
          </p>
          <p>
            <strong>Email:</strong> {data?.data.email || "N/A"}
          </p>
          <p>
            <strong>Mobile No:</strong> {data?.data.mobileno || "N/A"}
          </p>
          <p>
            <strong>Exchanges:</strong> {data?.data?.exchanges.join(", ")}
          </p>
          <p>
            <strong>Products:</strong> {data?.data?.products.join(", ")}
          </p> */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Home() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Define the payload for the POST request
//         const payload = {
//           clientCode: "S1285736", // Replace with your actual client code
//           pin: "0369", // Replace with your actual password
//         };

//         // Make the POST request
//         const response = await axios.post("/api/smartapi", payload);

//         // Set data from response
//         setData(response.data);
//       } catch (error) {
//         // Handle any errors
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Smart API Data</h1>
//       {error && <p>Error: {error}</p>}
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }
