import { useState } from "react";
import { useEffect } from "react";

const Card = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/clients");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataRes = await response.json();
        setData(dataRes);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex gap-4">
      {data.map((client, id) => (
        <div
          className="border-e-8 border p-4 rounded border-green-900"
          key={id}
        >
          <h2 className="font-bold">{client.company}</h2>
          <p>{client.contact.name}</p>
          <p>{client.contact.phone1}</p>
          <p className="text-xs">{client.location.address}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
