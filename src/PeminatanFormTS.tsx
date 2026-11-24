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
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const labelClass =
    "block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5";

  const errorClass = "text-red-500 text-xs mt-1 font-medium";

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-3xl shadow-xl ring-1 ring-slate-200">
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 mb-6">
        Form Peminatan Santri
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label className={labelClass}>Nama Santri</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            className={inputClass}
            {...register("nama")}
          />
          {errors.nama && (
            <p className={errorClass}>{errors.nama.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>NIS</label>
          <input
            type="number"
            placeholder="Minimal 100"
            className={inputClass}
            {...register("nis", { valueAsNumber: true })}
          />
          {errors.nis && (
            <p className={errorClass}>{errors.nis.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Umur</label>
          <input
            type="number"
            placeholder="15 - 20 tahun"
            className={inputClass}
            {...register("umur", { valueAsNumber: true })}
          />
          {errors.umur && (
            <p className={errorClass}>{errors.umur.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Pilihan Divisi
          </label>
          <select className={`${inputClass} cursor-pointer`} {...register("divisi")}>
            <option value="">-- Pilih Divisi --</option>
            {DIVISI_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.divisi && (
            <p className={errorClass}>{errors.divisi.message}</p>
          )}
        </div>

        <div>
          <span className={labelClass}>
            Keahlian yang Dikuasai
          </span>
          <div className="flex flex-wrap gap-2">
            {KEAHLIAN_OPTIONS.map((k) => (
              <label
                key={k}
                className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 cursor-pointer transition hover:bg-indigo-50 hover:border-indigo-300"
              >
                <input
                  type="checkbox"
                  value={k}
                  className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                  {...register("keahlian")}
                />
                {k}
              </label>
            ))}
          </div>
          {errors.keahlian && (
            <p className={errorClass}>{errors.keahlian.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-3 text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
              {...register("setuju")}
            />
            Saya menyetujui tata tertib
          </label>
          {errors.setuju && (
            <p className={errorClass}>{errors.setuju.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        >
          Kirim Pendaftaran
        </button>
      </form>

      {dataSantri && (
        <div className="mt-8 border-l-4 border-emerald-500 bg-emerald-50 rounded-2xl p-5 shadow-md">
          <h2 className="font-bold text-lg text-emerald-700 mb-3">
            Pendaftaran Berhasil
          </h2>
          <dl className="text-sm text-slate-700 space-y-1.5">
            <div className="flex">
              <dt className="w-28 font-semibold text-slate-500">Nama</dt>
              <dd>: {dataSantri.nama}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 font-semibold text-slate-500">NIS</dt>
              <dd>: {dataSantri.nis}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 font-semibold text-slate-500">Umur</dt>
              <dd>: {dataSantri.umur} tahun</dd>
            </div>
            <div className="flex">
              <dt className="w-28 font-semibold text-slate-500">Divisi</dt>
              <dd>: {dataSantri.divisi}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 font-semibold text-slate-500">Keahlian</dt>
              <dd>: {dataSantri.keahlian.join(", ")}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => {
              setDataSantri(null);
              reset();
            }}
            className="mt-4 text-xs font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
          >
            Isi form baru
          </button>
        </div>
      )}
    </div>
  );
}