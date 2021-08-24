<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Soal;
use App\Prodi;
use Illuminate\Support\Arr;

class DataController extends Controller
{
    public function getSoal()
    {
        $soals = Soal::all();

        return response()->json($soals);
    }

    public function postSoal(Request $request)
    {
        Soal::create([
            'nama' => $request->nama,
            'pekerjaan' => $request->pekerjaan,
            'fakultas' => $request->fakultas,
            'prodi' => $request->prodi,
            'ipk' => $request->ipk,
            'lama_studi' => $request->lama_studi,
            'angkatan' => $request->angkatan,
            'keperluan_sertif' => $request->keperluan_sertif,
        ]);
    }

    public function getProdi()
    {
        $prodis = Prodi::all();

        return response()->json($prodis);
    }

    public function getFileProdi($id)
    {
        $prodi = Prodi::find($id);

        $file = json_decode($prodi->file);

        return response()->json(Arr::flatten($file));
    }

    public function postProdi(Request $request)
    {
        Prodi::create([
            'kode_prodi' => $request->kode_prodi,
            'program_studi' => $request->program_studi,
            'fakultas' => $request->fakultas,
            'file' => $request->file,
        ]);
    }
}
