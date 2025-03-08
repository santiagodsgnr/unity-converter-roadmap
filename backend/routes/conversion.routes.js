import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createConversion } from "../controllers/conversion.controller.js";
import { conversionSchema } from "../schemas/conversion.schema.js";

const router = Router()

router.post('/conversions', validateSchema(conversionSchema), createConversion)

export default router