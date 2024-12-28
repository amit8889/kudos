import React from "react";

const KudosCard = ({ item, handleLikeToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <p className="text-lg font-medium">
          {item.senderDetails?.name} gave{" "}
          <span className="font-bold">{item.badgeDetails?.lable}</span> Badge to{" "}
          {item.receiverDetails?.name}
        </p>
        <p className="text-gray-600">{item.reason}</p>
      </div>
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 transition cursor-pointer"
        onClick={() => {
          handleLikeToggle(item?._id, !item.liked);
        }}
      >
        <span className="text-lg">{item.liked ? <span>❤️</span> : "🩶"}</span>
      </div>
    </div>
  );
};

export default React.memo(KudosCard);
