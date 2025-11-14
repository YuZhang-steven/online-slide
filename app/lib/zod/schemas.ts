
import z from "zod";

export const createPresentationSchema = z.object({
    tittle: z.string().min(1, "Tittle is required"),
})