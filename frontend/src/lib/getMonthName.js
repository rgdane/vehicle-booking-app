// Array nama bulan manual (Indonesia)
import monthName from "./monthName.js";

/**
   * Convert angka bulan ke nama bulan
   * @param {number} month - Bulan ke berapa (1-12)
   * @returns {string} Nama bulan
   */
export function getMonthName(month) {
    if (month < 1 || month > 12) return "Bulan tidak valid";
    return monthName()[month - 1];
}