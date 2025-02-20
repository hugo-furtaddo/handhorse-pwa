<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReproductionType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function reproductions()
    {
        return $this->hasMany(Reproduction::class);
    }
}
