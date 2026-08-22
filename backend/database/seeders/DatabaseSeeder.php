<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Category::create(['name' => 'Work', 'color' => '#ef4444']); // Red
        \App\Models\Category::create(['name' => 'Personal', 'color' => '#3b82f6']); // Blue
        \App\Models\Category::create(['name' => 'Urgent', 'color' => '#f59e0b']); // Yellow
        \App\Models\Category::create(['name' => 'Study', 'color' => '#10b981']); // Green
    }
}
