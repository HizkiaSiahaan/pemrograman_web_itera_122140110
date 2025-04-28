import math_operations as mo

from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

print("*** PROGRAM DEMO MODUL MATEMATIKA ***")

print("\n1. Hitung Luas dan Keliling Bangun Datar")
print(f"Luas persegi (sisi=5): {mo.luas_persegi(5)}")
print(f"Keliling persegi (sisi=5): {mo.keliling_persegi(5)}")
print(f"Luas persegi panjang (7x4): {mo.luas_persegi_panjang(7, 4)}")
print(f"Keliling persegi panjang (7x4): {mo.keliling_persegi_panjang(7, 4)}")
print(f"Luas lingkaran (jari-jari=3): {mo.luas_lingkaran(3):.2f}")
print(f"Keliling lingkaran (jari-jari=3): {mo.keliling_lingkaran(3):.2f}")

print("\n2. Konversi Suhu")
c = 25
print(f"{c}°C = {celsius_ke_fahrenheit(c):.2f}°F")
print(f"{c}°C = {celsius_ke_kelvin(c):.2f}K")

print("\n3. Konstanta")
print(f"Nilai PI: {mo.PI}")