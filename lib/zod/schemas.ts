
import z from "zod";
import { id } from "zod/locales";

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

export const ContentTypeEnum = z.enum(["TEXT", "IMAGE", "VIDEO"]);

export const ContentSchema = z.object({
    id: z.string(),
    type: ContentTypeEnum,
    x: z.number().int(),
    y: z.number().int(),
    width: z.number().int(),
    height: z.number().int(),
    rotation: z.number().default(0),
    text: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
})
export const UpdatePageSchema = z.object({
    order: z.number().int(),
    contents: z.array(ContentSchema),
    deletedContentIds: z.array(z.string()).optional(),
})
export type UpdatePageInput = z.infer<typeof UpdatePageSchema>;
