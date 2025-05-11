<?php

namespace App\Exports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BookingExport implements FromCollection, WithHeadings, ShouldAutoSize, WithStyles
{
    protected $row = 0;

    public function collection()
    {
        return Booking::with(['user', 'vehicle', 'driver'])
            ->whereNull("deleted_at")
            ->get()
            ->map(function ($booking) {
                $this->row++;
                return [
                    'No' => $this->row,
                    'Nama Pemohon' => $booking->user->user_fullname ?? '-',
                    'Plat Nomor' => $booking->vehicle->vehicle_plate ?? '-',
                    'Nama Pengemudi' => $booking->driver->driver_name ?? '-',
                    'Keperluan' => $booking->booking_purpose,
                    'Tanggal Mulai' => $booking->booking_start_date,
                    'Tanggal Selesai' => $booking->booking_end_date,
                    'Status' => $booking->booking_status,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Pemohon',
            'Plat Nomor',
            'Nama Pengemudi',
            'Keperluan',
            'Tanggal Mulai',
            'Tanggal Selesai',
            'Status',
        ];
    }

    // Membuat baris heading (baris pertama) bold
    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}

