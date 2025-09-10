import express from "express";
import Support from "../models/supportModel.js";
import { protectStudent } from "../middleware/auth.js";
import { sendMail } from "../utils/mailer.js"; 

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

    const ticket = await Support.findById(req.params.id).populate("studentId", "name email");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Add reply
    ticket.replies.push({ sender, message, createdAt: new Date() });
    await ticket.save();

    // ✅ Send Email if Admin replied
if (sender === "Admin" && ticket.studentId?.email) {
  const subject = `Reply to your support ticket: ${ticket.subject}`;
  const html = `
    <p>Hi ${ticket.studentId.name},</p>
    <p>The admin has replied to your support ticket:</p>
    <blockquote>${message}</blockquote>
    <p><strong>Ticket Subject:</strong> ${ticket.subject}</p>
    <p>Please <a href="https://flowlms.netlify.app/student/login" 
      style="color: #2563eb; text-decoration: none; font-weight: bold;">login to your account</a> 
      to continue the conversation.</p>
    <br>
    <small>This is an automated email, please do not reply directly.</small>
  `;

  await sendMail(ticket.studentId.email, subject, html);
}


    res.json(ticket);
  } catch (err) {
    console.error("Error in /reply:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 Edit Reply
 */
router.put("/:ticketId/reply/:replyId", async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    const ticket = await Support.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const reply = ticket.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    reply.message = message;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    console.error("Error editing reply:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 Delete Reply
 */
router.delete("/:ticketId/reply/:replyId", async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;

    const ticket = await Support.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies = ticket.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );

    await ticket.save();
    res.json({ message: "Reply deleted", ticket });
  } catch (err) {
    console.error("Error deleting reply:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 Create a new support ticket
 */
router.post("/", protectStudent, async (req, res) => {
  try {
    const { subject, message } = req.body;
    const ticket = await Support.create({
      studentId: req.student.id,
      subject,
      message,
    });
    res.json(ticket);
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * 🔹 Get all tickets (Admin)
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
 * 🔹 Get logged-in student's tickets
 */
router.get("/my-tickets", protectStudent, async (req, res) => {
  try {
    const tickets = await Support.find({ studentId: req.student.id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching my tickets:", err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
});

/**
 * 🔹 Update ticket status (Admin only)
 */
router.put("/:id", async (req, res) => {
  try {
    const ticket = await Support.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("studentId", "name email");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // ✅ Optional: Notify student when status changes
    if (ticket.studentId?.email) {
      const subject = `Your support ticket is now ${ticket.status}`;
      const html = `
        <p>Hi ${ticket.studentId.name},</p>
        <p>The status of your support ticket <strong>${ticket.subject}</strong> has been updated to <b>${ticket.status}</b>.</p>
        <p>Please login to your account for more details.</p>
      `;
      await sendMail(ticket.studentId.email, subject, html);
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating status", error });
  }
});

/**
 * 🔹 Delete Ticket (Admin)
 */
router.delete("/:id", async (req, res) => {
  try {
    await Support.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ message: "Error deleting ticket", error: err.message });
  }
});

/**
 * 🔹 Student updates their own ticket
 */
router.put("/update/:id", protectStudent, async (req, res) => {
  try {
    const { subject, message } = req.body;

    const ticket = await Support.findOne({
      _id: req.params.id,
      studentId: req.student.id,
    });

    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket not found or not authorized" });
    }

    if (subject) ticket.subject = subject;
    if (message) ticket.message = message;

    await ticket.save();

    res.json({ message: "Ticket updated successfully", ticket });
  } catch (err) {
    console.error("Error updating student ticket:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
