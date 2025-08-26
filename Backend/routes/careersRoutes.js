import express from 'express';
import { Career } from '../models/careersModel.js';

const router = express.Router();

// ✅ GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Career.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});
// ✅ POST new job
router.post('/', async (req, res) => {
  try {
    const {
      company,
      role,
      skills,
      salary,
      lastDate,
      education,
      experience,  // ✅ Added
      workType,
      location,
      applyUrl
    } = req.body;

    if (!company || !role || !applyUrl || !lastDate || !education || !experience || !workType || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newJob = new Career({
      company,
      role,
      skills,
      salary,
      lastDate,
      education,
      experience,  // ✅ Added
      workType,
      location,
      applyUrl
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// ✅ UPDATE job by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      company,
      role,
      skills,
      salary,
      lastDate,
      education,
      experience,  // ✅ Added
      workType,
      location,
      applyUrl
    } = req.body;

    const updatedJob = await Career.findByIdAndUpdate(
      req.params.id,
      {
        company,
        role,
        skills,
        salary,
        lastDate,
        education,
        experience,  // ✅ Added
        workType,
        location,
        applyUrl
      },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// ✅ DELETE job by ID
router.delete('/:id', async (req, res) => {
  try {
    const job = await Career.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
