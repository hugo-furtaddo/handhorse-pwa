<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Award;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'breed_id',
        'sex',
        'birth_date',
        'father',
        'mother',
        'progeny',
        'photos',
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

    public function awards()
    {
        return $this->hasMany(Award::class);
    }
}
