import { Request } from "express";
import { FilterParams } from "../interfaces/interfaces";

export function buildResponse(
  status: number,
  success: boolean,
  data: any,
  error?: string
) {
  return {
    success,
    data,
    error,
    status,
  };
}

export function getFilter(request: Request) {
  const { limit, page } = request.query;

  let pageNo = Number(page);
  if (pageNo < 1 || isNaN(pageNo)) {
    pageNo = 1;
  }

  let limitNo = Number(limit) || 10;
  if (limitNo < 1) {
    limitNo = 10;
  }

  return {
    limit: limitNo,
    page: pageNo,
  } as FilterParams;
}
