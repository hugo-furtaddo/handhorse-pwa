<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Award extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'competition',
        'position',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
