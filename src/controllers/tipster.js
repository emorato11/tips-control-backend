export class TipsterController {
  constructor({ tipsterModel }) {
    this.tipsterModel = tipsterModel
  }

  getAll = async (req, res) => {
    const userId = req.header('user_id')
    const tipsters = await this.tipsterModel.getAll({ userId })

    res.json(tipsters)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const userId = req.header('user_id')

    const tipster = await this.tipsterModel.getById({ id, userId })
    if (tipster) {
      if (tipster.name === 'CastError') return res.status(400).send({ error: 'id provided is malformed' })
      return res.json(tipster)
    }

    res.status(404).json({ message: 'Tipster not found' })
  }

  create = async (req, res) => {
    const userId = req.header('user_id')
    const newTipster = await this.tipsterModel.create({ input: { ...req.body, userId } })

    res.status(201).json(newTipster) // actualizar la caché del cliente
  }

  update = async (req, res) => {
    const { id } = req.params
    const updatedTipster = await this.tipsterModel.update({ id, input: req.body })

    return res.json(updatedTipster)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.tipsterModel.delete({ id })

    if (!result) return res.status(404).json({ message: 'Tipster not found' })

    return res.json({ message: 'Tipster deleted!' })
  }
}
