//create badege
const Badge = require('../models//badge');
const asyncHandler = require('../middlewares/asyncHandler');


exports.createBadge = asyncHandler(async (req, res) => {
  const { label} = req.body;

  if (!label || label.trim().length==0) {
    return res.status(400).json({ success: false, message: "Please provide a valid label"});
        }
  const badge = await Badge.create({label:label.toUpperCase()});
  res.status(201).json({ success: true, data: badge });}
)

exports.getAllBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: badges });
  });