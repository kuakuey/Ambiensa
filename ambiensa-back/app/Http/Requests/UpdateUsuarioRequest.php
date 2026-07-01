<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $usuarioId = $this->route('usuario');

        return [
            'identificacion' => [
                'required',
                'string',
                'max:20',
                Rule::unique('usuarios', 'identificacion')->ignore($usuarioId),
            ],
            'nombre_usuario' => [
                'required',
                'string',
                'max:50',
                Rule::unique('usuarios', 'nombre_usuario')->ignore($usuarioId),
            ],
            'apellidos' => ['required', 'string', 'max:100'],
            'nombres' => ['required', 'string', 'max:100'],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'celular' => ['nullable', 'string', 'max:20'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'correo_personal' => [
                'required',
                'email',
                'max:150',
                Rule::unique('usuarios', 'correo_personal')->ignore($usuarioId),
            ],
            'estado_civil' => ['required', 'string', Rule::in(['Soltero', 'Casado', 'Unión libre', 'Divorciado', 'Viudo'])],
            'sexo' => ['required', 'string', Rule::in(['Masculino', 'Femenino', 'Otro'])],
            'direccion' => ['required', 'string', 'max:500'],
        ];
    }
}
