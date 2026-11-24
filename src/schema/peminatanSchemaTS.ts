import { z } from "zod";

export const DIVISI_OPTIONS = ["Frontend", "Backend", "UIUX"];
export const KEAHLIAN_OPTIONS = ["HTML", "CSS", "JavaScript", "React"];

export const peminatanSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama minimal 3 karakter"),

  nis: z
    .number()
    .min(100, "NIS tidak Valid"),

  umur: z
    .number()
    .min(15, "Umur minimal 15 tahun")
    .max(20, "Umur maksimal 20 tahun"),

  divisi: z.enum(DIVISI_OPTIONS, {
    errorMap: () => ({ message: "Pilih salah satu divisi" }),
  }),

  keahlian: z
    .array(z.string())
    .min(1, "Centang minimal 1 keahlian"),

  setuju: z
    .boolean()
    .refine((val) => val === true, {
      message: "Anda harus menyetujui tata tertib",
    }),
});