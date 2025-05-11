<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Vehicle::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'vehicle_plate' => 'required|string|max:255',
            'vehicle_type' => 'required|in:angkutan_orang,angkutan_barang',
            'vehicle_ownership' => 'required|in:perusahaan,rental',
        ]);

        $vehicle = Vehicle::create($data);
        return response()->json($vehicle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Vehicle::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $data = $request->validate([
            'vehicle_plate' => 'sometimes|string|max:255',
            'vehicle_type' => 'sometimes|in:angkutan_orang,angkutan_barang',
            'vehicle_ownership' => 'sometimes|in:perusahaan,rental',
        ]);

        $vehicle->update($data);
        return response()->json($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $vehicle = Vehicle::findOrFail($id);

        $vehicle->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
