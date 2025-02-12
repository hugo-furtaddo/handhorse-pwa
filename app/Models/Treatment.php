<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    protected $fillable = [
        'user_id', 'animal_id', 'treatment_type_id', 'date', 'details'
    ];

    protected $casts = [
        'details' => 'array',
        'date' => 'date',
    ];

    public function treatmentType()
    {
        return $this->belongsTo(TreatmentType::class);
    }

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
