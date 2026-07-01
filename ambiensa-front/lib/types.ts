export interface Usuario {
  id: number;
  identificacion: string;
  nombre_usuario: string;
  apellidos: string;
  nombres: string;
  fecha_nacimiento: string;
  celular: string | null;
  telefono: string | null;
  correo_personal: string;
  estado_civil: string;
  sexo: string;
  direccion: string;
  created_at?: string;
  updated_at?: string;
}

export type UsuarioFormData = Omit<Usuario, "id" | "created_at" | "updated_at">;

export const emptyUsuarioForm = (): UsuarioFormData => ({
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
});

export const ESTADOS_CIVILES = [
  "Soltero",
  "Casado",
  "Unión libre",
  "Divorciado",
  "Viudo",
] as const;

export const SEXOS = ["Masculino", "Femenino", "Otro"] as const;
