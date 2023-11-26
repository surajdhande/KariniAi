const express = require("express");
const router = express.Router();
const ShopifyModel = require("../model/index");

router.get("/getData", async (req, res) => {
  try {
    const { fetchSize, pageNo, search } = req.query;

    const size = parseInt(fetchSize, 10) || 10;
    const page = parseInt(pageNo, 10) || 1;
    const skip = (page - 1) * size;

    let query = {}; 

    if (search) {
      query = {
        $or: [
          { Title: { $regex: new RegExp(search, "i") } }, 
          { "Variant SKU": { $regex: new RegExp(search, "i") } }, 
        ],
      };
    }

    const data = await ShopifyModel.find(query).skip(skip).limit(size);
    const totalRecords = await ShopifyModel.countDocuments(query);

    res.json({ data, totalRecords });
  } catch (e) {
    console.log("error is", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/updateCart", async (req, res) => {
  try {
    const { id, cartStatus } = req.query;

    const updateCart = await ShopifyModel.findByIdAndUpdate(id, {
      isAddedToCart: cartStatus,
    });

    console.log("Cart updated:", id, cartStatus, updateCart);

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
