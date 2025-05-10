<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('user_fullname');
            $table->string('user_email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('user_password');
            $table->enum('user_role', ['admin', 'direktur_cabang', 'direktur_pusat'])->default('admin');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
