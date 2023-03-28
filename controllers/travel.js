const Travel = require("../Model/travel");

const getAllTravels = async (req, res, next) => {
  try {
    const travel = await Travel.find({}).populate("category");
    if (!travel) {
      res.status(200).json({ message: "medeelel bn", travel });
    }
    res.status(200).json({ message: "Travelin medeelel bn", travel });
  } catch (err) {
    next(err);
  }
};

const getTravel = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      message: `${id} travel medeelel oldsongui`,
      err: err.message,
    });
  }
  try {
    const travel = await Travel.findById(id);
    if (!travel) {
      res.status(400).json({ message: "travel", travel });
    }
    res.status(200).json({ message: "travel medeelel oldtson", travel });
  } catch (err) {
    next(err);
  }
};

const createTravel = async (req, res, next) => {
  const { title, images, detail, location, price, day, category } = req.body;
  try {
    if (!title || !images || !price) {
      res.status(400).json({ message: "bhgu" });
    }

    const travel = await Travel.create({
      title,
      images,
      detail,
      location,
      price,
      day,
      category,
    });
    res.status(201).json({ message: "SUCCESS", travel });
  } catch (err) {
    next(err);
  }
};

const deleteTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} travel medeelel bhgu`,
      err: err.message,
    });
  }
  try {
    const travel = await Travel.findByIdAndDelete(id);
    res.status(200).json({ message: " travel Medeelel delete", travel });
  } catch (err) {
    next(err);
  }
};
const updateTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} travel  medeelel updated`,
      err: err.message,
    });
  }
  try {
    const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "updated", travel });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTravel,
  getAllTravels,
  getTravel,
  deleteTravel,
  updateTravel,
};
