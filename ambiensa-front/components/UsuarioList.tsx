"use client";

import type { Usuario } from "@/lib/types";

type UsuarioListProps = {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
};

export default function UsuarioList({
  usuarios,
  onEdit,
  onDelete,
  deletingId,
}: UsuarioListProps) {
  if (usuarios.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-500">
        No hay usuarios registrados. Crea el primero con el formulario.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Identificación
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Usuario
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Nombre completo
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Correo
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Celular
            </th>
            <th className="px-4 py-3 text-left font-semibold text-zinc-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-zinc-50/80">
              <td className="px-4 py-3 text-zinc-900">{usuario.identificacion}</td>
              <td className="px-4 py-3 text-zinc-700">{usuario.nombre_usuario}</td>
              <td className="px-4 py-3 text-zinc-700">
                {usuario.nombres} {usuario.apellidos}
              </td>
              <td className="px-4 py-3 text-zinc-700">{usuario.correo_personal}</td>
              <td className="px-4 py-3 text-zinc-700">
                {usuario.celular ?? "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(usuario)}
                    className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(usuario.id)}
                    disabled={deletingId === usuario.id}
                    className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === usuario.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
