# Form Peminatan Santri

Form pendaftaran peminatan divisi untuk santri, dibuat dengan **React Hook Form** dan **Zod** untuk validasi input secara real-time. Tersedia dalam dua versi: JavaScript dan TypeScript.

🔗 **Repository:** [ ]

## Fitur

- Validasi real-time (`mode: "onChange"`) menggunakan `zodResolver`.
- Pesan error berwarna merah muncul di bawah kolom yang salah diisi.
- Tombol **Kirim Pendaftaran** otomatis nonaktif selama ada kolom yang belum valid.
- Setelah submit, data ditampilkan di `console.log` dan dirender sebagai kartu ringkasan pendaftaran di bawah form.

## Aturan Validasi

| Field | Aturan |
| --- | --- |
| Nama Santri | String, minimal 3 karakter |
| NIS | Angka, minimal 100 |
| Umur | Angka, 15 sampai 20 tahun |
| Pilihan Divisi | Wajib pilih: `Frontend`, `Backend`, atau `UIUX` |
| Keahlian | Checkbox ganda, minimal 1 (`HTML`, `CSS`, `JavaScript`, `React`) |
| Persetujuan Tata Tertib | Checkbox, wajib dicentang |

## Struktur File

| File | Keterangan |
| --- | --- |
| `peminatanSchema.js` | Skema Zod versi JavaScript (memakai `z.coerce.number()`) |
| `PeminatanFormJS.jsx` | Komponen form versi JavaScript |
| `peminatanSchemaTS.ts` | Skema Zod versi TypeScript (`z.number()` murni) + tipe `SantriFormData` dari `z.infer` |
| `PeminatanFormTS.tsx` | Komponen form versi TypeScript (generic type + `valueAsNumber: true`) |

## Perbedaan Versi JS dan TS

- **JS:** `nis` dan `umur` memakai `z.coerce.number()` sehingga nilai input otomatis diubah menjadi angka oleh Zod.
- **TS:** `nis` dan `umur` memakai `z.number()` murni, dan konversi dilakukan di input lewat `register("nis", { valueAsNumber: true })`. Tipe data diambil otomatis dari skema, tanpa interface manual.

## Instalasi

```bash
npm install react-hook-form @hookform/resolvers zod
```

Pastikan Tailwind CSS sudah terpasang, karena tampilan memakai class Tailwind.

> Kode ditulis dengan sintaks Zod v3. Jika memakai Zod v4, opsi pesan error khusus (`invalid_type_error`, `errorMap`) perlu disesuaikan.

## Cara Pakai

Import salah satu komponen ke `App`:

```jsx
import PeminatanFormJS from "./PeminatanFormJS";
// atau
import PeminatanFormTS from "./PeminatanFormTS";

export default function App() {
  return <PeminatanFormTS />;
}
```

Jalankan aplikasi, isi form, lalu buka console browser untuk melihat data yang dikirim.