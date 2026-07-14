// src/models/user.model.js

import { prisma } from "../config/client.js";

export class UserModel {
  async findAll() {
    return prisma.user.findMany({
      include: { posts: true },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async create(data) {
    return prisma.user.create({ data });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.user.delete({ where: { id } });
  }
}
