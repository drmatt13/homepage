// mongoose
import connectDB from "../../utils/connectDB";
import Note from "../../models/Note";

export default connectDB(async (req, res) => {
  try {
    let notes = await Note.find();
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});
