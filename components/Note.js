import { useEffect, useState, useRef } from "react";
import { RgbaColorPicker } from "react-colorful";
import axios from "axios";

const Note = ({ note, notes, setNotes }) => {
  const [saving, setSaving] = useState(false);
  const [color, setColor] = useState(JSON.parse(note.color));
  const [palette, setPalette] = useState(false);
  const noteRef = useRef();
  const keyupTimeoutRef = useRef();

  const updateText = async () => {
    setSaving(true);
    const text = noteRef.current.innerHTML.trim();
    const res = await axios.post("/api/updatenote", {
      _id: note._id,
      text,
    });
    setSaving(false);
  };

  const deleteNote = async () => {
    const res = await axios.post("/api/deletenote", {
      _id: note._id,
    });
    setNotes(notes.filter((n) => n._id !== note._id));
  };

  const updateColor = async () => {
    setSaving(true);
    const res = await axios.post("/api/updatenote", {
      _id: note._id,
      color: JSON.stringify(color),
    });
    setSaving(false);
  };

  const handleColorChange = () => {
    clearTimeout(keyupTimeoutRef.current);
    keyupTimeoutRef.current = setTimeout(() => {
      updateColor();
    }, 1250);
  };

  const handleKeyUp = () => {
    clearTimeout(keyupTimeoutRef.current);
    keyupTimeoutRef.current = setTimeout(() => {
      updateText();
    }, 1250);
  };

  useEffect(() => {
    noteRef.current.innerHTML = note.text;
  }, []);

  useEffect(() => {
    if (!palette) return;
    handleColorChange();
  }, [color, palette]);

  return (
    <>
      <div className="relative group animate-fade-in">
        <div
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a}`,
          }}
          className="relative flex h-[9.25rem] max-h-[9.25rem] rounded-md shadow-lg overflow-hidden"
        >
          {/* ************************************* */}
          <div
            className={`p-3 w-full h-full overflow-auto whitespace-pre text-sm focus:outline-none`}
            ref={noteRef}
            contentEditable={true}
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
        <div
          className={`absolute flex flex-row-reverse top-0 right-0 w-full h-6 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto`}
        >
          <div
            onClick={deleteNote}
            className="ml-1 h-5 w-5 rounded-full bg-white/90 flex justify-center items-center cursor-pointer hover:bg-red-400/90 transition-color ease-out duration-200"
          >
            <i className="fa-solid fa-x text-[.5rem] h-full w-full flex justify-center items-center" />
          </div>
          <div
            onClick={() => setPalette(true)}
            className="h-5 w-5 rounded-full bg-white/90 flex justify-center items-center cursor-pointer hover:bg-sky-400/90 transition-color ease-out duration-200"
          >
            <i className="fa-solid fa-brush text-[.5rem] h-full w-full flex justify-center items-center" />
          </div>
        </div>
      </div>
      {palette && (
        <dialog className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-black/20 z-10">
          <div
            className="absolute top-0 left-0 h-full w-full"
            onClick={() => setPalette(false)}
          />
          <RgbaColorPicker color={color} onChange={setColor} />
        </dialog>
      )}
    </>
  );
};

export default Note;
