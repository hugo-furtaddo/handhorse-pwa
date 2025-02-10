<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = [
        'user_id', 'name', 'breed_id', 'birth_date', 'father', 'mother', 'progeny', 'photos'
    ];

    protected $casts = [
        'photos' => 'array',
        'birth_date' => 'date',
    ];

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
