<?php

namespace App\Http\Controllers;

use App\Exports\BookingExport;
use App\Models\Booking;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with('user', 'driver', 'vehicle')->latest()->get();
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'driver_id' => 'required|exists:drivers,driver_id',
            'vehicle_id' => 'required|exists:vehicles,vehicle_id',
            'booking_purpose' => 'required|string|max:255',
            'booking_status' => 'required|string|max:255',
            'booking_start_date' => 'required|date',
            'booking_end_date' => 'required|date'
        ]);

        $booking = Booking::create($data);

        return response()->json([
            'message' => 'Booking recorded successfully.',
            'data' => $booking->only(['booking_id']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $booking = Booking::with('user')->findOrFail($id);
        return response()->json($booking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $data = $request->validate([
            'user_id' => 'sometimes|exists:users,user_id',
            'driver_id' => 'sometimes|exists:drivers,driver_id',
            'vehicle_id' => 'sometimes|exists:vehicles,vehicle_id',
            'booking_purpose' => 'sometimes|string|max:255',
            'booking_status' => 'sometimes|string|max:255',
            'booking_start_date' => 'sometimes|date',
            'booking_end_date' => 'sometimes|date'
        ]);

        $booking->update($data);

        return response()->json([
            'message' => 'Booking updated successfully.',
            'data' => $booking,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete(); // soft delete
        return response()->json(['message' => 'Booking Deleted successfully.']);
    }

    public function export()
    {
        return Excel::download(new BookingExport, 'data-booking.xlsx');
    }
}
