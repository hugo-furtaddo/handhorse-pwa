<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReproductionType extends Model
{
    protected $fillable = ['name'];

    public function reproductions()
    {
        return $this->hasMany(Reproduction::class);
    }
}
