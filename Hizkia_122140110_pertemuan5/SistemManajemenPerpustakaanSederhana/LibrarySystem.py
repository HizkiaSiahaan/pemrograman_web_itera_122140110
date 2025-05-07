from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """
    Abstract class yang menjadi dasar untuk semua item di perpustakaan.
    """
    def __init__(self, item_id, title, author, year_published):
        """
        Constructor untuk LibraryItem
        
        Args:
            item_id (str): ID unik untuk item
            title (str): Judul item
            author (str): Penulis/Pembuat item
            year_published (int): Tahun penerbitan
        """
        self._item_id = item_id  # protected attribute
        self._title = title  # protected attribute
        self._author = author  # protected attribute
        self._year_published = year_published  # protected attribute
        self._is_borrowed = False  # protected attribute untuk status peminjaman
    
    @abstractmethod
    def display_info(self):
        """
        Method abstract yang harus diimplementasikan oleh subclass.
        Menampilkan informasi detail tentang item perpustakaan.
        """
        pass
    
    def borrow_item(self):
        """
        Method untuk meminjam item dari perpustakaan.
        
        Returns:
            bool: True jika peminjaman berhasil, False jika item sudah dipinjam
        """
        if not self._is_borrowed:
            self._is_borrowed = True
            return True
        return False
    
    def return_item(self):
        """
        Method untuk mengembalikan item ke perpustakaan.
        
        Returns:
            bool: True jika pengembalian berhasil, False jika item belum dipinjam
        """
        if self._is_borrowed:
            self._is_borrowed = False
            return True
        return False
    
    # Getter dan setter untuk atribut dengan encapsulation
    @property
    def item_id(self):
        return self._item_id
    
    @property
    def title(self):
        return self._title
    
    @property
    def author(self):
        return self._author
    
    @property
    def year_published(self):
        return self._year_published
    
    @property
    def is_borrowed(self):
        return self._is_borrowed


class Book(LibraryItem):
    """
    Class Book yang mewarisi LibraryItem.
    """
    def __init__(self, item_id, title, author, year_published, genre, pages):
        """
        Constructor untuk Book
        
        Args:
            item_id (str): ID unik untuk buku
            title (str): Judul buku
            author (str): Penulis buku
            year_published (int): Tahun penerbitan
            genre (str): Genre buku
            pages (int): Jumlah halaman
        """
        super().__init__(item_id, title, author, year_published)
        self._genre = genre  # protected attribute
        self._pages = pages  # protected attribute
    
    def display_info(self):
        """
        Implementasi method abstract dari parent class.
        Menampilkan informasi detail tentang buku.
        
        Returns:
            str: Informasi buku
        """
        status = "Dipinjam" if self._is_borrowed else "Tersedia"
        return f"BUKU [ID: {self._item_id}]\nJudul: {self._title}\nPenulis: {self._author}\n" \
               f"Tahun: {self._year_published}\nGenre: {self._genre}\n" \
               f"Halaman: {self._pages}\nStatus: {status}"
    
    @property
    def genre(self):
        return self._genre
    
    @property
    def pages(self):
        return self._pages


class Magazine(LibraryItem):
    """
    Class Magazine yang mewarisi LibraryItem.
    """
    def __init__(self, item_id, title, publisher, year_published, issue_number, category):
        """
        Constructor untuk Magazine
        
        Args:
            item_id (str): ID unik untuk majalah
            title (str): Judul majalah
            publisher (str): Penerbit majalah (digunakan sebagai author dalam parent class)
            year_published (int): Tahun penerbitan
            issue_number (str): Nomor edisi majalah
            category (str): Kategori majalah
        """
        super().__init__(item_id, title, publisher, year_published)
        self._issue_number = issue_number  # protected attribute
        self._category = category  # protected attribute
    
    def display_info(self):
        """
        Implementasi method abstract dari parent class.
        Menampilkan informasi detail tentang majalah.
        
        Returns:
            str: Informasi majalah
        """
        status = "Dipinjam" if self._is_borrowed else "Tersedia"
        return f"MAJALAH [ID: {self._item_id}]\nJudul: {self._title}\nPenerbit: {self._author}\n" \
               f"Tahun: {self._year_published}\nEdisi: {self._issue_number}\n" \
               f"Kategori: {self._category}\nStatus: {status}"
    
    @property
    def issue_number(self):
        return self._issue_number
    
    @property
    def category(self):
        return self._category


