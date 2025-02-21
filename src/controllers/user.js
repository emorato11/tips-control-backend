import jwt from "jsonwebtoken";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { id, email, name, picture } = req.body;
    // Buscar usuario en la base de datos
    let user = await this.userModel.getById({ id });

    if (!user) {
      // Crear usuario si no existe
      user = await this.userModel.create({
        input: { id, email, name, picture },
      });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, "jwt", {
      expiresIn: "7d",
    });

    res.json({ token, user });
  };

  recoverUserData = async (req, res) => {
    const { userId } = req;
    const user = await this.userModel.getById({ id: userId });

    res.json({ user });
  };
}
