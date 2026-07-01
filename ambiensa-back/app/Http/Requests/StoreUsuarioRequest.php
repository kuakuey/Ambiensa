<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'identificacion' => ['required', 'string', 'max:20', 'unique:usuarios,identificacion'],
            'nombre_usuario' => ['required', 'string', 'max:50', 'unique:usuarios,nombre_usuario'],
            'apellidos' => ['required', 'string', 'max:100'],
            'nombres' => ['required', 'string', 'max:100'],
            'fecha_nacimiento' => ['required', 'date', 'before:today'],
            'celular' => ['nullable', 'string', 'max:20'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'correo_personal' => ['required', 'email', 'max:150', 'unique:usuarios,correo_personal'],
            'estado_civil' => ['required', 'string', Rule::in(['Soltero', 'Casado', 'Unión libre', 'Divorciado', 'Viudo'])],
            'sexo' => ['required', 'string', Rule::in(['Masculino', 'Femenino', 'Otro'])],
            'direccion' => ['required', 'string', 'max:500'],
        ];
    }
}
