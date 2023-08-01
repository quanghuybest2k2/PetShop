<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItems;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';

    protected $fillable = [
        'address',
        'nameCard',
        'cardNumber',
        'cvc',
        'month',
        'year',
    ];
    public function orderitems()
    {
        return $this->hasMany(OrderItems::class, 'order_id', 'id');
    }
}
