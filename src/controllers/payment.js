export class PaymentController {
  constructor({ paymentModel }) {
    this.paymentModel = paymentModel;
  }

  getAll = async ({ userId }, res) => {
    const payments = await this.paymentModel.getAll({ userId });

    res.json(payments);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const payment = await this.paymentModel.getById({ id, userId });
    if (payment) {
      if (payment.name === "CastError")
        return res.status(400).send({ error: "id provided is malformed" });
      return res.json(payment);
    }

    res.status(404).json({ message: "Payment not found" });
  };

  create = async (req, res) => {
    const userId = req.userId;

    const newPayment = await this.paymentModel.create({
      input: { ...req.body, userId, date: new Date() },
    });

    res.status(201).json(newPayment); // actualizar la caché del cliente
  };

  update = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const updatedPayment = await this.paymentModel.update({
      id,
      input: { ...req.body, userId },
    });

    return res.json(updatedPayment);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.paymentModel.delete({ id });

    if (!result) return res.status(404).json({ message: "Payment not found" });

    return res.json({ message: "Payment deleted!" });
  };
}
