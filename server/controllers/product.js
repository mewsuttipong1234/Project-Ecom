const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APT_KEY,
  api_secret: process.env.CLOUDINARY_APT_SECRET,
});

exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const product = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
    console.log(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
    console.log(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.update = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    //clear images
    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    //step 1 search , incluse img
    const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: { images: true },
    });
    if (!product) {
      return res.status(400).json({ messsage: "product not found!" });
    }
    // console.log(product);
    //step 2 promise deleteimg in cloud awite
    const deleteImage = product.images.map(
      (image) =>
        new Promise((resolve, reject) => {
          //cloud
          cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        })
    );
    await Promise.all(deleteImage);

    //delete
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("delete success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.listby = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    console.log(sort, order, limit);
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};

const handleQurry = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Search Error" });
  }
};
const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Filterprice Error" });
  }
};

const handleCategory = async (req, res, catagoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: catagoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Filterprice Error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    if (query) {
      console.log("query-->", query);
      await handleQurry(req, res, query);
    }
    if (category) {
      console.log("category-->", category);
      handleCategory(req, res, category);
    }
    if (price) {
      console.log("price-->", price);
      await handlePrice(req, res, price);
    }
    // res.send('hello searchFilter product')
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};

exports.creatImages = async (req, res) => {
  try {
    // console.log(req.body)
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `mew-${Date.now()}`,
      resource_type: "auto",
      folder: "Ecom2025",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
exports.removeImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    console.log(public_id);
    cloudinary.uploader.destroy(public_id, (result) => {
      res.json({ messsage: "Remove Image Success" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messsage: "Server Error" });
  }
};
