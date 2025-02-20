<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TreatmentType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }
}
