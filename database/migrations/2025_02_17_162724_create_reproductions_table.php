<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReproductionsTable extends Migration
{
    public function up()
    {
        Schema::create('reproductions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('reproduction_type_id')->constrained('reproduction_types')->onDelete('cascade');
            $table->date('date');
            $table->json('details')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reproductions');
    }
}

