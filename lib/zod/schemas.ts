
import z from "zod";

export const CreatePresentationSchema = z.object({
    title: z.string().min(1, "Tittle is required"),
})

export const PresentationSchema = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const PresentationsSchema = z.array(PresentationSchema);
export type Presentation = z.infer<typeof PresentationSchema>;

export const uploadToR2Schema = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    data: z.string().min(1) // base64 string
})
