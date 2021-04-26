import { getRepository } from "typeorm";
import { FilterParams, VoucherInterface } from "../interfaces/interfaces";
import { Voucher } from "../models/Voucher.entity";

export default class VoucherService {
  private voucherRepo = getRepository(Voucher);

  async createVoucher(voucherData: VoucherInterface) {
    try {
      let voucher = this.voucherRepo.create(voucherData);
      voucher = await this.voucherRepo.save(voucher);

      return voucher;
    } catch (error) {
      console.log(error);
      return {
        message:
          error.code === "23505"
            ? "Voucher with provided code already exist"
            : "Error while creating voucher",
      };
    }
  }

  async updateVoucher(voucherData: VoucherInterface) {
    try {
      let voucher = await this.getVoucher(voucherData.id as string);
      this.voucherRepo.merge(voucher, voucherData);
      await this.voucherRepo.update(
        { id: voucherData.id },
        { ...voucher, book: voucherData.bookId as any }
      );

      return voucher;
    } catch (error) {
      console.log(error);
      throw new Error("Error while updating voucher.");
    }
  }

  async getVouchers(filter: FilterParams) {
    const [vouchers, total] = await this.voucherRepo.findAndCount({
      where: {},
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    return {
      vouchers,
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
      },
    };
  }

  async getVoucher(id: string) {
    const voucher = await this.voucherRepo.findOne({ id });
    if (!voucher) {
      throw new Error("Voucher with given id does nnot exist.");
    }

    return voucher;
  }
}
