import json

# Dữ liệu bảng: list of dicts
BANG_QUY_DOI = [
    {
        "Khoảng": "Khoảng 1",
        "THPT": [27.25, 30],
        "Tài năng": [85, 100],
        "SAT": [1450, 1600],
        "ACT": [33, 36],
        "HSA": [105, 150],
        "TSA": [75.53, 100],
        "SPT": [25, 30],
        "APT": [959, 1200],
        "Kết hợp": [28.75, 30]
    },
    {
        "Khoảng": "Khoảng 2",
        "THPT": [25.25, 27.25],
        "Tài năng": [80, 85],
        "SAT": [1350, 1450],
        "ACT": [30, 33],
        "HSA": [97, 105],
        "TSA": [69.29, 75.53],
        "SPT": [22.75, 25],
        "APT": [887, 959],
        "Kết hợp": [27.75, 28.75]
    },
    {
        "Khoảng": "Khoảng 3",
        "THPT": [23.50, 25.25],
        "Tài năng": [42.50, 80],
        "SAT": [1250, 1350],
        "ACT": [28, 30],
        "HSA": [91, 97],
        "TSA": [65.42, 69.29],
        "SPT": [20.5, 22.75],
        "APT": [816, 887],
        "Kết hợp": [26.50, 27.75]
    },
    {
        "Khoảng": "Khoảng 4",
        "THPT": [20.50, 23.50],
        "Tài năng": None,
        "SAT": [1130, 1250],
        "ACT": [25, 28],
        "HSA": [82, 91],
        "TSA": [59.5, 65.42],
        "SPT": [18.25, 20.5],
        "APT": [702, 816],
        "Kết hợp": [24.50, 26.50]
    },
    {
        "Khoảng": "Khoảng 5",
        "THPT": [19, 20.50],
        "Tài năng": None,
        "SAT": None,
        "ACT": None,
        "HSA": [75, 82],
        "TSA": [50, 59.5],
        "SPT": [15, 18.25],
        "APT": [600, 702],
        "Kết hợp": [22.50, 24.50]
    }
]

def quy_doi(x, a, b, c, d):
    if a == b:
        raise ZeroDivisionError("Biên a = b => chia 0 toang, check lại bảng đi!")
    return c + (x - a) * (d - c) / (b - a)

def chuyen_doi(x, pt_goc, pt_dich):
    for khoang in BANG_QUY_DOI:
        bien_goc = khoang.get(pt_goc)
        bien_dich = khoang.get(pt_dich)

        if bien_goc is None or bien_dich is None:
            continue

        a, b = bien_goc
        c, d = bien_dich

        if a <= x <= b:
            y = quy_doi(x, a, b, c, d)
            return {
                "Khoảng": khoang["Khoảng"],
                pt_goc: [a, b],
                pt_dich: [c, d],
                "Điểm gốc": x,
                "Điểm quy đổi": y
            }
    return f"Điểm {x} ngoài tầm bảng quy đổi, ngồi xuống tính lại đi!"

# Ví dụ test:
if __name__ == "__main__":
    ket_qua = chuyen_doi(1100, "Tài năng", "THPT")
    print(json.dumps(ket_qua, indent=4, ensure_ascii=False))
