import { z } from "zod";

export const DIVISI_OPTIONS = ["Frontend", "Backend", "UIUX"] as const;
export const KEAHLIAN_OPTIONS = ["HTML", "CSS", "JavaScript", "React"] as const;

export const peminatanSchema = z.object({
  // Nama Santri: string, minimal 3 karakter
  nama: z.string().min(3, "Nama minimal 3 karakter"),

  // NIS: number murni (diubah ke angka lewat valueAsNumber di register)
  nis: z
    .number({ error: "NIS harus berupa angka" })
    .min(100, "NIS tidak valid"),

  // Umur: number murni, 15 - 20 tahun
  umur: z
    .number({ error: "Umur harus berupa angka" })
    .min(15, "Umur minimal 15 tahun")
    .max(20, "Umur maksimal 20 tahun"),

  // Pilihan Divisi: dropdown, wajib salah satu dari tiga opsi
  divisi: z.enum(DIVISI_OPTIONS, { error: "Pilih salah satu divisi" }),

  // Keahlian: checkbox ganda (array string), minimal 1
  keahlian: z.array(z.string()).min(1, "Centang minimal 1 keahlian"),

  // Persetujuan: checkbox tunggal, wajib dicentang
  setuju: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui tata tertib",
  }),
});

// Tipe diambil otomatis dari skema Zod (tanpa interface manual)
export type SantriFormData = z.infer<typeof peminatanSchema>;