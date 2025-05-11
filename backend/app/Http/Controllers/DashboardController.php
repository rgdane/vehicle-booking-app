<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function vehicleUsage($year)
    {
        $usage = DB::table('bookings')
        ->select(
            DB::raw('DATE_FORMAT(bookings.booking_start_date, "%m") as month'),
            DB::raw('count(*) as usage_count')
        )
        ->where('booking_status', 'Disetujui')
        ->whereYear('bookings.booking_start_date', $year)
        ->groupBy(DB::raw('DATE_FORMAT(bookings.booking_start_date, "%m")'))
        ->orderBy(DB::raw('DATE_FORMAT(bookings.booking_start_date, "%m")'))
        ->get();

        return response()->json($usage);
    }

    public function getYear(){
        $years = DB::table('bookings')
            ->selectRaw('YEAR(booking_start_date) as year')
            ->where('booking_status', 'Disetujui')
            ->whereNull('deleted_at')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');
        return $years;
    }
}
