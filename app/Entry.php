<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $fillable = ['start','end','project_id'];

    public function project()
    {
        return $this->hasOne(Project::class);
    }
}
