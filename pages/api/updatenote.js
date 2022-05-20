// mongoose
import connectDB from "../../utils/connectDB";
import Note from "../../models/Note";

export default connectDB(async (req, res) => {
  const { text } = req.body;
  try {
    // update note
    const note = await Note.findOneAndUpdate({}, { text }, { new: true });
    // console.log(note);
    return res.status(200).json({ success: true, note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});
