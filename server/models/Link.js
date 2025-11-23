import { pool } from "../middleware/db.js";

export const LinkModel = {
  // Create a new short link
  async create({ code, url }) {
    return pool.query(
      "INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *",
      [code, url]
    );
  },

  // Find link by code
  async findByCode(code) {
    const result = await pool.query(
      "SELECT * FROM links WHERE code=$1",
      [code]
    );
    return result.rows[0];
  },

  // Get all links
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM links ORDER BY created_at DESC"
    );
    return result.rows;
  },

  // Delete link
  async delete(code) {
    return pool.query("DELETE FROM links WHERE code=$1", [code]);
  },

  // Increment click count
  async incrementClicks(code) {
    return pool.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() AT TIME ZONE 'Asia/Kolkata' WHERE code=$1",
      [code]
    );
  },
};
