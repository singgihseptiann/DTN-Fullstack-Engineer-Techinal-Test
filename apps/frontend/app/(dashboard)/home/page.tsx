import React from "react";

export default async function page() {
  const data = await fetch("http://localhost:3001/raw-data/graph", {
    cache: "no-store", // pastikan data selalu fresh
  });
  const json = await data.json();
  const graphData = json.map((item: any) => ({
    resultTime: new Date(item.resultTime).toLocaleString(),
    availability: item.availability.toFixed(2) + "%",
  }));
  console.log(graphData);
  return (
    <div>
      {graphData.map((item: any, index: number) => (
        <div key={index}>
          <div>{item.resultTime}</div>
          <div>{item.availability}</div>
        </div>
      ))}
    </div>
  ); // <div>{JSON.stringify(graphData, null, 2)}</div>;
}
