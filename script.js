// Dữ liệu bảng quy đổi
const BANG_QUY_DOI = [
    {
        "Khoảng": "Khoảng 1",
        "THPT cơ sở phía Bắc (Thang 30)": [27.25, 30],
        "THPT cơ sở phía Nam (Thang 30)": [27.25, 30],
        "Xét tuyển tài năng (Thang 100)": [85, 100],
        "SAT (Thang 1600)": [1450, 1600],
        "ACT (Thang 36)": [33, 36],
        "HSA (Thang 150)": [105, 150],
        "TSA (Thang 100)": [75.53, 100],
        "SPT (Thang 1200)": [25, 30],
        "APT (Thang 1200)": [959, 1200],
        "Xét tuyển kết hợp (Thang 30)": [28.75, 30]
    },
    {
        "Khoảng": "Khoảng 2",
        "THPT cơ sở phía Bắc (Thang 30)": [25.25, 27.25],
        "THPT cơ sở phía Nam (Thang 30)": [25.25, 27.25],
        "Xét tuyển tài năng (Thang 100)": [80, 85],
        "SAT (Thang 1600)": [1350, 1450],
        "ACT (Thang 36)": [30, 33],
        "HSA (Thang 150)": [97, 105],
        "TSA (Thang 100)": [69.29, 75.53],
        "SPT (Thang 30)": [22.75, 25],
        "APT (Thang 1200)": [887, 959],
        "Xét tuyển kết hợp (Thang 30)": [27.75, 28.75]
    },
    {
        "Khoảng": "Khoảng 3",
        "THPT cơ sở phía Bắc (Thang 30)": [23.50, 25.25],
        "THPT cơ sở phía Nam (Thang 30)": [23.50, 25.25],
        "Xét tuyển tài năng (Thang 100)": [42.50, 80],
        "SAT (Thang 1600)": [1250, 1350],
        "ACT (Thang 36)": [28, 30],
        "HSA (Thang 150)": [91, 97],
        "TSA (Thang 100)": [65.42, 69.29],
        "SPT (Thang 30)": [20.5, 22.75],
        "APT (Thang 1200)": [816, 887],
        "Xét tuyển kết hợp (Thang 30)": [26.50, 27.75]
    },
    {
        "Khoảng": "Khoảng 4",
        "THPT cơ sở phía Bắc (Thang 30)": [20.50, 23.50],
        "THPT cơ sở phía Nam (Thang 30)": [20.50, 23.50],
        "Xét tuyển tài năng (Thang 100)": null,
        "SAT (Thang 1600)": [1130, 1250],
        "ACT (Thang 36)": [25, 28],
        "HSA (Thang 150)": [82, 91],
        "TSA (Thang 100)": [59.5, 65.42],
        "SPT (Thang 30)": [18.25, 20.5],
        "APT (Thang 1200)": [702, 816],
        "Xét tuyển kết hợp (Thang 30)": [24.50, 26.50]
    },
    {
        "Khoảng": "Khoảng 5",
        "THPT cơ sở phía Bắc (Thang 30)": [19, 20.50],      // Miền Bắc: 19-20.5
        "THPT cơ sở phía Nam (Thang 30)": [16, 20.50],      // Miền Nam: 16-20.5
        "Xét tuyển tài năng (Thang 100)": null,
        "SAT (Thang 1600)": null,
        "ACT (Thang 36)": null,
        "HSA (Thang 150)": [75, 82],
        "TSA (Thang 100)": [50, 59.5],
        "SPT (Thang 30)": [15, 18.25],
        "APT (Thang 1200)": [600, 702],
        "Xét tuyển kết hợp (Thang 30)": [22.50, 24.50]
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
            if (!Array.isArray(bienGoc)) {
                continue;
            }

            const [a, b] = bienGoc;

            // Điểm thuộc khoảng gốc này?
            if (diemGocValue >= a && diemGocValue <= b) {
                if (!Array.isArray(bienDich)) {
                    showError(`
            <div class="mb-2">
                <i class="fas fa-exclamation-circle me-2"></i>
                Phương thức đích <strong>${dich}</strong> không có khoảng tương ứng trong ${khoang["Khoảng"]}!
            </div>
        `);
                    return; // Kết thúc luôn
                }

                const [c, d] = bienDich;
                const diemQuyDoi = quyDoi(diemGocValue, a, b, c, d);

                resultMessage = `
                            <div class="border rounded-3 p-4 mb-4">
                            <h5 class="mb-3">
                                <i class="fas fa-layer-group me-2"></i>
                                <strong>${khoang["Khoảng"]}</strong>
                            </h5>

                            <div class="row mb-2 align-items-center">
                            <div class="col-12 col-sm-9 d-flex justify-content-center justify-content-sm-start align-items-center mb-1 mb-sm-0">
                                <strong class="small">${goc}:</strong>
                            </div>
                            <div class="col-12 col-sm-3 text-center text-sm-end">
                                <span class="fw-bold fs-4">${diemGocValue}</span>
                            </div>
                            </div>

                            <div class="row mb-2 align-items-center">
                            <div class="col-12 col-sm-9 d-flex justify-content-center justify-content-sm-start align-items-center mb-1 mb-sm-0">
                                <strong class="small">${dich}:</strong>
                            </div>
                            <div class="col-12 col-sm-3 text-center text-sm-end">
                                <span class="fw-bold fs-4">${diemQuyDoi.toFixed(2)}</span>
                            </div>
                            </div>
                            <p class="small fst-italic mb-0">
                                Biên gốc: [${a} - ${b}] → Biên đích: [${c} - ${d}]
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
                            Điểm ${diemGocValue} không nằm trong bất kỳ khoảng nào cho phương thức <strong>${goc}</strong>
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