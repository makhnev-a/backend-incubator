import {CustomRequest} from "../types/request.type";

export const getErrors = (req: CustomRequest) => req.err ? req.err : []