export class GroupController {
  constructor({ groupModel }) {
    this.groupModel = groupModel;
  }

  getAll = async ({ userId }, res) => {
    const groups = await this.groupModel.getAll({ userId });

    res.json(groups);
  };

  getAllByTipsterId = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const group = await this.groupModel.getAllByTipsterId({ id, userId });
    if (group) {
      if (group.name === "CastError")
        return res.status(400).send({ error: "id provided is malformed" });
      return res.json(group);
    }

    res.status(404).json({ message: "Group not found" });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const group = await this.groupModel.getById({ id, userId });
    if (group) {
      if (group.name === "CastError")
        return res.status(400).send({ error: "id provided is malformed" });
      return res.json(group);
    }

    res.status(404).json({ message: "Group not found" });
  };

  create = async (req, res) => {
    const userId = req.userId;

    const newGroup = await this.groupModel.create({
      input: { ...req.body, userId },
    });

    res.status(201).json(newGroup); // actualizar la caché del cliente
  };

  update = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const updatedGroup = await this.groupModel.update({
      id,
      input: { ...req.body, userId },
    });

    return res.json(updatedGroup);
  };
}
