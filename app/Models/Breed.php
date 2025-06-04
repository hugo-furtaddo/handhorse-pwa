<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    protected $fillable = ['name', 'association_id'];

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }

    public function association()
    {
        return $this->belongsTo(Association::class);
    }
}
