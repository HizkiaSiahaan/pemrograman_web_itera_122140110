print("*** PROGRAM PENGELOLAAN NILAI MAHASISWA ***")

data_mahasiswa = [
    {"nama": "Hansip", "nim": "110", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 80},
    {"nama": "Jarwok", "nim": "028", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Aceng", "nim": "173", "nilai_uts": 80, "nilai_uas": 80, "nilai_tugas": 80},
    {"nama": "Acing", "nim": "156", "nilai_uts": 50, "nilai_uas": 70, "nilai_tugas": 70},
    {"nama": "Sontang", "nim": "230", "nilai_uts": 50, "nilai_uas": 60, "nilai_tugas": 85}
]

for mahasiswa in data_mahasiswa:
    nilai_akhir = (0.3 * mahasiswa["nilai_uts"] + 
                   0.4 * mahasiswa["nilai_uas"] + 
                   0.3 * mahasiswa["nilai_tugas"])
    mahasiswa["nilai_akhir"] = nilai_akhir
    
    if nilai_akhir >= 80:
        grade = "A"
    elif 70 <= nilai_akhir < 80:
        grade = "B"
    elif 60 <= nilai_akhir < 70:
        grade = "C"
    elif 50 <= nilai_akhir < 60:
        grade = "D"
    else:
        grade = "E"
    mahasiswa["grade"] = grade

print("\nDaftar Nilai Mahasiswa:")
print("="*85)
print("| {:<4} | {:<15} | {:<10} | {:<6} | {:<6} | {:<6} | {:<12} | {:<5} |".format(
    "No", "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"))
print("="*85)

for i, mahasiswa in enumerate(data_mahasiswa, 1):
    print("| {:<4} | {:<15} | {:<10} | {:<6} | {:<6} | {:<6} | {:<12.2f} | {:<5} |".format(
        i, 
        mahasiswa["nama"], 
        mahasiswa["nim"], 
        mahasiswa["nilai_uts"], 
        mahasiswa["nilai_uas"], 
        mahasiswa["nilai_tugas"], 
        mahasiswa["nilai_akhir"], 
        mahasiswa["grade"]))
print("="*85)

nilai_akhir_list = [m["nilai_akhir"] for m in data_mahasiswa]
max_index = nilai_akhir_list.index(max(nilai_akhir_list))
min_index = nilai_akhir_list.index(min(nilai_akhir_list))

print("\nMahasiswa dengan Nilai Tertinggi:")
print(f"Nama: {data_mahasiswa[max_index]['nama']}, Nilai: {data_mahasiswa[max_index]['nilai_akhir']:.2f}, Grade: {data_mahasiswa[max_index]['grade']}")

print("\nMahasiswa dengan Nilai Terendah:")
print(f"Nama: {data_mahasiswa[min_index]['nama']}, Nilai: {data_mahasiswa[min_index]['nilai_akhir']:.2f}, Grade: {data_mahasiswa[min_index]['grade']}")