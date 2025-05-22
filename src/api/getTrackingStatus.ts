import axios from "axios";

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
