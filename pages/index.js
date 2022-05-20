import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `https://www.google.com/search?q=${search}`;
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const [items] = useState([
    {
      title: "coding",
      list: [
        ["Vercel", "https://vercel.com/dashboard"],
        ["Github", "https://github.com/"],
        ["Box Shadows", "https://getcssscan.com/css-box-shadow-examples"],
        ["uiGradients", "https://uigradients.com"],
      ],
    },
    {
      title: "School",
      list: [
        ["Udemy", "https://www.udemy.com/"],
        ["mySNHU", "https://mysnhu.force.com/mysnhu/s/"],
        ["DAT-375", "https://learn.snhu.edu/d2l/home/1071736"],
        ["IT-226", "https://learn.snhu.edu/d2l/home/1067966"],
      ],
    },
    {
      title: "Money",
      list: [
        ["Santander", "https://www.santander.com/en/home"],
        ["Capital One", "https://www.capitalone.com/"],
        ["Chase", "https://www.chase.com/"],
      ],
    },
    {
      title: "Bills",
      list: [
        [
          "Faxon Commons",
          "https://faxoncommonsapts.securecafe.com/residentservices/faxon-commons/userlogin.aspx",
        ],
        [
          "National Grid",
          "https://www.nationalgridus.com/MA-Home/default?regionkey=masselec&customertype=home",
        ],
        ["Progressive", "https://www.progressive.com/"],
      ],
    },
    {
      title: "Tools",
      list: [
        ["Google Docs", "https://docs.google.com/"],
        ["Clip Path", "https://bennettfeely.com/clippy"],
        ["GIF Maker", "https://ezgif.com/maker"],
        ["Diagram Maker", "https://app.diagrams.net/"],
      ],
    },
    {
      title: "Social",
      list: [
        ["Banned Social", "https://banned-social2.vercel.app/"],
        ["Instagram", "https://instagram.com/"],
        ["Facebook", "https://facebook.com/"],
      ],
    },
    {
      title: "Job Search",
      list: [
        ["HandShake", "https://joinhandshake.com/"],
        ["LinkedIn", "https://www.linkedin.com/"],
        ["Upwork", "https://www.upwork.com/"],
      ],
    },
    {
      title: "Video",
      list: [
        ["Banned Video", "https://banned.video"],
        ["Bitchute", "https://www.bitchute.com/"],
        ["youtube", "https://youtube.com"],
      ],
    },
    {
      title: "News",
      list: [
        ["4chan", "https://boards.4chan.org/pol/"],
        ["Inforwars", "https://infowars.com/"],
        ["Washington Examiner", "https://washingtonexaminer.com/"],
        ["Yahoo", "https://yahoo.com/"],
      ],
    },
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Matts homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx>{`
        .link {
          text-decoration: none;
          color: black;
          cursor: pointer;
        }
        .link:hover {
          text-decoration: underline;
        }
        .items-start {
          line-height: 1.6;
        }
      `}</style>
      <div className="container max-w-3xl mx-auto">
        <div className="w-full flex justify-center pt-8">
          <form onSubmit={handleSubmit}>
            <input
              className="px-4 py-1 rounded-full w-72 shadow-lg max-w-[80vw]"
              ref={searchRef}
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-2 py-8">
          {items.map((item, i) => (
            <>
              <div key={i}>
                <div className="flex flex-col h-full bg-white/70 p-3 rounded-md shadow-lg">
                  <div className="text-center mb-2 text-lg font-bold">
                    {item.title}
                  </div>
                  <div className="flex flex-col items-start text-sm truncate">
                    {item.list.map((link, j) => (
                      <>
                        <Link href={`${link[1]}`}>
                          <div className="link truncate">
                            <span>
                              <img
                                className="mt-1 mr-1 float-left"
                                src={`http://www.google.com/s2/favicons?domain=${link[1]}`}
                                alt="favicon"
                              />
                            </span>
                            <span>{link[0]}</span>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
