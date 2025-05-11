<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'drivers';
    protected $primaryKey = 'driver_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'driver_name',
        'driver_phone',
    ];

    public function bookings() {
        return $this->hasMany(Booking::class);
    }
}
