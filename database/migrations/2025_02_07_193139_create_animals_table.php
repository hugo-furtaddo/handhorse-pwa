<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            // Se cada animal estiver associado a um produtor (usuário), adicione o user_id:
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->foreignId('breed_id')->constrained('breeds');
            $table->date('birth_date')->nullable();
            $table->string('father')->nullable();
            $table->string('mother')->nullable();
            $table->text('progeny')->nullable();
            // Armazenaremos os caminhos das fotos em formato JSON (vários arquivos podem ser enviados)
            $table->json('photos')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animals');
    }
};

