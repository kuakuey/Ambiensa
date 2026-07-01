"use client";

import React from "react";
import type { UsuarioFormData } from "@/lib/types";
import { ESTADOS_CIVILES, SEXOS } from "@/lib/types";

type FormErrors = Partial<Record<keyof UsuarioFormData, string>>;

type UsuarioFormProps = {
  initialData?: UsuarioFormData;
  onSubmit: (data: UsuarioFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
};

export function validateUsuarioForm(data: UsuarioFormData): FormErrors {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.identificacion.trim()) {
    errors.identificacion = "La identificación es obligatoria.";
  }

  if (!data.nombre_usuario.trim()) {
    errors.nombre_usuario = "El nombre de usuario es obligatorio.";
  }

  if (!data.apellidos.trim()) {
    errors.apellidos = "Los apellidos son obligatorios.";
  }

  if (!data.nombres.trim()) {
    errors.nombres = "Los nombres son obligatorios.";
  }

  if (!data.fecha_nacimiento) {
    errors.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
  } else if (new Date(data.fecha_nacimiento) >= new Date()) {
    errors.fecha_nacimiento = "La fecha debe ser anterior a hoy.";
  }

  if (!data.correo_personal.trim()) {
    errors.correo_personal = "El correo es obligatorio.";
  } else if (!emailRegex.test(data.correo_personal)) {
    errors.correo_personal = "Ingresa un correo válido.";
  }

  if (!data.estado_civil) {
    errors.estado_civil = "Selecciona el estado civil.";
  }

  if (!data.sexo) {
    errors.sexo = "Selecciona el sexo.";
  }

  if (!data.direccion.trim()) {
    errors.direccion = "La dirección es obligatoria.";
  }

  return errors;
}

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-1 block text-sm font-medium text-zinc-700";

export default function UsuarioForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}: UsuarioFormProps) {
  const [form, setForm] = React.useState<UsuarioFormData>(
    initialData ?? {
      identificacion: "",
      nombre_usuario: "",
      apellidos: "",
      nombres: "",
      fecha_nacimiento: "",
      celular: "",
      telefono: "",
      correo_personal: "",
      estado_civil: "",
      sexo: "",
      direccion: "",
    },
  );
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  React.useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setErrors({});
      setServerError("");
    }
  }, [initialData]);

  const updateField = (field: keyof UsuarioFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateUsuarioForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      await onSubmit({
        ...form,
        celular: form.celular?.trim() || null,
        telefono: form.telefono?.trim() || null,
      });
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "No se pudo guardar el registro.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Identificación"
          name="identificacion"
          value={form.identificacion}
          error={errors.identificacion}
          onChange={updateField}
          required
        />
        <Field
          label="Nombre de usuario"
          name="nombre_usuario"
          value={form.nombre_usuario}
          error={errors.nombre_usuario}
          onChange={updateField}
          required
        />
        <Field
          label="Apellidos"
          name="apellidos"
          value={form.apellidos}
          error={errors.apellidos}
          onChange={updateField}
          required
        />
        <Field
          label="Nombres"
          name="nombres"
          value={form.nombres}
          error={errors.nombres}
          onChange={updateField}
          required
        />
        <Field
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={form.fecha_nacimiento}
          error={errors.fecha_nacimiento}
          onChange={updateField}
          required
        />
        <Field
          label="Celular"
          name="celular"
          value={form.celular ?? ""}
          error={errors.celular}
          onChange={updateField}
        />
        <Field
          label="Teléfono"
          name="telefono"
          value={form.telefono ?? ""}
          error={errors.telefono}
          onChange={updateField}
        />
        <Field
          label="Correo personal"
          name="correo_personal"
          type="email"
          value={form.correo_personal}
          error={errors.correo_personal}
          onChange={updateField}
          required
        />
        <div>
          <label htmlFor="estado_civil" className={labelClass}>
            Estado civil
          </label>
          <select
            id="estado_civil"
            value={form.estado_civil}
            onChange={(e) => updateField("estado_civil", e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Seleccionar...</option>
            {ESTADOS_CIVILES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.estado_civil && (
            <p className="mt-1 text-xs text-red-600">{errors.estado_civil}</p>
          )}
        </div>
        <div>
          <label htmlFor="sexo" className={labelClass}>
            Sexo
          </label>
          <select
            id="sexo"
            value={form.sexo}
            onChange={(e) => updateField("sexo", e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Seleccionar...</option>
            {SEXOS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.sexo && (
            <p className="mt-1 text-xs text-red-600">{errors.sexo}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="direccion" className={labelClass}>
          Dirección o ubicación
        </label>
        <textarea
          id="direccion"
          rows={3}
          value={form.direccion}
          onChange={(e) => updateField("direccion", e.target.value)}
          className={inputClass}
          required
        />
        {errors.direccion && (
          <p className="mt-1 text-xs text-red-600">{errors.direccion}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Guardando..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof UsuarioFormData;
  value: string;
  error?: string;
  onChange: (field: keyof UsuarioFormData, value: string) => void;
  type?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClass}
        required={required}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}