<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Soal extends Model
{
    protected $fillable = ['nama', 'pekerjaan', 'fakultas', 'prodi', 'ipk', 'lama_studi', 'angkatan', 'keperluan_sertif'];
}
