print("*** PROGRAM PENGHITUNG BMI ***")


berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

bmi = berat / (tinggi ** 2)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

print(f"\nHasil Perhitungan:")
print(f"BMI Anda: {bmi:.2f}")
print(f"Kategori: {kategori}")