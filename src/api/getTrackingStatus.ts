import axios, { AxiosResponse } from "axios";
import axiosInstance from "./instance";
import { BotResponse } from "@/types/api/types";

export const getTrackingCustomerClearance = async (cargoNumber: string) => {
  try {
    const response = await axios.get(
      `${process.env.CUSTOMS_CLEARANCE_TRACKING_API_URL}`,
      {
        params: { cargMtNo: cargoNumber },
      },
    );

    return response.data;
  } catch (error) {
    console.error("배송 조회 요청 실패:", error);
    throw error;
  }
};

export const postQuestionToBot = async (
  text: string,
): Promise<AxiosResponse<BotResponse>> => {
  try {
    const response = await axiosInstance.post(`/api/chat`, {
      message: text,
    });

    return response;
  } catch (error) {
    console.error("api 요청 실패:", error);
    throw error;
  }
};
