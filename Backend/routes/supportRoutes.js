import express from "express";
import Support from "../models/supportModel.js";
import { protectStudent } from "../middleware/auth.js";

const router = express.Router();

/**
 * 🔹 Add Reply (Admin or Student)
 */

router.post("/:id/reply", async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ message: "Sender and message are required" });
    }

    const ticket = await Support.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies.push({ sender, message, createdAt: new Date() });
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/support/:ticketId/reply/:replyId
router.put("/:ticketId/reply/:replyId", async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    const ticket = await Support.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const reply = ticket.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    reply.message = message; // ✅ update the message
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE Reply
router.delete("/:ticketId/reply/:replyId", async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;

    const ticket = await Support.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // remove reply
    ticket.replies = ticket.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );

    await ticket.save();
    res.json({ message: "Reply deleted", ticket });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 Create a new support ticket
 */
// Support Routes
router.post("/", protectStudent, async (req, res) => {
  const { subject, message } = req.body;
  const ticket = await Support.create({
    studentId: req.student.id,  // ✅ from token
    subject,
    message
  });
  res.json(ticket);
});


/**
 * 🔹 Get all tickets (with student name & email)
 */
router.get("/", async (req, res) => {
  try {
    const tickets = await Support.find().populate("studentId", "name email");
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Error fetching tickets", error });
  }
});

/**
 * 🔹 Get my tickets (for logged-in student)
 */
// Get all tickets of logged-in student
router.get('/my-tickets', protectStudent, async (req, res) => {
  try {
    const tickets = await Support.find({ studentId: req.student.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});


/**
 * 🔹 Update ticket status (admin only)
 */
router.put("/:id", async (req, res) => {
  try {
    const ticket = await Support.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating status", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Support.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ message: "Error deleting ticket", error: err.message });
  }
});

// Student updates their own ticket
router.put("/update/:id", protectStudent, async (req, res) => {
  try {
    const { subject, message } = req.body;

    const ticket = await Support.findOne({ _id: req.params.id, studentId: req.student.id });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found or not authorized" });
    }

    if (subject) ticket.subject = subject;
    if (message) ticket.message = message;

    await ticket.save();

    res.json({ message: "Ticket updated successfully", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
