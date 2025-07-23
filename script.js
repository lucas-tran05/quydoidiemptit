// Dữ liệu bảng quy đổi
const BANG_QUY_DOI = [
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
        "Tài năng": null,
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
        "Tài năng": null,
        "SAT": null,
        "ACT": null,
        "HSA": [75, 82],
        "TSA": [50, 59.5],
        "SPT": [15, 18.25],
        "APT": [600, 702],
        "Kết hợp": [22.50, 24.50]
    }
];

// Lấy elements
const ptGoc = document.getElementById('ptGoc');
const ptDich = document.getElementById('ptDich');
const scoreForm = document.getElementById('scoreForm');
const ketQuaSuccess = document.getElementById('ketQuaSuccess');
const ketQuaError = document.getElementById('ketQuaError');
const ketQuaText = document.getElementById('ketQuaText');
const errorText = document.getElementById('errorText');

// Lấy danh sách phương thức từ bảng quy đổi
const phuongThuc = Object.keys(BANG_QUY_DOI[0]).filter(k => k !== "Khoảng");

// Tạo options cho select
phuongThuc.forEach(pt => {
    // Option cho phương thức gốc
    const option1 = document.createElement('option');
    option1.value = pt;
    option1.textContent = pt;
    ptGoc.appendChild(option1);

    // Option cho phương thức đích
    const option2 = document.createElement('option');
    option2.value = pt;
    option2.textContent = pt;
    ptDich.appendChild(option2);
});

// Hàm quy đổi tuyến tính
function quyDoi(x, a, b, c, d) {
    if (Math.abs(a - b) < 0.0001) {
        throw new Error("Khoảng gốc không hợp lệ (a = b)");
    }
    return c + ((x - a) * (d - c)) / (b - a);
}

// Hàm ẩn tất cả kết quả
function hideAllResults() {
    ketQuaSuccess.classList.remove('show');
    ketQuaError.classList.remove('show');
}

// Hàm hiển thị kết quả thành công
function showSuccess(message) {
    hideAllResults();
    ketQuaText.innerHTML = message;
    ketQuaSuccess.classList.add('show');
}

// Hàm hiển thị lỗi
function showError(message) {
    hideAllResults();
    errorText.innerHTML = message;
    ketQuaError.classList.add('show');
}

// Xử lý form submit
scoreForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const diemGocValue = parseFloat(document.getElementById('diemGoc').value);
    const goc = ptGoc.value;
    const dich = ptDich.value;

    // Kiểm tra input
    if (isNaN(diemGocValue)) {
        showError('Vui lòng nhập điểm gốc hợp lệ!');
        return;
    }

    if (!goc) {
        showError('Vui lòng chọn phương thức gốc!');
        return;
    }

    if (!dich) {
        showError('Vui lòng chọn phương thức đích!');
        return;
    }

    if (goc === dich) {
        showError('Phương thức gốc và đích không thể giống nhau!');
        return;
    }

    let found = false;
    let resultMessage = '';

    try {
        // Tìm khoảng phù hợp
        for (const khoang of BANG_QUY_DOI) {
            const bienGoc = khoang[goc];
            const bienDich = khoang[dich];

            // Kiểm tra xem cả hai phương thức có dữ liệu trong khoảng này không
            if (!Array.isArray(bienGoc) || !Array.isArray(bienDich)) {
                continue;
            }

            const [a, b] = bienGoc;
            const [c, d] = bienDich;

            // Kiểm tra điểm có nằm trong khoảng không
            if (diemGocValue >= a && diemGocValue <= b) {
                const diemQuyDoi = quyDoi(diemGocValue, a, b, c, d);

                resultMessage = `
                            <div class="border rounded-3 p-3 mb-4">
  <h5 class="mb-3">
    <i class="fas fa-layer-group me-2 text-primary"></i>
    <strong>${khoang["Khoảng"]}</strong>
  </h5>

  <div class="d-flex justify-content-between align-items-center mb-2">
    <div>
      <i class="fas fa-arrow-right me-2 text-success"></i>
      <strong>${goc}:</strong>
    </div>
    <span class="fw-bold">${diemGocValue}</span>
  </div>

  <div class="d-flex justify-content-between align-items-center mb-2">
    <div>
      <i class="fas fa-bullseye me-2 text-danger"></i>
      <strong>${dich}:</strong>
    </div>
    <span class="fw-bold">${diemQuyDoi.toFixed(5)}</span>
  </div>

  <p class="text-muted small mb-0">
    <i class="fas fa-ruler-combined me-2"></i>
    Khoảng gốc: [${a} - ${b}] → Khoảng đích: [${c} - ${d}]
  </p>
</div>


                        `;

                found = true;
                break;
            }
        }

        if (found) {
            showSuccess(resultMessage);
        } else {
            showError(`
                        <div class="mb-2">
                            <i class="fas fa-exclamation-circle me-2"></i>
                            Không tìm thấy khoảng phù hợp!
                        </div>
                        <div class="small">
                            Điểm ${diemGocValue} không nằm trong bất kỳ khoảng nào của phương thức <strong>${goc}</strong>
                        </div>
                    `);
        }

    } catch (error) {
        showError(`
                    <div class="mb-2">
                        <i class="fas fa-bug me-2"></i>
                        Lỗi trong quá trình tính toán!
                    </div>
                    <div class="small">
                        ${error.message}
                    </div>
                `);
    }
});

// Animation khi load trang
window.addEventListener('load', function () {
    document.querySelector('.main-container').style.opacity = '0';
    document.querySelector('.main-container').style.transform = 'translateY(30px)';

    setTimeout(() => {
        document.querySelector('.main-container').style.transition = 'all 0.6s ease-out';
        document.querySelector('.main-container').style.opacity = '1';
        document.querySelector('.main-container').style.transform = 'translateY(0)';
    }, 100);
});