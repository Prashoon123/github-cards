import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/dist/shared/lib/head";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import FileSaver from "file-saver";

export default function GithubUser({ usrData }) {
  const router = useRouter();
  const [username, setUsername] = useState("Prashoon123");
  const [userData, setUserData] = useState(usrData);
  const [theme, setTheme] = useState("light");
  const [downloading, setDownloading] = useState(false);
  const [borderColor, setBorderColor] = useState("border-black");

  const createCard = async () => {
    if (!username || username[0] === "")
      return toast.error("Please enter a valid GitHub username!");

    await fetch(`https://api.github.com/users/${username}`).then((res) =>
      res.json().then((data) => {
        if (data.message === "Not Found") {
          toast.error("Please enter a valid GitHub username!");
        } else {
          setUserData(data);
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

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>GitHub Cards</title>
        <link rel="icon" href="/github.png" />
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
        <div className="flex flex-col items-center">
          <label htmlFor="githubUser" className="text-xl font-semibold mb-2">
            Enter the GitHub username -
          </label>

          <input
            type="text"
            id="githubUser"
            className="border outline-none p-2 rounded-md bg-transparent border-gray-600 focus:border-gray-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label
            htmlFor="cardTheme"
            className="text-xl font-semibold mt-4 mb-2"
          >
            Choose the card theme -
          </label>

          <select
            id="cardTheme"
            className="border outline-none p-2 rounded-md bg-transparent border-gray-600 focus:border-gray-800 cursor-pointer"
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);

              switch (e.target.value) {
                case "light":
                  setBorderColor("border-black");
                  break;
                case "dark":
                  setBorderColor("border-white");
                  break;
                case "dim":
                  setBorderColor("border-white");
                  break;
                case "water":
                  setBorderColor("border-black");
                  break;
                case "fire":
                  setBorderColor("border-black");
                  break;
                case "rose":
                  setBorderColor("border-black");
                  break;
              }
            }}
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

          <button
            className="mt-8 bg-gray-800 text-white p-4"
            onClick={createCard}
          >
            Create a card
          </button>
        </div>

        <div
          id="card"
          className="w-full flex justify-center items-center h-auto p-10"
        >
          {userData?.avatar_url && (
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
                <Image
                  src={userData?.avatar_url}
                  alt="user-avatar"
                  height={60}
                  width={60}
                  className="h-[60px] w-[60px] rounded-full object-contain"
                />

                <h2 className={`${color()} text-2xl font-semibold mt-2`}>
                  {userData?.name}
                </h2>

                <p className={`${color()} mt-2`}>{userData?.bio}</p>
              </div>

              <div className="grid grid-cols-3 w-full items-center p-4">
                <div className={`${borderColor} data`}>
                  <p className={color()}>{userData?.public_repos}</p>
                  <p className={color()}>REPOS</p>
                </div>

                <div className={`${borderColor} data`}>
                  <p className={color()}>{userData?.followers}</p>
                  <p className={color()}>FOLLOWERS</p>
                </div>

                <div>
                  <p className={color()}>{userData?.following}</p>
                  <p className={color()}>FOLLOWING</p>
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
  const userData = await fetch("https://api.github.com/users/Prashoon123").then(
    (res) => res.json()
  );

  return {
    props: {
      usrData: userData,
    },
  };
}
