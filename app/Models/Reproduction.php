<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reproduction extends Model
{
    protected $fillable = [
        'user_id',
        'reproduction_type_id',
        'date',
        'details',
    ];

    protected $casts = [
        'details' => 'array',
        'date' => 'date',
    ];

    public function reproductionType()
    {
        return $this->belongsTo(ReproductionType::class);
    }
}
