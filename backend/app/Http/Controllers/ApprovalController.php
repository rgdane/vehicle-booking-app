<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $approval = Approval::with('user', 'booking')->latest()->get();
        return response()->json($approval);
    }

    public function indexByLevel($level)
    {
        $approval = Approval::with('user', 'booking.user', 'booking.driver', 'booking.vehicle')
        ->where('approval_level', $level)
        ->where('approval_status', 0)
        ->latest()
        ->get();

        return response()->json($approval);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'booking_id' => 'required|exists:bookings,booking_id',
            'approval_level' => 'required|integer',
            'approval_status' => 'nullable|integer',
            'approval_notes' => 'nullable|string',
        ]);

        $approval = Approval::create($data);

        return response()->json([
            'message' => 'Approval recorded successfully.',
            'data' => $approval,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $approval = Approval::with('user')->findOrFail($id);
        return response()->json($approval);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $approval = Approval::findOrFail($id);

        $data = $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'approval_status' => 'required|integer',
            'approval_notes' => 'nullable|string',
            'approved_at' => 'required|date',
        ]);

        $approval->update($data);

        return response()->json([
            'message' => 'Approval updated successfully.',
            'data' => $approval,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $approval = Approval::findOrFail($id);
        $approval->delete(); // soft delete
        return response()->json(['message' => 'Approval Deleted successfully.']);
    }
}
