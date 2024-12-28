const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const Kudos = require('../models/Kudos');
const kudoslikes = require('../models/KudosLikes')
const mongoose= require('mongoose')

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Validate name and email
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  // Create the user
  const user = await User.create({ name, email });

  // Return success response with created user data
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const { search } = req.query;

  // Search is required
  if (!search) {
    return res.status(400).json({ success: false, message: 'email or name is required' });
  }

  // Build a dynamic search query
  const searchQuery = {
    $or: [{ name: search.trim() }, { email: search.trim() }]
  };

  const users = await User.findOne(searchQuery);
  if(!users){
    return res.status(404).json({ success: false, message: 'User not found'})
  }

  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

// Get all users excepting current user
exports.getAllUsers = asyncHandler(async (req, res) => {
  const currentUser  = req.user._id;

  // Find all users except the current one
  const users = await User.find({
    _id: { $ne: currentUser }
  });

  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

exports.getDashBoardDetails = asyncHandler(async (req, res) => {
  const pipeline = [
    {
      $facet: {
        kudosLeaderboard: [
          { $group: { _id: "$receiver", kudosCount: { $sum: 1 } } },
          { $sort: { kudosCount: -1 } },
          { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
          { $project: {
              userId: "$_id",
              kudosCount: 1,
              _id: 0,
              userName: { $arrayElemAt: ["$userDetails.name", 0] }
            }
          }
        ],
        kudosAllocationCount: [
          { $group: { _id: "$badge", totalKudosCount: { $sum: 1 } } },
          { $lookup: { from: "badges", localField: "_id", foreignField: "_id", as: "badgeDetails" } },
          { $project: {
              _id: 0,
              totalKudosCount: 1,
              label: { $arrayElemAt: ["$badgeDetails.label", 0] }
            }
          }
        ]
      }
    }
  ]

  const result = await Kudos.aggregate(pipeline);
  const mostLikedKudosPipeline = [
    {
      $group: {
        _id: "$kudosId",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: "kudos",
        localField: "_id",
        foreignField: "_id",
        as: "result"
      }
    },
    { $unwind: "$result" },
    {
      $lookup: {
        from: "badges",
        localField: "result.badge",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0, label: 1 } }],
        as: "badgeDetails"
      }
    },
    {
      $project: {
        kudosId: "$_id",
        reason: "$result.reason",
        sender: "$result.sender",
        receiver: "$result.receiver",
        label: { $arrayElemAt: ["$badgeDetails.label", 0] }
      }
    }
  ];
  
  // Aggregate pipeline to fetch the most liked Kudos
  const mostLikedKudos = await kudoslikes.aggregate(mostLikedKudosPipeline).exec();
   console.log(mostLikedKudos)
  // Use populate() to fetch sender and receiver details
  const populatedKudos = await Kudos.populate(mostLikedKudos, [
    { path: "sender", select: "name" },
    { path: "receiver", select: "name" }
  ]);
  res.status(200).json({
    message: "Dashboard details fetched successfully",
    data: {
      ...result[0],
      mostLikedKudos: populatedKudos[0]
    },
    success: true
  });
});
