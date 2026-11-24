import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  peminatanSchema,
  DIVISI_OPTIONS,
  KEAHLIAN_OPTIONS,
  type SantriFormData,
} from "./schema/peminatanSchemaTS";

export default function PeminatanFormTS() {
  const [dataSantri, setDataSantri] = useState<SantriFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SantriFormData>({
    resolver: zodResolver(peminatanSchema),
    mode: "onChange", 
    defaultValues: {
      nama: "",
      divisi: "" as SantriFormData["divisi"],
      keahlian: [],
      setuju: false,
    },
  });

  const onSubmit = (data: SantriFormData) => {
    console.log(data);
    setDataSantri(data);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Form Peminatan Santri</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium mb-1">Nama Santri</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            className={inputClass}
            {...register("nama")}
          />
          {errors.nama && (
            <p className="text-red-500 text-xs">{errors.nama.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">NIS</label>
          <input
            type="number"
            placeholder="Minimal 100"
            className={inputClass}
            {...register("nis", { valueAsNumber: true })}
          />
          {errors.nis && (
            <p className="text-red-500 text-xs">{errors.nis.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Umur</label>
          <input
            type="number"
            placeholder="15 - 20 tahun"
            className={inputClass}
            {...register("umur", { valueAsNumber: true })}
          />
          {errors.umur && (
            <p className="text-red-500 text-xs">{errors.umur.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Pilihan Divisi
          </label>
          <select className={inputClass} {...register("divisi")}>
            <option value="">-- Pilih Divisi --</option>
            {DIVISI_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.divisi && (
            <p className="text-red-500 text-xs">{errors.divisi.message}</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium mb-1">
            Keahlian yang Dikuasai
          </span>
          <div className="flex flex-wrap gap-4">
            {KEAHLIAN_OPTIONS.map((k) => (
              <label key={k} className="flex items-center gap-2 text-sm">
                <input type="checkbox" value={k} {...register("keahlian")} />
                {k}
              </label>
            ))}
          </div>
          {errors.keahlian && (
            <p className="text-red-500 text-xs">{errors.keahlian.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("setuju")} />
            Saya menyetujui tata tertib
          </label>
          {errors.setuju && (
            <p className="text-red-500 text-xs">{errors.setuju.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Kirim Pendaftaran
        </button>
      </form>

      {dataSantri && (
        <div className="mt-6 border border-emerald-300 bg-emerald-50 rounded-xl p-4">
          <h2 className="font-bold text-emerald-700 mb-2">
            Pendaftaran Berhasil
          </h2>
          <dl className="text-sm space-y-1">
            <div className="flex">
              <dt className="w-32 font-medium">Nama</dt>
              <dd>: {dataSantri.nama}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">NIS</dt>
              <dd>: {dataSantri.nis}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">Umur</dt>
              <dd>: {dataSantri.umur} tahun</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">Divisi</dt>
              <dd>: {dataSantri.divisi}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">Keahlian</dt>
              <dd>: {dataSantri.keahlian.join(", ")}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => {
              setDataSantri(null);
              reset();
            }}
            className="mt-3 text-xs text-emerald-700 underline"
          >
            Isi form baru
          </button>
        </div>
      )}
    </div>
  );
}