import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import items from "../data.js";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const searchRef = useRef();
  const noteRef = useRef();
  const keyupTimeoutRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `https://www.google.com/search?q=${search}`;
  };

  const updateNote = async () => {
    setSaving(true);
    // add linebreaks to note
    const text = noteRef.current.innerText.replace(/\n/g, "<br>");
    const res = await axios.post("/api/updatenote", {
      text,
    });
    setSaving(false);
  };

  const handleKeyUp = () => {
    // updateNote();
    clearTimeout(keyupTimeoutRef.current);
    keyupTimeoutRef.current = setTimeout(() => {
      updateNote();
    }, 2000);
  };

  const loadNote = async () => {
    const res = await axios.get("/api/getnote");
    noteRef.current.innerHTML = res.data.note.text;
    // console.log(noteRef.current);
    setLoading(false);
  };

  useEffect(() => {
    searchRef.current.focus();
    loadNote();
  }, []);

  return (
    <div>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Matts homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <div key={i}>
              <div className="flex flex-col h-full bg-white/70 p-3 rounded-md shadow-lg">
                <div className="text-center mb-2 text-lg font-bold">
                  {item.title}
                </div>
                <div className="flex flex-col items-start leading-[1.6] text text-sm truncate">
                  {item.list.map((link, j) => (
                    <div key={j}>
                      <Link href={`${link[1]}`}>
                        <div className="hover:cursor-pointer hover:underline truncate">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="relative flex h-[9.25rem] max-h-[9.25rem] bg-yellow-200/80 rounded-md shadow-lg overflow-hidden">
            {loading && (
              <>
                <div className="text-sm absolute top-0 left-0 h-full w-full flex justify-center items-center pointer-events-none">
                  loading
                </div>
              </>
            )}
            <div
              className={`${
                loading ? "hidden" : ""
              }  p-3 w-full h-full overflow-auto whitespace-nowrap text-sm focus:outline-none`}
              ref={noteRef}
              contentEditable={loading ? false : true}
              onKeyUp={handleKeyUp}
            />

            {saving && (
              <div
                className={`border border-black absolute bottom-1 right-1 text-sm px-1 py-0.5 rounded flex pointer-events-none bg-black/20`}
              >
                saving
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
