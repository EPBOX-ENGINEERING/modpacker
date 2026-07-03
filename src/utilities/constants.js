/**
 * OmniBit - Data Width Configuration Constants
 * Mendefinisikan kapasitas bit dan nama representasinya dalam dunia Modbus/PLC.
 */
export const BIT_WIDTHS = {
    WORD_16: 16,     // 1 Modbus Register (UINT16 / INT16)
    DWORD_32: 32,    // 2 Modbus Registers (UINT32)
    QWORD_64: 64,    // 4 Modbus Registers (UINT64)
    OWORD_128: 128   // 8 Modbus Registers (Masif / Multi-register)
};

// Batasan nilai aman desimal maksimum (Unsigned) untuk validasi data sebelum dikonversi
export const BIT_LIMITS = {
    16: 65535n,
    32: 4294967295n,
    64: 18446744073709551615n,
    128: 340282366920938463463374607431768211455n
};