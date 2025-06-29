<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reproduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'date',
        'egua_id',
        'egua_name',
        'cavalo_id',
        'cavalo_name',
        'doadora_id',
        'doadora_name',
        'receptor_id',
        'receptor_name',
        'animal_id',
        'animal_name',
        'date_exame',
        'date_provavel',
        'pai_id',
        'pai_name',
    ];

    protected $casts = [
        'date' => 'date',
        'date_exame' => 'date',
        'date_provavel' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function egua()
    {
        return $this->belongsTo(Animal::class, 'egua_id');
    }

    public function cavalo()
    {
        return $this->belongsTo(Animal::class, 'cavalo_id');
    }

    public function doadora()
    {
        return $this->belongsTo(Animal::class, 'doadora_id');
    }

    public function receptor()
    {
        return $this->belongsTo(Animal::class, 'receptor_id');
    }

    public function animal()
    {
        return $this->belongsTo(Animal::class, 'animal_id');
    }

    public function pai()
    {
        return $this->belongsTo(Animal::class, 'pai_id');
    }
}
