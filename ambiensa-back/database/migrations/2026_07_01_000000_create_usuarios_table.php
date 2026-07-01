<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('identificacion', 20)->unique();
            $table->string('nombre_usuario', 50)->unique();
            $table->string('apellidos', 100);
            $table->string('nombres', 100);
            $table->date('fecha_nacimiento');
            $table->string('celular', 20)->nullable();
            $table->string('telefono', 20)->nullable();
            $table->string('correo_personal', 150)->unique();
            $table->string('estado_civil', 20);
            $table->string('sexo', 20);
            $table->text('direccion');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
