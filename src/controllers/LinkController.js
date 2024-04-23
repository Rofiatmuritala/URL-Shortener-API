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

    let shortCode = generateShortCode();
    const linkExists = Links.findOne({ shortCode: shortCode });

    if (linkExists) {
      shortCode = generateShortCode();
    }

    req.body.shortCode = shortCode;
    req.body.user = user._id;

    const link = await Links.create(req.body);
    res.json({ msg: "This is getting the project", link: link });
  } catch (error) {
    next(error);
  }
};

export const visitLink = async (req, res, next) => {
  try {
    console.log(req.headers.referer);

    console.log(req.get("Referer"));
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

export const getSingleLink = async (req, res, next) => {
  try {
    const user = req.user;

    const link = await Links.findOne({ shortCode: req.params.shortCode })
      .populate("user")
      .populate("clicks");

    // Checking if link exists
    if (!link) {
      const error = new Error("Short Link not found");
      error.statusCode = 404;
      return next(error);
    }

    // Checking if the user is the owner of the link
    // If the user who created the link is not the same as the user who is logged in, throw an error

    if (link.user._id.toString() !== user._id.toString()) {
      const error = new Error("Access denied, you have no access to this link");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ clicks: link.clicks.length, link });
  } catch (error) {
    next(error);
  }
};

export const deleteLink = async (req, res, next) => {
  try {
    const user = req.user;

    const link = await Links.findOne({ shortCode: req.params.shortCode });

    // Checking if link exists
    if (!link) {
      const error = new Error("Short Link not found");
      error.statusCode = 404;
      return next(error);
    }

    // Checking if the user is the owner of the link
    // If the user who created the link is not the same as the user who is logged in, throw an error

    if (link.user.toString() !== user._id.toString()) {
      const error = new Error("Access denied, you have no access to this link");
      error.statusCode = 404;
      return next(error);
    }

    await Links.findByIdAndDelete(link._id);

    // Delete all clicks relating to the link
    await Click.deleteMany({ link: link._id });

    res.status(200).json({ link: null });
  } catch (error) {
    next(error);
  }
};
