<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssociationDeadline extends Model
{
    use HasFactory;

    protected $fillable = [
        'association_id',
        'procedure',
        'rule',
        'days',
    ];

    public function association()
    {
        return $this->belongsTo(Association::class);
    }
}
