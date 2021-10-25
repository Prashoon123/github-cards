import Head from "next/head";
import { Follow } from "react-twitter-widgets";
import Option from "../components/Option";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Github Cards</title>
        <link rel="icon" href="/github.png" />
        <meta
          name="description"
          content="Create beautiful-looking cards for your GitHub profile or GitHub repo!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@prashoonb" />
        <meta name="twitter:creator" content="@prashoonb" />
        <meta property="og:title" content="Social Banner" />
        <meta
          property="og:description"
          content="Create beautiful-looking cards for your GitHub profile or GitHub repo!"
        />
        <meta property="og:url" content="https://www.github-cards.ml/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/github.png" />
        <meta property="og:image:alt" content="Social Banner" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content="Github Cards" />
        <link rel="canonical" href="https://www.github-cards.ml/" />
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Head>

      <header className="border-b w-screen flex flex-col justify-center items-center h-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Github Cards</h1>
        <a
          className="github-button"
          href="https://github.com/Prashoon123/social-banner"
          data-color-scheme="no-preference: dark; light: dark; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star Prashoon123/social-banner on GitHub"
        >
          Star on GitHub
        </a>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex flex-row flex-wrap justify-center">
          <Option
            name="GitHub User"
            desc="Generate a card for your GitHub profile!"
            navigation="github-user"
          />
          <Option
            name="GitHub Repo"
            desc="Generate a card for your GitHub repo!"
            navigation="github-repo"
          />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div className="absolute left-0 ml-[10px] hidden lg:inline">
          <Follow username="prashoonb" options={{ size: "large" }} />
        </div>

        <p>
          Made with 💖 by{" "}
          <a
            href="https://prashoonb.tech/"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Prashoon Bhattacharjee
          </a>
        </p>

        <a
          className="absolute right-0 mr-[10px] hidden lg:inline"
          href="https://www.producthunt.com/posts/social-banner?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-social-banner"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=316742&theme=dark"
            alt="Password Generator - Generate random passwords with just a few clicks | Product Hunt"
            style={{ width: 250, height: 54 }}
            width="250"
            height="54"
          />
        </a>
      </footer>
    </div>
  );
}
