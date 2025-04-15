import { countTipsByStatus, accumulateYield } from "../utils/tips.js";

export class YieldController {
  constructor({ paymentModel, tipModel, tipsterModel }) {
    this.paymentModel = paymentModel;
    this.tipModel = tipModel;
    this.tipsterModel = tipsterModel;
  }

  getAll = async ({ userId }, res) => {
    try {
      const tipsters = await this.tipsterModel.getAll({ userId });

      const yieldResume = await Promise.all(
        tipsters.map(async (tipster) => {
          const tips = await this.tipModel.getAllByTipsterId({
            tipsterId: tipster.id,
            userId,
          });

          const payments = await this.paymentModel.getById({
            id: tipster.id,
            userId,
          });

          const tipsYield = accumulateYield(tips);
          const paymentsYield = payments.reduce((acc, payment) => {
            return acc + payment.spent;
          }, 0);

          return {
            tipsterId: tipster.id,
            tipsterName: tipster.name,
            yield: tipsYield - paymentsYield,
          };
        })
      );

      return res.json(yieldResume);
    } catch (error) {
      return res.status(500).json({ message: "Failed to get yield resume" });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const payments = await this.paymentModel.getById({ id, userId });
      const tips = await this.tipModel.getAllByTipsterId({
        tipsterId: id,
        userId,
      });
      const tipster = await this.tipsterModel.getById({ id, userId });

      const mappedPayments = payments.map((payment) => ({
        date: payment.date,
        spent: payment.spent,
        name: payment.name,
        typeId: payment.typeId,
        typeName: payment.typeName,
      }));

      const tipsYield = accumulateYield(tips);

      const objToReturn = {
        tipsterId: tipster._id,
        tipsterName: tipster.name,
        tipsYield,
        payments: mappedPayments,
        countTipsByStatus: countTipsByStatus(tips),
      };

      return res.json(objToReturn);
    } catch (error) {
      res
        .status(404)
        .json({ message: `Fail on catching yield for tipster ${tipsterName}` });
    }
  };
}