class DVD(LibraryItem):
    """
    Class DVD yang mewarisi LibraryItem sebagai tambahan subclass.
    """
    def __init__(self, item_id, title, director, year_published, duration, genre):
        """
        Constructor untuk DVD
        
        Args:
            item_id (str): ID unik untuk DVD
            title (str): Judul DVD
            director (str): Sutradara DVD (digunakan sebagai author dalam parent class)
            year_published (int): Tahun penerbitan
            duration (int): Durasi film dalam menit
            genre (str): Genre film
        """
        super().__init__(item_id, title, director, year_published)
        self._duration = duration  # protected attribute
        self._genre = genre  # protected attribute
    
    def display_info(self):
        """
        Implementasi method abstract dari parent class.
        Menampilkan informasi detail tentang DVD.
        
        Returns:
            str: Informasi DVD
        """
        status = "Dipinjam" if self._is_borrowed else "Tersedia"
        return f"DVD [ID: {self._item_id}]\nJudul: {self._title}\nSutradara: {self._author}\n" \
               f"Tahun: {self._year_published}\nDurasi: {self._duration} menit\n" \
               f"Genre: {self._genre}\nStatus: {status}"
    
    @property
    def duration(self):
        return self._duration
    
    @property
    def genre(self):
        return self._genre


def read_only(func):
    """
    Property decorator untuk membuat atribut read-only.
    
    Args:
        func: Fungsi getter yang akan dibuat read-only
    
    Returns:
        property: Property read-only
    """
    return property(func)


