import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import items from "../data.js";
import axios from "axios";
import Note from "../components/Note";

export default function Home() {
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const [loading, setLoading] = useState(true);
  const [creatingNote, setCreatingNote] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `https://www.google.com/search?q=${search}`;
  };

  const getNotes = async () => {
    const res = await axios.get("/api/getnotes");
    setNotes(res.data.notes);
    setLoading(false);
  };

  const createNote = async () => {
    setCreatingNote(true);
    const res = await axios.get("/api/createnote");
    setNotes([...notes, res.data.note]);
    setCreatingNote(false);
  };

  useEffect(() => {
    searchRef.current.focus();
    getNotes();
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
                      <a href={`${link[1]}`}>
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
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {!loading && (
            <>
              {notes &&
                notes.map((note) => (
                  <Note
                    note={note}
                    notes={notes}
                    setNotes={setNotes}
                    key={note._id}
                  />
                ))}
              {!creatingNote && (
                <div className="w-full h-[9.25rem] max-h-[9.25rem] flex justify-center items-center animate-fade-in">
                  <div
                    onClick={createNote}
                    className="h-10 w-10 rounded-full bg-white/70 flex justify-center items-center cursor-pointer hover:scale-105 hover:bg-white/75 transition-all"
                  >
                    <i className="fa-solid fa-plus text-sm h-full w-full flex justify-center items-center" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
