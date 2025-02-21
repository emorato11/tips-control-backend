export class TipController {
  constructor({ tipModel }) {
    this.tipModel = tipModel;
  }

  getAll = async ({ userId }, res) => {
    const tips = await this.tipModel.getAll({ userId });

    res.json(tips);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const tip = await this.tipModel.getById({ id, userId });
    if (tip) {
      if (tip.name === "CastError")
        return res.status(400).send({ error: "id provided is malformed" });
      return res.json(tip);
    }

    res.status(404).json({ message: "Tip not found" });
  };

  create = async (req, res) => {
    // const result = validateTip(req.body)

    // if (result.error) {
    //   return res.status(400).json({ error: JSON.parse(result.error.message) })
    // }
    const userId = req.userId;

    const newTip = await this.tipModel.create({
      input: { ...req.body, userId },
    });

    res.status(201).json(newTip); // actualizar la caché del cliente
  };

  update = async (req, res) => {
    // const result = validatePartialTip(req.body)

    // if (result.error) {
    //   return res.status(400).json({ error: JSON.parse(result.error.message) })
    // }

    const { id } = req.params;
    const userId = req.userId;
    const updatedTip = await this.tipModel.update({
      id,
      input: { ...req.body, userId },
    });

    return res.json(updatedTip);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.tipModel.delete({ id });

    if (!result) return res.status(404).json({ message: "Tip not found" });

    return res.json({ message: "Tip deleted!" });
  };
}
