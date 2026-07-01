import type { Usuario, UsuarioFormData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = data as ApiError;
    const messages = error.errors
      ? Object.values(error.errors).flat().join(" ")
      : error.message ?? "Error en la solicitud";
    throw new Error(messages);
  }

  return data as T;
}

export async function fetchUsuarios(): Promise<Usuario[]> {
  const response = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  });

  return handleResponse<Usuario[]>(response);
}

export async function createUsuario(data: UsuarioFormData): Promise<Usuario> {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Usuario>(response);
}

export async function updateUsuario(
  id: number,
  data: UsuarioFormData,
): Promise<Usuario> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Usuario>(response);
}

export async function deleteUsuario(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });

  return handleResponse<void>(response);
}
