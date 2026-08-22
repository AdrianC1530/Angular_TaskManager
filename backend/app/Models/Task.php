<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'status', 'category_id', 'due_date'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
