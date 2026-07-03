import { BIT_WIDTHS } from './utilities/constants.js';
import { decimalToBits, bitsToDecimal } from './utilities/converter.js';

console.log("=== BITPACKING ENGINE SIMULATION ===");

// ----------------------------------------------------
// KASUS 1: Standard Modbus 16-Bit (1 Word)
// ----------------------------------------------------
console.log("\n[KASUS 1] Membaca Data Desimal 16-Bit");
const dataMasukModbus = 13; // Biner: 1101 (Sensor 0, 2, 3 Aktif)
const statusSensor16 = decimalToBits(dataMasukModbus, BIT_WIDTHS.WORD_16);

console.log(`Input Desimal Modbus: ${dataMasukModbus}`);
console.log(`Sensor 0 (Bit 0) Aktif? : ${statusSensor16[0]}`); // true
console.log(`Sensor 1 (Bit 1) Aktif? : ${statusSensor16[1]}`); // false
console.log(`Sensor 2 (Bit 2) Aktif? : ${statusSensor16[2]}`); // true
console.log(`Sensor 3 (Bit 3) Aktif? : ${statusSensor16[3]}`); // true


// ----------------------------------------------------
// KASUS 2: Modbus Multi-register Tinggi 64-Bit (QWORD)
// ----------------------------------------------------
console.log("\n[KASUS 2] Membaca Data Masif 64-Bit (Sensor Alamat Tinggi)");
// Kasus di mana sensor pada Bit ke-60 aktif (Nilai desimalnya sangat panjang)
const desimalMasif = "1152921504606846976"; 
const statusSensor64 = decimalToBits(desimalMasif, BIT_WIDTHS.QWORD_64);

console.log(`Apakah Sensor urutan ke-60 Aktif? : ${statusSensor64[60]}`); // true
console.log(`Apakah Sensor urutan ke-61 Aktif? : ${statusSensor64[61]}`); // false


// ----------------------------------------------------
// KASUS 3: Mengirim Balik Data dari Sensor ke Desimal Modbus
// ----------------------------------------------------
console.log("\n[KASUS 3] Mengemas Balik Status Sensor ke Desimal 128-Bit");
const simulasiKondisiSensor = new Array(128).fill(false);
simulasiKondisiSensor[0] = true;   // Aktifkan sensor paling awal (Bit 0)
simulasiKondisiSensor[127] = true; // Aktifkan sensor paling akhir (Bit 127)

const hasilPacking128 = bitsToDecimal(simulasiKondisiSensor, BIT_WIDTHS.OWORD_128);
console.log("Nilai Desimal Bersih (BigInt) untuk Modbus 128-bit:");
console.log(hasilPacking128.toString()); 
// Output berupa angka super besar aman tanpa pembulatan javascript.