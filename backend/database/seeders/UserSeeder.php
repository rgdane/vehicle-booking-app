<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'user_fullname' => 'Admin',
                'user_email' => 'admin@gmail.com',
                'user_password' => Hash::make('admin123'),
                'user_role' => 'admin'
            ],
            [
                'user_fullname' => 'Direktur Cabang',
                'user_email' => 'direkturcabang@gmail.com',
                'user_password' => Hash::make('cabang123'),
                'user_role' => 'direktur_cabang'
            ],
            [
                'user_fullname' => 'Direktur Pusat',
                'user_email' => 'direkturpusat@gmail.com',
                'user_password' => Hash::make('pusat123'),
                'user_role' => 'direktur_pusat'
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
