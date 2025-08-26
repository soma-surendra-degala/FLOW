const express = require("express");
const Practice = require("../models/Practice");

// ✅ GET all practices with optional category filtering
router.get("/", async (req, res) => {
  try {
    const { categories } = req.query;
    let filter = {};

    if (categories) {
      const categoryArray = categories.split(",");
      filter.categories = { $in: categoryArray };
    }

    const practices = await Practice.find(filter);
    res.json(practices);
  } catch (error) {
    console.error("Error fetching practices:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET single practice by ID
router.get("/:id", async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id);
    if (!practice) return res.status(404).json({ message: "Not found" });
    res.json(practice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new practice
router.post("/", async (req, res) => {
  try {
    const { title, description, difficulty, categories, solution } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const newPractice = new Practice({
      title,
      description,
      difficulty: difficulty || "Easy",
      categories: categories || [],
      solution: solution || ""
    });

    await newPractice.save();
    res.status(201).json({ message: "Practice added successfully", practice: newPractice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding practice." });
  }
});

// ✅ UPDATE an existing practice
router.put("/:id", async (req, res) => {
  try {
    const updated = await Practice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE a practice
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Practice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Practice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ SUBMIT solution
router.post("/:id/submit", async (req, res) => {
  try {
    const { userId, solutionText } = req.body;
    const practiceId = req.params.id;

    if (!userId || !solutionText) {
      return res.status(400).json({ message: "Missing userId or solutionText" });
    }

    const practice = await Practice.findById(practiceId);
    if (!practice) {
      return res.status(404).json({ message: "Practice not found" });
    }

    // ✅ Push into userSolutions (NOT solutions)
    practice.userSolutions.push({
      userId,
      solutionText,
      submittedAt: new Date()
    });

    await practice.save();

    res.json({ message: "Solution submitted successfully", practice });
  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
