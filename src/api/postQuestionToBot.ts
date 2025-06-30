import { AxiosResponse } from "axios";
import axiosInstance from "./instance";
import { BotResponse } from "@/types/api/types";

export const postQuestionToBot = async (
  text: string,
): Promise<AxiosResponse<BotResponse>> => {
  try {
    const response = await axiosInstance.post(`/api/chat`, {
      message: text,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
