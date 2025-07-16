const watchList = require("../models/watchListModel");

exports.addToWatchList = async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "User ID and Product Id are required" });
  }
  try {
    let listItem = await watchList.findOne({ userId: userId });
    if (!listItem) {
      listItem = new watchList({
        userId,
        watchListItems: [
          {
            productId: productId,
            watchList: true,
          },
        ],
      });
    } else {
      const existingItem = listItem.watchListItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return res.status(400).json({ message: "Item already in watchList" });
      }
      listItem.watchListItems.push({ productId, watchList: true });
    }
    await listItem.save();
    return res.status(200).json({
      success: true,
      message: "Item added to watchList successfully",
      watchList: listItem,
    });
  } catch (error) {
    console.error("Error adding to watchList:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server",
    });
  }
};

  exports.getwatchList = async (req, res) => {
     const {userId} = req.params;
     if (!userId ) {
         return res.status(400).json({message : "User ID is  required"});
     }
          try {
            const  watchListItems = await watchList.findOne({userId}).populate("watchListItems.productId");
                if (!watchListItems  || watchListItems.watchListItems.length === 0) {
                     return res.status(404).json({ message : "No watchList items found for this user."});
                }
                 return res.status(200).json({
                    success : true,
                    watchListItems : watchListItems.watchListItems,
                    message : "watchList items  successfully fetched"
                 });
          }
          catch (error) {
            console.error ("Error fetching watchLis items : ", error);
             return res.status(500).json({
                success : false,
                message : "Internal server error"
             });

          }
     };

      exports.removeWatchList = async(req, res) => {
        const {userId, productId} = req.body;
        if (!userId || !productId) {
             return res.status(400).json({message : "User ID and product ID are  required"});
        }
        try {
            const removeList = await watchList.findOne({userId}).populate("watchListItems.productId");
            if (!removeList) {
                return res.status(404).json({message : "WatchList not found for this user."});
            }
            removeList.watchListItems  = removeList.watchListItems.filter(item => item.productId._id.toString()!== productId);
            await removeList.save();
            return res.status(200).json({
                success : true,
                message : "WatchList item removed successfully"
            });

        }
        catch(error) {
            console.error("Error removing watchList item:", error);
            return res.sttus(500).json({
                success : false,
                message : "Internal server error while removing watchList item "
            })
        }
      }

  
