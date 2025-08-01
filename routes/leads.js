const express = require('express');
const pool = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const [result] = await pool.query(
      `INSERT INTO leads 
      (submissionDate, responsibleName, companyName, email, phone, businessCategory, otherCategory, businessAge, salesRating, hasDefinedProcesses, hasClearRoles, hasIndicators, hasActiveMarketing, hasInnovated, stableCashFlow, hasRecentCrisis, hasRecurringProblems, hasStrategicMeetings, goals, consultancyInterest, stage, score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.submissionDate,
        data.responsibleName,
        data.companyName,
        data.email,
        data.phone,
        data.businessCategory,
        data.otherCategory,
        data.businessAge,
        data.salesRating,
        data.hasDefinedProcesses,
        data.hasClearRoles,
        data.hasIndicators,
        data.hasActiveMarketing,
        data.hasInnovated,
        data.stableCashFlow,
        data.hasRecentCrisis,
        data.hasRecurringProblems,
        data.hasStrategicMeetings,
        JSON.stringify(data.goals),
        data.consultancyInterest,
        data.stage,
        data.score
      ]
    );
    res.status(201).json({ message: 'Lead creado', id: result.insertId });
  } catch (error) {
    console.error('Error al insertar lead:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY createdAt DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener leads:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;