class Library:
    """
    Class Library untuk menyimpan dan mengelola koleksi item perpustakaan.
    """
    def __init__(self, name):
        """
        Constructor untuk Library
        
        Args:
            name (str): Nama perpustakaan
        """
        self.__name = name  # private attribute
        self.__items = []  # private attribute untuk menyimpan koleksi item
        self.__borrowed_count = 0  # private attribute untuk menghitung item yang dipinjam
    
    @read_only
    def name(self):
        """
        Getter read-only untuk nama perpustakaan.
        
        Returns:
            str: Nama perpustakaan
        """
        return self.__name
    
    @read_only
    def total_items(self):
        """
        Getter read-only untuk total item dalam perpustakaan.
        
        Returns:
            int: Jumlah total item
        """
        return len(self.__items)
    
    @read_only
    def borrowed_count(self):
        """
        Getter read-only untuk jumlah item yang sedang dipinjam.
        
        Returns:
            int: Jumlah item yang dipinjam
        """
        return self.__borrowed_count
    
    def add_item(self, item):
        """
        Menambahkan item ke perpustakaan.
        
        Args:
            item (LibraryItem): Item perpustakaan untuk ditambahkan
        
        Returns:
            bool: True jika berhasil, False jika item dengan ID sama sudah ada
        """
        # Cek apakah item dengan ID yang sama sudah ada
        for existing_item in self.__items:
            if existing_item.item_id == item.item_id:
                return False
        
        self.__items.append(item)
        return True
    
    def remove_item(self, item_id):
        """
        Menghapus item dari perpustakaan berdasarkan ID.
        
        Args:
            item_id (str): ID item yang akan dihapus
        
        Returns:
            tuple: (bool success, str message)
        """
        item = self.search_by_id(item_id)
        
        if not item:
            return False, f"Item dengan ID {item_id} tidak ditemukan."
        
        if item.is_borrowed:
            return False, f"Item dengan ID {item_id} sedang dipinjam dan tidak dapat dihapus."
        
        self.__items.remove(item)
        return True, f"Item dengan ID {item_id} berhasil dihapus dari perpustakaan."
    
    def display_all_items(self):
        """
        Menampilkan semua item yang tersedia di perpustakaan.
        
        Returns:
            list: Daftar informasi semua item
        """
        if not self.__items:
            return ["Perpustakaan kosong."]
        
        items_info = []
        for item in self.__items:
            items_info.append(item.display_info())
            items_info.append("-" * 40)  # Separator
        
        return items_info
    
    def search_by_title(self, title):
        """
        Mencari item berdasarkan judul.
        
        Args:
            title (str): Judul yang dicari
        
        Returns:
            list: Daftar item yang judulnya mengandung kata kunci
        """
        results = []
        title = title.lower()
        
        for item in self.__items:
            if title in item.title.lower():
                results.append(item)
        
        return results
    
    def search_by_id(self, item_id):
        """
        Mencari item berdasarkan ID.
        
        Args:
            item_id (str): ID yang dicari
        
        Returns:
            LibraryItem: Item yang ditemukan atau None jika tidak ada
        """
        for item in self.__items:
            if item.item_id == item_id:
                return item
        
        return None
    
    def borrow_item_by_id(self, item_id):
        """
        Meminjam item berdasarkan ID.
        
        Args:
            item_id (str): ID item yang akan dipinjam
        
        Returns:
            tuple: (bool success, str message)
        """
        item = self.search_by_id(item_id)
        
        if not item:
            return False, f"Item dengan ID {item_id} tidak ditemukan."
        
        if item.is_borrowed:
            return False, f"Item dengan ID {item_id} sudah dipinjam."
        
        item.borrow_item()
        self.__borrowed_count += 1
        return True, f"Item dengan ID {item_id} berhasil dipinjam."
    
    def return_item_by_id(self, item_id):
        """
        Mengembalikan item berdasarkan ID.
        
        Args:
            item_id (str): ID item yang akan dikembalikan
        
        Returns:
            tuple: (bool success, str message)
        """
        item = self.search_by_id(item_id)
        
        if not item:
            return False, f"Item dengan ID {item_id} tidak ditemukan."
        
        if not item.is_borrowed:
            return False, f"Item dengan ID {item_id} tidak sedang dipinjam."
        
        item.return_item()
        self.__borrowed_count -= 1
        return True, f"Item dengan ID {item_id} berhasil dikembalikan."
    
    def get_available_items(self):
        """
        Mendapatkan daftar item yang tersedia (tidak sedang dipinjam).
        
        Returns:
            list: Daftar item yang tersedia
        """
        return [item for item in self.__items if not item.is_borrowed]
    
    def get_borrowed_items(self):
        """
        Mendapatkan daftar item yang sedang dipinjam.
        
        Returns:
            list: Daftar item yang sedang dipinjam
        """
        return [item for item in self.__items if item.is_borrowed]
    
    def count_items_by_type(self):
        """
        Menghitung jumlah item berdasarkan jenisnya.
        
        Returns:
            dict: Dictionary dengan jenis item sebagai key dan jumlah sebagai value
        """
        counts = {
            "Book": 0,
            "Magazine": 0,
            "DVD": 0
        }
        
        for item in self.__items:
            if isinstance(item, Book):
                counts["Book"] += 1
            elif isinstance(item, Magazine):
                counts["Magazine"] += 1
            elif isinstance(item, DVD):
                counts["DVD"] += 1
        
        return counts


def display_menu():
    """Menampilkan menu utama"""
    print("\n" + "=" * 50)
    print("SISTEM MANAJEMEN PERPUSTAKAAN".center(50))
    print("=" * 50)
    print("1. Tambah Item")
    print("2. Tampilkan Semua Item")
    print("3. Cari Item")
    print("4. Pinjam Item")
    print("5. Kembalikan Item")
    print("6. Hapus Item")
    print("7. Tampilkan Statistik")
    print("8. Keluar")
    print("=" * 50)


def add_item_menu(library):
    """Menu untuk menambahkan item baru"""
    print("\n" + "=" * 50)
    print("TAMBAH ITEM BARU".center(50))
    print("=" * 50)
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tambah DVD")
    print("4. Kembali")
    print("=" * 50)
    
    choice = input("Pilih jenis item (1-4): ")
    
    if choice == "1":
        add_book(library)
    elif choice == "2":
        add_magazine(library)
    elif choice == "3":
        add_dvd(library)
    elif choice == "4":
        return
    else:
        print("Pilihan tidak valid!")


