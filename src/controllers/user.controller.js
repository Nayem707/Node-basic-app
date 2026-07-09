import { UserModel } from "../models/user.model.js";

const userModel = new UserModel();

export const userController = {
  async getAll(req, res) {
    try {
      const users = await userModel.findAll();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userModel.findById(Number(req.params.id));
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { email, name } = req.body;
      const user = await userModel.create({ email, name });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { name } = req.body;
      const user = await userModel.update(Number(req.params.id), { name });
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await userModel.delete(Number(req.params.id));
      res.json({ success: true, message: "User deleted" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
