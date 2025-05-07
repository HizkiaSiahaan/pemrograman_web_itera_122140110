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
        return True, f"Item dengan ID {item_id} berhasil dikembalikan."


# Program utama untuk demonstrasi
def main():
    # Inisialisasi perpustakaan
    library = Library("Perpustakaan Sederhana")
    
    # Menambahkan beberapa buku
    book1 = Book("B001", "Python Programming", "John Smith", 2020, "Komputer", 350)
    book2 = Book("B002", "Data Structures and Algorithms", "Jane Doe", 2019, "Komputer", 420)
    book3 = Book("B003", "Novel Laskar Pelangi", "Andrea Hirata", 2005, "Novel", 529)
    
    # Menambahkan beberapa majalah
    magazine1 = Magazine("M001", "National Geographic", "National Geographic Society", 2023, "Volume 243, No. 4", "Sains")
    magazine2 = Magazine("M002", "Time", "Time USA, LLC", 2023, "April 2023", "Berita")
    
    # Menambahkan item ke perpustakaan
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)
    library.add_item(magazine1)
    library.add_item(magazine2)
    
    # Contoh penggunaan polymorphism dengan display_info
    print("*** MENAMPILKAN SEMUA ITEM ***")
    items_info = library.display_all_items()
    for info in items_info:
        print(info)
    
    print("\n*** MENCARI ITEM BERDASARKAN JUDUL ***")
    search_results = library.search_by_title("Python")
    if search_results:
        for item in search_results:
            print(item.display_info())
            print("-" * 40)
    else:
        print("Tidak ditemukan item dengan judul tersebut.")
    
    print("\n*** MEMINJAM ITEM ***")
    success, message = library.borrow_item_by_id("B001")
    print(message)
    
    print("\n*** MENCARI ITEM BERDASARKAN ID ***")
    item = library.search_by_id("B001")
    if item:
        print(item.display_info())
    else:
        print("Item tidak ditemukan.")
    
    print("\n*** MENGEMBALIKAN ITEM ***")
    success, message = library.return_item_by_id("B001")
    print(message)
    
    print("\n*** STATUS ITEM SETELAH PENGEMBALIAN ***")
    item = library.search_by_id("B001")
    if item:
        print(item.display_info())
    else:
        print("Item tidak ditemukan.")


if __name__ == "__main__":
    main()