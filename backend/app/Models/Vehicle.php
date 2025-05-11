<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'vehicles';
    protected $primaryKey = 'vehicle_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'vehicle_plate',
        'vehicle_type',
        'vehicle_ownership'
    ];

    public function bookings() {
        return $this->hasMany(Booking::class);
    }
}
