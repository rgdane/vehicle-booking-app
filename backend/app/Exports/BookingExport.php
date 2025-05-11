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
    protected $year;
    protected $month;

    public function __construct($year = null, $month = null)
    {
        $this->year = $year;
        $this->month = $month;
    }

    public function collection()
    {
        $query = Booking::with(['user', 'vehicle', 'driver'])
            ->whereNull("deleted_at");

        if ($this->year) {
            $query->whereYear('booking_start_date', $this->year);
        }

        if ($this->month) {
            $query->whereMonth('booking_start_date', $this->month);
        }

        $data = $query->get();

        $this->row = 0;

        return $data->map(function ($booking) {
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

