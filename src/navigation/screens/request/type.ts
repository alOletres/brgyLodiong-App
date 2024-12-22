export type RequestMode = "WALKIN" | "ONLINE";

export type RequestType = "CLEARANCE" | "CERTIFICATE" | "PERMIT";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";

export type CreateRequestDto = {
  residentId: number;
  requestType: RequestType;
  status?: RequestStatus;
  purpose: string;
  requestMode?: RequestMode;
};

export type FindAllRequestsDto = {
  id: number;
  residentId: number;
  requestType: RequestType;
  status: RequestStatus;
  purpose: string;
  dateRequested: string;
  dateCompleted?: string;
  requestMode: RequestMode;
  contact: string;
  email: string;
  address: string;
  requestedBy: string;
};
