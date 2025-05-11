<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Driver::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'driver_name' => 'required|string|max:255',
            'driver_phone' => 'required|string|max:20',
        ]);

        $driver = Driver::create($data);
        return response()->json($driver, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Driver::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $driver = Driver::findOrFail($id);
        $data = $request->validate([
            'driver_name' => 'sometimes|string|max:255',
            'driver_phone' => 'sometimes|string|max:20',
        ]);

        $driver->update($data);
        return response()->json($driver);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $driver = Driver::findOrFail($id);

        $driver->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