def add_book(library):
    """Fungsi untuk menambahkan buku baru"""
    print("\n--- TAMBAH BUKU BARU ---")
    
    try:
        item_id = input("ID Buku (contoh: B001): ")
        title = input("Judul Buku: ")
        author = input("Penulis: ")
        year = int(input("Tahun Terbit: "))
        genre = input("Genre: ")
        pages = int(input("Jumlah Halaman: "))
        
        book = Book(item_id, title, author, year, genre, pages)
        
        if library.add_item(book):
            print(f"Buku '{title}' berhasil ditambahkan!")
        else:
            print(f"Item dengan ID {item_id} sudah ada di perpustakaan!")
    
    except ValueError:
        print("Input tidak valid. Tahun dan halaman harus berupa angka.")


def add_magazine(library):
    """Fungsi untuk menambahkan majalah baru"""
    print("\n--- TAMBAH MAJALAH BARU ---")
    
    try:
        item_id = input("ID Majalah (contoh: M001): ")
        title = input("Judul Majalah: ")
        publisher = input("Penerbit: ")
        year = int(input("Tahun Terbit: "))
        issue = input("Nomor Edisi: ")
        category = input("Kategori: ")
        
        magazine = Magazine(item_id, title, publisher, year, issue, category)
        
        if library.add_item(magazine):
            print(f"Majalah '{title}' berhasil ditambahkan!")
        else:
            print(f"Item dengan ID {item_id} sudah ada di perpustakaan!")
    
    except ValueError:
        print("Input tidak valid. Tahun harus berupa angka.")


def add_dvd(library):
    """Fungsi untuk menambahkan DVD baru"""
    print("\n--- TAMBAH DVD BARU ---")
    
    try:
        item_id = input("ID DVD (contoh: D001): ")
        title = input("Judul DVD: ")
        director = input("Sutradara: ")
        year = int(input("Tahun Terbit: "))
        duration = int(input("Durasi (menit): "))
        genre = input("Genre: ")
        
        dvd = DVD(item_id, title, director, year, duration, genre)
        
        if library.add_item(dvd):
            print(f"DVD '{title}' berhasil ditambahkan!")
        else:
            print(f"Item dengan ID {item_id} sudah ada di perpustakaan!")
    
    except ValueError:
        print("Input tidak valid. Tahun dan durasi harus berupa angka.")


def display_all_items(library):
    """Menampilkan semua item di perpustakaan"""
    print("\n" + "=" * 50)
    print("DAFTAR SEMUA ITEM".center(50))
    print("=" * 50)
    
    items_info = library.display_all_items()
    for info in items_info:
        print(info)


def search_item_menu(library):
    """Menu untuk mencari item"""
    print("\n" + "=" * 50)
    print("CARI ITEM".center(50))
    print("=" * 50)
    print("1. Cari berdasarkan ID")
    print("2. Cari berdasarkan Judul")
    print("3. Kembali")
    print("=" * 50)
    
    choice = input("Pilih metode pencarian (1-3): ")
    
    if choice == "1":
        search_by_id(library)
    elif choice == "2":
        search_by_title(library)
    elif choice == "3":
        return
    else:
        print("Pilihan tidak valid!")


def search_by_id(library):
    """Mencari item berdasarkan ID"""
    item_id = input("\nMasukkan ID item: ")
    item = library.search_by_id(item_id)
    
    if item:
        print("\n--- HASIL PENCARIAN ---")
        print(item.display_info())
    else:
        print(f"Item dengan ID {item_id} tidak ditemukan.")


def search_by_title(library):
    """Mencari item berdasarkan judul"""
    title = input("\nMasukkan judul item: ")
    results = library.search_by_title(title)
    
    if results:
        print(f"\n--- HASIL PENCARIAN '{title}' ---")
        for item in results:
            print(item.display_info())
            print("-" * 40)
    else:
        print(f"Tidak ditemukan item dengan judul '{title}'.")


