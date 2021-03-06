// mongoose
import connectDB from "../../utils/connectDB";
import Note from "../../models/Note";

export default connectDB(async (req, res) => {
  const { text, color } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.body._id },
      { text, color },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true, note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});
