<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model {
    //

    protected $fillable = ['path', 'imageable_id', 'imageable_type'];
    protected $visible = [

        'path'

    ];

    public function imageable()
    {
        return $this->morphTo('imageable');
    }

}


