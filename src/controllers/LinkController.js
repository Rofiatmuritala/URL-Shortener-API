import Link from "../models/LinkModel.js";
import Links from "../models/LinkModel.js";
import { generateShortCode } from "../utils/generateShortCode.js";

export const getAllLinks = async (req, res, next) => {
  try {
    const links = await Links.find();
    res.json({ msg: "This is getting the project", links: links });
  } catch (error) {
    next(error);
  }
};

export const createShortenedUrl = async (req, res, next) => {
  try {
    req.body.shortCode = generateShortCode();
    const Link = await Links.create(req.body);
    res.json({ msg: "This is getting the project", Link: Link });
  } catch (error) {
    next(error);
  }
};

export const visitLink = async (req, res, next) => {
  try {
    const link = await Links.findOne({ shortCode: req.params.shortCode });

    // Updating the clicks of the link by adding 1
    await Link.findByIdAndUpdate(link._id, { clicks: link.clicks + 1 });

    res.status(308).redirect(link.actualLink);
  } catch (error) {
    next(error);
  }
};
