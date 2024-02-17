import prisma from "../constants/config.js";
import bcrypt from "bcrypt";

const user_update_meta = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    await prisma.user.update({
      where: {
        id: req.session.userId,
      },
      data: {
        firstName: firstName ? firstName : undefined,
        lastName: lastName ? lastName : undefined,
      },
    });
    res.status(200).send("Updated");
  } catch (e) {
    res.status(500).send("Error updating user metadata");
  }
};

const user_update_password = async (req, res) => {
  const { password, oldPassword } = req.body;
  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }

  if (user) {
    const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (isPassCorrect) {
      const saltRounds = 10;
      let newPassword = await bcrypt.hash(password, saltRounds);
      try {
        await prisma.user.update({
          where: {
            id: req.session.userId,
          },
          data: {
            password: newPassword,
          },
        });
        res.status(200).send("Password updated successfully");
      } catch {
        res.status(500).send("Cannot update password");
      }
    } else {
      res.status(403).send("Incorrect password");
    }
  }
};

const user_delete = async (req, res) => {
  const userId = req.session.userId;
  try {
    await req.session.destroy();
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
};

export { user_update_meta, user_update_password, user_delete };
