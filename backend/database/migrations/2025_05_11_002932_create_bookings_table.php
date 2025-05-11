<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('booking_id');
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id');
            $table->foreignId('driver_id')->constrained('drivers', 'driver_id');
            $table->text('booking_purpose');
            $table->date('booking_start_date');
            $table->date('booking_end_date');
            $table->string('booking_status')->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