def borrow_item(library):
    """Meminjam item dari perpustakaan"""
    print("\n" + "=" * 50)
    print("PINJAM ITEM".center(50))
    print("=" * 50)
    
    item_id = input("Masukkan ID item yang ingin dipinjam: ")
    success, message = library.borrow_item_by_id(item_id)
    print(message)


def return_item(library):
    """Mengembalikan item ke perpustakaan"""
    print("\n" + "=" * 50)
    print("KEMBALIKAN ITEM".center(50))
    print("=" * 50)
    
    item_id = input("Masukkan ID item yang ingin dikembalikan: ")
    success, message = library.return_item_by_id(item_id)
    print(message)


def remove_item(library):
    """Menghapus item dari perpustakaan"""
    print("\n" + "=" * 50)
    print("HAPUS ITEM".center(50))
    print("=" * 50)
    
    item_id = input("Masukkan ID item yang ingin dihapus: ")
    success, message = library.remove_item(item_id)
    print(message)


def display_statistics(library):
    """Menampilkan statistik perpustakaan"""
    print("\n" + "=" * 50)
    print("STATISTIK PERPUSTAKAAN".center(50))
    print("=" * 50)
    
    print(f"Nama Perpustakaan: {library.name}")
    print(f"Total Item: {library.total_items}")
    print(f"Item Dipinjam: {library.borrowed_count}")
    print(f"Item Tersedia: {library.total_items - library.borrowed_count}")
    
    type_counts = library.count_items_by_type()
    print("\nJumlah Item Berdasarkan Jenis:")
    for item_type, count in type_counts.items():
        print(f"- {item_type}: {count} item")
    
    print("\nStatus Peminjaman:")
    borrowed_items = library.get_borrowed_items()
    if borrowed_items:
        print("Item yang Sedang Dipinjam:")
        for item in borrowed_items:
            print(f"- {item.title} (ID: {item.item_id})")
    else:
        print("Tidak ada item yang sedang dipinjam.")


def initialize_sample_data(library):
    """Inisialisasi data sampel untuk perpustakaan"""
    # Buku
    library.add_item(Book("B001", "Python Programming", "John Smith", 2020, "Komputer", 350))
    library.add_item(Book("B002", "Data Structures and Algorithms", "Jane Doe", 2019, "Komputer", 420))
    library.add_item(Book("B003", "Novel Laskar Pelangi", "Andrea Hirata", 2005, "Novel", 529))
    
    # Majalah
    library.add_item(Magazine("M001", "National Geographic", "National Geographic Society", 2023, "Volume 243, No. 4", "Sains"))
    library.add_item(Magazine("M002", "Time", "Time USA, LLC", 2023, "April 2023", "Berita"))
    
    # DVD
    library.add_item(DVD("D001", "The Matrix", "Wachowski Brothers", 1999, 136, "Science Fiction"))
    library.add_item(DVD("D002", "Inception", "Christopher Nolan", 2010, 148, "Science Fiction"))


def main():
    """Fungsi utama program"""
    library = Library("Perpustakaan Coding Python")
    
    # Tanyakan apakah ingin menginisialisasi dengan data sampel
    init_choice = input("Inisialisasi perpustakaan dengan data sampel? (y/n): ")
    if init_choice.lower() == 'y':
        initialize_sample_data(library)
        print("Data sampel berhasil ditambahkan!")
    
    while True:
        display_menu()
        choice = input("Pilih menu (1-8): ")
        
        if choice == "1":
            add_item_menu(library)
        elif choice == "2":
            display_all_items(library)
        elif choice == "3":
            search_item_menu(library)
        elif choice == "4":
            borrow_item(library)
        elif choice == "5":
            return_item(library)
        elif choice == "6":
            remove_item(library)
        elif choice == "7":
            display_statistics(library)
        elif choice == "8":
            print("\nTerima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
        else:
            print("Pilihan tidak valid. Silakan pilih 1-8.")


if __name__ == "__main__":
    main()
