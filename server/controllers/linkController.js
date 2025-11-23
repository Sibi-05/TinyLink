import { LinkModel } from "../models/Link.js";

// Validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const LinkController = {
  async create(req, res) {
    const { url, code } = req.body;

    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const shortCode = code || Math.random().toString(36).substring(2, 10);

    const existing = await LinkModel.findByCode(shortCode);
    if (existing) {
      return res.status(409).json({ error: "Code already exists" });
    }

    const newLink = await LinkModel.create({
      code: shortCode,
      url,
    });

    return res.json(newLink.rows[0]);
  },

  async getAll(_req, res) {
    const links = await LinkModel.findAll();
    return res.json(links);
  },


  async getOne(req, res) {
    const { code } = req.params;
    const link = await LinkModel.findByCode(code);

    if (!link) {
      return res.status(404).json({ error: "Code not found" });
    }

    return res.json(link);
  },

  async delete(req, res) {
    const { code } = req.params;

    const existing = await LinkModel.findByCode(code);
    if (!existing) {
      return res.status(404).json({ error: "Code not found" });
    }

    await LinkModel.delete(code);

    return res.json({ success: true });
  },


  async redirect(req, res) {
    const { code } = req.params;

    const link = await LinkModel.findByCode(code);
    if (!link) {
      return res.status(404).send("Not found");
    }

    await LinkModel.incrementClicks(code);

    return res.redirect(302, link.url);
  },
};
