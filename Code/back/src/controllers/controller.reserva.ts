import { Request, Response } from "express";
import { ReservaModel } from "../models/model.reserva";

export const getReservas = async (req: Request, res: Response) => {
  try {
    const data = await ReservaModel.find({}, { password: 0 });
    res.json(data);
  } catch (error) {
    res.json({ msg: "reser-get" });
  }
};
export const createReserva = async (req: Request, res: Response) => {
  try {
    new ReservaModel(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const editarReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const edit = await ReservaModel.updateOne({ _id: id }, data, { runValidators: true });
    res.json(edit);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
};
