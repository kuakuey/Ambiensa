"use client";

import { useCallback, useEffect, useState } from "react";
import UsuarioForm from "@/components/UsuarioForm";
import UsuarioList from "@/components/UsuarioList";
import {
  createUsuario,
  deleteUsuario,
  fetchUsuarios,
  updateUsuario,
} from "@/lib/api";
import type { Usuario, UsuarioFormData } from "@/lib/types";
import { emptyUsuarioForm } from "@/lib/types";

export default function HomePage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadUsuarios = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los usuarios.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsuarios();
  }, [loadUsuarios]);

  const handleCreate = async (data: UsuarioFormData) => {
    await createUsuario(data);
    await loadUsuarios();
  };

  const handleUpdate = async (data: UsuarioFormData) => {
    if (!editingUsuario) return;

    await updateUsuario(editingUsuario.id, data);
    setEditingUsuario(null);
    await loadUsuarios();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Deseas eliminar este usuario?")) return;

    setDeletingId(id);

    try {
      await deleteUsuario(id);
      if (editingUsuario?.id === id) {
        setEditingUsuario(null);
      }
      await loadUsuarios();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el usuario.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const editingFormData: UsuarioFormData | undefined = editingUsuario
    ? {
        identificacion: editingUsuario.identificacion,
        nombre_usuario: editingUsuario.nombre_usuario,
        apellidos: editingUsuario.apellidos,
        nombres: editingUsuario.nombres,
        fecha_nacimiento: editingUsuario.fecha_nacimiento.slice(0, 10),
        celular: editingUsuario.celular ?? "",
        telefono: editingUsuario.telefono ?? "",
        correo_personal: editingUsuario.correo_personal,
        estado_civil: editingUsuario.estado_civil,
        sexo: editingUsuario.sexo,
        direccion: editingUsuario.direccion,
      }
    : undefined;

  return (
    <div className="min-h-full bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold text-zinc-900">
            Registro de Usuarios
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Prueba técnica — CRUD con React y Laravel
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                {editingUsuario ? "Editar usuario" : "Nuevo usuario"}
              </h2>
              <p className="text-sm text-zinc-500">
                Completa el formulario para registrar o actualizar un usuario.
              </p>
            </div>
            {editingUsuario && (
              <button
                type="button"
                onClick={() => setEditingUsuario(null)}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                + Nuevo registro
              </button>
            )}
          </div>

          <UsuarioForm
            key={editingUsuario?.id ?? "new"}
            initialData={editingFormData ?? emptyUsuarioForm()}
            onSubmit={editingUsuario ? handleUpdate : handleCreate}
            onCancel={editingUsuario ? () => setEditingUsuario(null) : undefined}
            submitLabel={editingUsuario ? "Actualizar" : "Registrar"}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">
              Usuarios registrados
            </h2>
            <button
              type="button"
              onClick={() => void loadUsuarios()}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Actualizar lista
            </button>
          </div>

          {loading ? (
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-10 text-center text-sm text-zinc-500">
              Cargando usuarios...
            </div>
          ) : loadError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
              {loadError}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => void loadUsuarios()}
                  className="font-medium text-red-800 underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : (
            <UsuarioList
              usuarios={usuarios}
              onEdit={setEditingUsuario}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </section>
      </main>
    </div>
  );
}
