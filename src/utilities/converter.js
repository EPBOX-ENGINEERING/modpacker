import { BIT_WIDTHS, BIT_LIMITS } from './constants.js';

/**
 * Mengonversi nilai desimal Modbus menjadi array status boolean (Desimal ke Bit).
 * @param {string|number|bigint} decimalValue - Angka desimal dari holding register Modbus.
 * @param {number} bitWidth - Ukuran arsitektur bit (16, 32, 64, atau 128).
 * @returns {boolean[]} Array status true/false berurutan mulai dari Bit 0 (indeks 0).
 */
export function decimalToBits(decimalValue, bitWidth = BIT_WIDTHS.WORD_16) {
    if (!Object.values(BIT_WIDTHS).includes(bitWidth)) {
        throw new Error(`Kapasitas bit ${bitWidth} tidak didukung oleh OmniBit.`);
    }

    // Konversi input ke BigInt agar aman dari presisi pecahan desimal biasa
    let bigDecimal = BigInt(decimalValue);

    // Proteksi jika data yang dikirim minus atau melampaui kapasitas bit register
    if (bigDecimal < 0n || bigDecimal > BIT_LIMITS[bitWidth]) {
        throw new RangeError(`Nilai desimal di luar batas aman untuk kapasitas ${bitWidth}-bit.`);
    }

    const sensorStatus = [];
    
    // Melakukan bitmasking AND (&) dengan teknik bit shift (<<)
    for (let i = 0; i < bitWidth; i++) {
        const bitMask = 1n << BigInt(i);
        const isActive = (bigDecimal & bitMask) !== 0n;
        sensorStatus.push(isActive);
    }

    return sensorStatus;
}

/**
 * Mengonversi array status boolean kembali menjadi satu nilai desimal BigInt (Bit ke Desimal).
 * @param {boolean[]} bitsArray - Array penanda aktifnya sensor/aktuator.
 * @param {number} bitWidth - Batasan ukuran bit target.
 * @returns {bigint} Nilai desimal BigInt yang siap dikirim kembali ke Modbus.
 */
export function bitsToDecimal(bitsArray, bitWidth = BIT_WIDTHS.WORD_16) {
    let bigDecimal = 0n;
    const length = Math.min(bitsArray.length, bitWidth);

    for (let i = 0; i < length; i++) {
        if (bitsArray[i] === true) {
            bigDecimal |= (1n << BigInt(i)); // Bitwise OR untuk mengaktifkan bit
        }
    }

    return bigDecimal;
}