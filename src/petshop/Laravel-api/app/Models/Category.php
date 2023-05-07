<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    //Nhưng mà với mỗi hình thì nên có thêm 2 trường: tên người đăng và 1 dòng cảm nhận (status)
    protected $fillable = [
        'slug',
        'name',
        'description',
        'image',
        'status',
    ];
}
