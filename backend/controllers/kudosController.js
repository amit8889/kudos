const Kudos = require("../models/Kudos");
const KudosLikes = require("../models/KudosLikes");
const asyncHandler = require("../middlewares/asyncHandler");
const mongoose = require("mongoose");
exports.addKudos = asyncHandler(async (req, res) => {
  const { receiver, badge, reason } = req.body;
  //check all files required all will mogodb _id except reason
  if (!receiver || !badge || !reason) {
    return res.status(400).json({ success:false,message: "Please fill all fields" });
  }
  const sender = req.user._id?.toString();

  //check sende and reciver shoud be same

  if (sender === receiver?.toString()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Sender and receiver should be different",
      });
  }

  const kudos = await Kudos.create({ sender, receiver, badge, reason });
  res
    .status(201)
    .json({ success: true, message: "Kudos sent successfully", data: kudos });
});

exports.getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Kudos.aggregate([
    { $group: { _id: "$receiver", kudosCount: { $sum: 1 } } },
    { $sort: { kudosCount: -1 } },
  ]);
  console.log("=========23432=========")
  console.log(JSON.stringify([
    { $group: { _id: "$receiver", kudosCount: { $sum: 1 } } },
    { $sort: { kudosCount: -1 } },
  ]))
  res.status(200).json({
    message: "Analytics retrieved successfully",
    data: analytics,
    success: true,
  });
});

//getAllKudos
exports.getAllKudos = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderDetails",
      },
    },
    { $unwind: "$senderDetails" },
    {
      $lookup: {
        from: "users",
        localField: "receiver",
        foreignField: "_id",
        as: "receiverDetails",
      },
    },
    { $unwind: "$receiverDetails" },
    {
      $lookup: {
        from: "badges",
        localField: "badge",
        foreignField: "_id",
        as: "badgeDetails",
      },
    },
    { $unwind: "$badgeDetails" },
    {
      $lookup: {
        from: "kudoslikes",
        let: { kudosId: "$_id", userId },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$kudosId", "$$kudosId"] },
                  { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                ],
              },
            },
          },
        ],
        as: "likedDetails",
      },
    },
    { $addFields: { liked: { $gt: [{ $size: "$likedDetails" }, 0] } } },
    { $sort: { _id: -1 } },
    {
      $project: {
        senderDetails: { name: 1 },
        receiverDetails: { name: 1 },
        badgeDetails: { label: 1 },
        liked: 1,
        reason:1
      },
    },
  ];
  console.log("=====================================")
  console.log(JSON.stringify(pipeline));
  const kudos = await Kudos.aggregate(pipeline);
  res
    .status(200)
    .json({
      success: true,
      message: "Kudos retrieved successfully",
      data: kudos,
    });
});

//kudos like count
//we are just inc or dec a key dont want user data who liked i need ony count
exports.kudosLikeAddOrRemove = asyncHandler(async (req, res) => {
  const { kudosId, isLiked } = req.body;

  // Input Validation
  if (!kudosId || isLiked === undefined) {
    return res
      .status(400)
      .json({ message: "Please fill all fields (kudosId, isLiked)" });
  }

  if (isLiked) {
    console.log({
      kudosId: new mongoose.Types.ObjectId(kudosId),
      userId: new mongoose.Types.ObjectId(req.user._id),
    },
    {
      upsert: true,
    })
    // Update Kudos document
    await KudosLikes.updateOne(
      {
        kudosId: new mongoose.Types.ObjectId(kudosId),
        userId: new mongoose.Types.ObjectId(req.user._id),
      },
      {
        $setOnInsert: { createdAt: new Date() }, // Set fields only on insert
      },
      {
        upsert: true, // Create if not found
      }
    );    
  } else {
    // Update Kudos document
    await KudosLikes.findOneAndDelete({
      kudosId: new mongoose.Types.ObjectId(kudosId),
      userId: new mongoose.Types.ObjectId(req.user._id),
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Kudos liked updated successfully" });
});
