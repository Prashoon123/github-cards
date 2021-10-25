import React from "react";
import { useRouter } from "next/dist/client/router";

function Option({ name, desc, navigation }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(navigation)}
      className="m-6 text-left bg-gray-800 p-6 rounded-md cursor-pointer"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>{desc}</p>
    </div>
  );
}

export default Option;
