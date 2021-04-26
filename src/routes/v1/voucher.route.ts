import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import { VoucherInterface } from "../../interfaces/interfaces";
import { checkAdmin } from "../../middlewares/authorizer";
import VoucherService from "../../services/voucher.service";
import { buildResponse, getFilter } from "../../utils/helpers";
import { voucherSchema, voucherIdSchema } from "../../utils/validation-schema";

export const voucherRoutes = Router();

voucherRoutes.post(
  "/",
  celebrate({ body: voucherSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const voucher = await new VoucherService().createVoucher(body);

    let data;
    if ((voucher as any).message) {
      data = buildResponse(500, false, null, (voucher as any).message);
    } else {
      data = buildResponse(200, true, {
        message: "Voucher created successfully.",
      });
    }
    return response.status(data.status).json(data).end();
  }
);

voucherRoutes.put(
  "/:voucherId",
  celebrate({ body: voucherSchema, params: voucherIdSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    let data;
    const { body } = request;
    const { voucherId } = request.params;
    const voucherData = {
      ...body,
      id: voucherId,
    } as VoucherInterface;

    try {
      const voucher = await new VoucherService().updateVoucher(voucherData);
      data = buildResponse(200, true, voucher);
    } catch (error) {
      data = buildResponse(500, false, null, `${error.message}`);
    }
    return response.status(data.status).json(data).end();
  }
);

voucherRoutes.get("/", async (request: Request, response: Response) => {
  const filter = getFilter(request);
  const authors = await new VoucherService().getVouchers(filter);
  return response.status(200).json(authors).end();
});

voucherRoutes.get(
  "/:voucherId",
  celebrate({ params: voucherIdSchema }),
  async (request: Request, response: Response) => {
    const { voucherId } = request.params;
    const voucher = await new VoucherService().getVoucher(voucherId);
    let data = buildResponse(200, true, voucher);
    return response.status(200).json(data).end();
  }
);
