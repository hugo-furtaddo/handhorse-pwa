<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('reproductions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Tipo da atividade (monta_natural, inseminacao, transferencia, confirmacao_prenhes)
            $table->string('type');
            
            // Data principal (ex.: data do evento)
            $table->date('date')->nullable();
            
            // Monta Natural / Inseminação:
            $table->foreignId('egua_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('egua_name')->nullable();
            $table->foreignId('cavalo_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('cavalo_name')->nullable();
            
            // Transferência de embrião:
            $table->foreignId('doadora_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('doadora_name')->nullable();
            $table->foreignId('receptor_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('receptor_name')->nullable();
            
            // Confirmação de prenhes:
            $table->foreignId('animal_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('animal_name')->nullable();
            $table->date('date_exame')->nullable();
            $table->date('date_provavel')->nullable();
            
            $table->foreignId('pai_id')->nullable()->constrained('animals')->nullOnDelete();
            $table->string('pai_name')->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reproductions');
    }
};
