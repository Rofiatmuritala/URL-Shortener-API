import Click from "../models/ClickModel.js";
import Links from "../models/LinkModel.js";
import { generateShortCode } from "../utils/generateShortCode.js";
import DeviceDetector from "device-detector-js";

export const getAllLinks = async (req, res, next) => {
  try {
    const user = req.user;

    const links = await Links.find({ user: user._id })
      .populate("clicks")
      .populate("user");

    res.json({
      count: links.length,
      links: links,
    });
  } catch (error) {
    next(error);
  }
};

export const createShortenedUrl = async (req, res, next) => {
  try {
    const user = req.user;

    req.body.shortCode = generateShortCode();
    req.body.user = user._id;

    const Link = await Links.create(req.body);
    res.json({ msg: "This is getting the project", Link: Link });
  } catch (error) {
    next(error);
  }
};

export const visitLink = async (req, res, next) => {
  try {
    const link = await Links.findOne({ shortCode: req.params.shortCode });

    // // Updating the clicks of the link by adding 1
    // await Link.findByIdAndUpdate(link._id, { clicks: link.clicks + 1 });

    // Adding a new click
    const deviceDetector = new DeviceDetector();
    const userAgent = req.headers["user-agent"];
    const userDeviceInfo = deviceDetector.parse(userAgent);

    const newClick = {
      ...userDeviceInfo,
      link: link._id,
    };

    await Click.create(newClick);

    res.status(308).redirect(link.actualLink);
  } catch (error) {
    next(error);
  }
};
