import { useState } from "react";
import { useEffect } from "react";

const Card = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/clients");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataRes = await response.json();
        setData(dataRes);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {isLoading ? (
        <h2 className="font-bold text-4xl animate-bounce mt-60">
          Carregando...
        </h2>
      ) : (
        data.map((client, id) => (
          <div
            className="flex-grow border-e-8 border p-4 rounded border-green-900"
            key={id}
          >
            <h2 className="font-bold">{client.company}</h2>
            <p>{client.contact.name}</p>
            <p>{client.contact.phone1}</p>
            <p className="text-xs font-semibold">{client.location.address}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
