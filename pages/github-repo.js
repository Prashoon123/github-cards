import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/dist/shared/lib/head";
import { toast, Toaster } from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import FileSaver from "file-saver";

export default function GithubRepo({ repositoryData }) {
  const router = useRouter();
  const [repoLink, setRepoLink] = useState(
    "https://github.com/Prashoon123/Prashoon123"
  );
  const [repoData, setRepoData] = useState(repositoryData);
  const [theme, setTheme] = useState("light");
  const [downloading, setDownloading] = useState(false);

  const backgroundColor = () => {
    switch (theme) {
      case "light":
        return "bg-white";
      case "dark":
        return "bg-black";
      case "dim":
        return "bg-gray-900";
      case "water":
        return "bg-blue-400";
      case "fire":
        return "bg-yellow-600";
      case "rose":
        return "bg-red-700";
    }
  };

  const color = () => {
    switch (theme) {
      case "light":
        return "text-black";
      case "dark":
        return "text-white";
      case "dim":
        return "text-white";
      case "water":
        return "text-black";
      case "fire":
        return "text-black";
      case "rose":
        return "text-black";
    }
  };

  const createCard = async (e) => {
    e.preventDefault();

    if (!repoLink || repoLink[0] === "")
      return toast.error("Please enter a valid GitHub repo link!");

    const splittedLink = repoLink.split("/");

    await fetch(
      `https://api.github.com/repos/${splittedLink[3]}/${splittedLink[4]}`
    ).then((res) =>
      res.json().then((data) => {
        if (data.message === "Not Found") {
          toast.error("Please enter a valid GitHub repo link!");
        } else {
          setRepoData(data);
        }
      })
    );
  };

  const downloadImage = () => {
    setDownloading(true);

    const node = document.getElementById("card");

    htmlToImage.toBlob(node).then((blob) => {
      const clipboardItem = [new ClipboardItem({ [blob.type]: blob })];

      navigator.clipboard.write(clipboardItem);

      FileSaver.saveAs(blob, "github-user.png");

      setDownloading(false);
    });
  };

  const copyImage = () => {
    setDownloading(true);

    const node = document.getElementById("card");

    htmlToImage.toBlob(node).then((blob) => {
      const clipboardItem = [new ClipboardItem({ [blob.type]: blob })];

      navigator.clipboard.write(clipboardItem);

      setDownloading(false);

      toast.success("Copied the image to clipboard!");
    });
  };

  const borderColor = `border-${color().split("-")[1]}`;

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>GitHub Cards</title>
      </Head>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 m-2 cursor-pointer"
        style={{ height: 30, width: 30 }}
        onClick={() => router.push("/")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <form onSubmit={createCard} className="flex flex-col items-center">
          <label htmlFor="githubRepo" className="text-xl font-semibold mb-2">
            Enter the GitHub repo link -
          </label>

          <input
            type="url"
            id="githubRepo"
            className="border outline-none p-2 rounded-md bg-transparent border-gray-600 focus:border-gray-800"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
          />

          <label
            htmlFor="cardTheme"
            className="text-xl font-semibold mt-4 mb-2"
          >
            Choose the card theme -
          </label>

          <select
            id="cardTheme"
            className="border outline-none p-2 rounded-md bg-transparent border-gray-600 focus:border-gray-800 text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light" className="text-black">
              Light
            </option>
            <option value="dark" className="text-black">
              Dark
            </option>
            <option value="dim" className="text-black">
              Dim
            </option>
            <option value="water" className="text-black">
              Water
            </option>
            <option value="fire" className="text-black">
              Fire
            </option>
            <option value="rose" className="text-black">
              Rose
            </option>
          </select>

          <button className="mt-8 bg-gray-800 text-white p-4" type="submit">
            Create a card
          </button>
        </form>

        <div
          id="card"
          className="w-full flex justify-center items-center bg-transparent h-auto p-10"
        >
          {repoData?.name && (
            <div
              className={`${backgroundColor()} ${
                theme === "dark" && "border"
              } group flex flex-col justify-center items-center w-3/4 rounded-lg relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  downloading === true ? "hidden" : "group-hover:inline"
                } absolute right-0 top-0 m-6 cursor-pointer object-contain`}
                viewBox="0 0 20 20"
                style={{ height: 25, width: 25 }}
                fill={color().split("-")[1]}
                onClick={downloadImage}
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  downloading === true ? "hidden" : "group-hover:inline"
                } absolute right-0 top-0 m-6 mr-14 cursor-pointer object-contain`}
                viewBox="0 0 20 20"
                style={{ height: 25, width: 25 }}
                fill={color().split("-")[1]}
                onClick={copyImage}
              >
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
              </svg>

              <div
                className={`flex flex-col justify-center items-center w-full p-10 ${borderColor} border-b`}
              >
                <h2 className={`${color()} text-2xl font-semibold mt-2`}>
                  {repoData?.name}
                </h2>

                <p className={`${color()} mt-2`}>{repoData?.description}</p>
              </div>

              <div className="grid grid-cols-3 w-full items-center p-4">
                <div className={`${borderColor} data`}>
                  <p className={color()}>{repoData?.stargazers_count}</p>
                  <p className={color()}>STARS</p>
                </div>

                <div className={`${borderColor} data`}>
                  <p className={color()}>{repoData?.forks}</p>
                  <p className={color()}>FORKS</p>
                </div>

                <div>
                  <p className={color()}>{repoData?.open_issues}</p>
                  <p className={color()}>ISSUES</p>
                </div>

                <div className={`${borderColor} data1`}>
                  <p className={color()}>{repoData?.size} kB</p>
                  <p className={color()}>SIZE</p>
                </div>

                <div className={`${borderColor} data1`}>
                  <p className={color()}>{repoData?.owner?.login}</p>
                  <p className={color()}>CREATED BY</p>
                </div>

                <div className="mt-4">
                  <p className={color()}>{repoData?.license?.spdx_id || "-"}</p>
                  <p className={color()}>LICENSE</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const repoData = await fetch(
    "https://api.github.com/repos/Prashoon123/Prashoon123"
  ).then((res) => res.json());

  return {
    props: {
      repositoryData: repoData,
    },
  };
}
