import { useEffect, useState, useRef, useCallback } from "react";
import { RgbaColorPicker } from "react-colorful";
import axios from "axios";

const Note = ({ note, notes, setNotes }) => {
  const [saving, setSaving] = useState(false);
  const [prevtext, setPrevtext] = useState(note.text);
  const [color, setColor] = useState(JSON.parse(note.color));
  const [prevcolor, setPrevcolor] = useState(color);
  const blurRef = useRef(true);
  const [palette, setPalette] = useState(false);
  const noteRef = useRef();

  const updateNote = useCallback(async () => {
    if (prevtext === noteRef.current.innerHTML.trim() && prevcolor === color)
      return;
    setSaving(true);
    const text = noteRef.current.innerHTML.trim();
    await axios.post("/api/updatenote", {
      _id: note._id,
      color: JSON.stringify(color),
      text,
    });
    setSaving(false);
    setPrevtext(text);
    setPrevcolor(color);
  }, [color, note, prevcolor, prevtext]);

  const deleteNote = useCallback(async () => {
    await axios.post("/api/deletenote", {
      _id: note._id,
    });
    setNotes(notes.filter((n) => n._id !== note._id));
  }, [notes, note]);

  const disableBlur = () => {
    blurRef.current = false;
  };

  const onBlur = async (e) => {
    if (blurRef.current) updateNote();
    disableBlur();
  };

  const exitPalette = () => {
    setPalette(false);
    updateNote();
  };

  useEffect(() => {
    noteRef.current.innerHTML = note.text;
  }, []);

  return (
    <>
      <div
        className="relative group animate-fade-in"
        onBlur={onBlur}
        onFocus={() => (blurRef.current = true)}
      >
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
          />
          {saving && (
            <div
              className={`border border-black absolute bottom-1 right-1 text-sm px-1 py-0.5 rounded flex pointer-events-none bg-black/20`}
            >
              saving
            </div>
          )}
        </div>
        {/* ************************ */}
        <div className="absolute w-full h-2 -top-2 left-0 group">
          <div
            className={`absolute flex flex-row-reverse top-0 -right-1 w-full h-6 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100`}
          >
            <div
              onMouseDown={disableBlur}
              onMouseUp={deleteNote}
              className="ml-1 h-5 w-5 rounded-full bg-white/90 flex justify-center items-center cursor-pointer hover:bg-red-400/90 transition-color ease-out duration-200 group-hover:pointer-events-auto"
            >
              <i className="fa-solid fa-x text-[.5rem] h-full w-full flex justify-center items-center" />
            </div>
            <div
              onMouseDown={disableBlur}
              onMouseUp={() => setPalette(true)}
              className="h-5 w-5 rounded-full bg-white/90 flex justify-center items-center cursor-pointer hover:bg-sky-400/90 transition-color ease-out duration-200 group-hover:pointer-events-auto"
            >
              <i className="fa-solid fa-brush text-[.5rem] h-full w-full flex justify-center items-center" />
            </div>
          </div>
        </div>

        {/* ************* */}
      </div>
      {palette && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black/20 z-10">
          <div
            className="absolute top-0 left-0 h-full w-full"
            onClick={exitPalette}
          />
          <div onMouseDown={() => (blurRef.current = true)}>
            <RgbaColorPicker color={color} onChange={setColor} />
          </div>
        </div>
      )}
    </>
  );
};

export default Note;
