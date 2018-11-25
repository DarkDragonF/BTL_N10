function timKiem() { // hàm chạy khi submit form tìm kiếm
    var keysearch = document.getElementById('search-box').value;
        keysearch = keysearch.split('+').join('-');
        keysearch = keysearch.replace('+', '-plus');
    window.open('https://hoangtran0410.github.io/DoAn_Web1/index.html?search=' + keysearch);
    return true;
}

function timKiemTheoTen(list, ten, soluong) {
    var tempList = copyObject(list);
    var result = [];
    ten = ten.split(' ');

    for (var sp of tempList) {
        var correct = true;
        for (var t of ten) {
            if (sp.name.toUpperCase().indexOf(t.toUpperCase()) < 0) {
                correct = false;
                break;
            }
        }
        if (correct) {
            result.push(sp);
        }
    }

    return result;
}

// copy 1 object, do trong js ko có tham biến , tham trị rõ ràng
// nên dùng bản copy để chắc chắn ko ảnh hưởng tới bản chính
function copyObject(o) {
    return JSON.parse(JSON.stringify(o));
}

// ============================== TÀI KHOẢN ============================
function showTaiKhoan(show) {
    var value = (show ? "scale(1, 1)" : "scale(0, 0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}

function setupEventTaiKhoan() {
    var taikhoan = document.getElementsByClassName('taikhoan')[0];
    var list = taikhoan.getElementsByTagName('input');

    // Tạo event listener cho input để tạo hiệu ứng label
    // Gồm 3 event onkeyup, onblur, onfocus được áp dụng cho từng input trong list bên trên
    ['keyup', 'blur', 'focus'].forEach(function (evt) {
        for (var l of list) {
            l.addEventListener(evt, function (e) {
                var label = this.previousElementSibling;
                if (e.type === 'keyup') {
                    if (this.value === '') {
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } else {
                        label.classList.add('active');
                        label.classList.add('highlight');
                    }
                } else if (e.type === 'blur') {
                    if (this.value === '') {
                        label.classList.remove('active');
                        label.classList.remove('highlight');
                    } else {
                        label.classList.remove('highlight');
                    }
                } else if (e.type === 'focus') {

                    if (this.value === '') {
                        label.classList.remove('highlight');
                    } else if (this.value !== '') {
                        label.classList.add('highlight');
                    }
                }
            });
        }
    })

    // Event chuyển tab login-signup
    var tab = document.getElementsByClassName('tab');
    for(var t of tab) {
        var a = t.getElementsByTagName('a')[0];
        a.addEventListener('click', function(e) {
            e.preventDefault(); // tắt event mặc định

            this.parentElement.classList.add('active');
            if(this.parentElement.nextElementSibling) {
                this.parentElement.nextElementSibling.classList.remove('active');
            }
            if(this.parentElement.previousElementSibling) {
                this.parentElement.previousElementSibling.classList.remove('active');
            }

            // href của 2 tab signup và login là #signup và #login -> tiện cho việc getElement dưới đây
            var target = this.href.split('#')[1];
            document.getElementById(target).style.display = 'block';

            var hide = (target=='login'?'signup':'login');
            document.getElementById(hide).style.display = 'none';
        })
    }

    // Đoạn code tại event trên được chuyển về js thuần từ code jquery
    // Code jquery cho phần tài khoản được lưu ở cuối file này
}

function logIn() {
    return true;
}

function signUp() {
    return true;
}

// ==================== Những hàm khác ===================== 

// https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
	var currentFocus;

	inp.addEventListener("keyup", function (e) {
		if (e.keyCode != 13 && e.keyCode != 40 && e.keyCode != 38) { // not Enter,Up,Down arrow
			var a, b, i, val = this.value;

			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) {
				return false;
			}
			currentFocus = -1;

			/*create a DIV element that will contain the items (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");

			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);

			/*for each item in the array...*/
			for (i = 0; i < arr.length; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {

					/*create a DIV element for each matching element:*/
					b = document.createElement("DIV");

					/*make the matching letters bold:*/
					b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
					b.innerHTML += arr[i].name.substr(val.length);

					/*insert a input field that will hold the current array item's value:*/
					b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";

					/*execute a function when someone clicks on the item value (DIV element):*/
					b.addEventListener("click", function (e) {
						/*insert the value for the autocomplete text field:*/
						inp.value = this.getElementsByTagName("input")[0].value;
						inp.focus();

						/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
						closeAllLists();
					});
					a.appendChild(b);
				}
			}
		}

	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/

			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) {
					x[currentFocus].click();
					e.preventDefault();
				}
			}
		}
	});

	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}

	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document, except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

// Thêm từ khóa tìm kiếm
function addTags(nameTag, link) {
	var new_tag = `<a href=` + link + `>` + nameTag + `</a>`;

	// Thêm <a> vừa tạo vào khung tìm kiếm
	var khung_tags = document.getElementsByClassName('tags')[0];
	khung_tags.innerHTML += new_tag;
}

// Thêm topnav vào trang
function addTopNav() {
	document.write(`    
	<div class="top-nav group">
        <section>
            <div class="social-top-nav">
                <a class="fa fa-facebook"></a>
                <a class="fa fa-twitter"></a>
                <a class="fa fa-google"></a>
                <a class="fa fa-youtube"></a>
            </div> <!-- End Social Topnav -->

            <ul class="top-nav-quicklink flexContain">
                <li><a>So sánh sản phẩm</a></li>
                <li>|</li>
                <li><a>Tuyển dụng</a></li>
                <li>|</li>
                <li><a>Giới thiệu</a></li>
                <li>|</li>
                <li><a>Trung tâm bảo hành</a></li>
                <li>|</li>
                <li><a>Liên hệ</a></li>
                <li>|</li>
            </ul> <!-- End Quick link -->
        </section><!-- End Section -->
    </div><!-- End Top Nav  -->`);
}

// Thêm header
function addHeader(isTrangChu) {
	document.write(`        
	<div class="header group">
        <div class="logo">
            <a href="index.html">
                <img src="img/logo.jpg" alt="">
            </a>
        </div> <!-- End Logo -->

        <div class="content">
            <div class="search-header">
                <form class="input-search" method="get" action="/DoAn_Web1/index.html">
                    <div class="autocomplete">
                        <input id="search-box" name="search" autocomplete="off" type="text" placeholder="Nhập từ khóa tìm kiếm...">
                        <button type="submit">
                            <i class="fa fa-search"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </form> <!-- End Form search -->
                <div class="tags">
                    <strong>Từ khóa: </strong>
                </div>
            </div> <!-- End Search header -->

            <div class="tools-member">
                <div class="member">
                    <a onclick="showTaiKhoan(true)">
                        <i class="fa fa-user"></i>
                        Tài khoản
                    </a>

                </div> <!-- End Member -->

                <div class="cart">
                    <a>
                        <i class="fa fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                        <span class="cart-number">0</span>
                    </a>
                </div> <!-- End Cart -->

                <div class="check-order">
                    <a>
                        <i class="fa fa-truck"></i>
                        <span>Đơn hàng</span>
                    </a>
                </div> <!-- End Check Order -->
            </div><!-- End Tools Member -->
        </div> <!-- End Content -->
    </div> <!-- End Header -->`)
}

// Thêm contain Taikhoan
function addContainTaiKhoan() {
	document.write(`
	<div class="containTaikhoan">
        <span class="close" onclick="showTaiKhoan(false);">&times;</span>
        <div class="taikhoan">

            <ul class="tab-group">
                <li class="tab active"><a href="#login">Đăng nhập</a></li>
                <li class="tab"><a href="#signup">Đăng kí</a></li>
            </ul> <!-- /tab group -->

            <div class="tab-content">
                <div id="login">
                    <h1>Chào mừng bạn trở lại!</h1>

                    <form action="/" method="post" onsubmit="return logIn();">

                        <div class="field-wrap">
                            <label>
                                Tên đăng nhập<span class="req">*</span>
                            </label>
                            <input type="text" required autocomplete="off" />
                        </div> <!-- /user name -->

                        <div class="field-wrap">
                            <label>
                                Mật khẩu<span class="req">*</span>
                            </label>
                            <input type="password" required autocomplete="off" />
                        </div> <!-- pass -->

                        <p class="forgot"><a href="#">Quên mật khẩu?</a></p>

                        <button type="submit" class="button button-block" />Tiếp tục</button>

                    </form> <!-- /form -->

                </div> <!-- /log in -->

                <div id="signup">
                    <h1>Đăng kí miễn phí</h1>

                    <form action="/" method="post" onsubmit="return signUp();">

                        <div class="top-row">
                            <div class="field-wrap">
                                <label>
                                    Họ<span class="req">*</span>
                                </label>
                                <input type="text" required autocomplete="off" />
                            </div>

                            <div class="field-wrap">
                                <label>
                                    Tên<span class="req">*</span>
                                </label>
                                <input type="text" required autocomplete="off" />
                            </div>
                        </div> <!-- / ho ten -->

                        <div class="field-wrap">
                            <label>
                                Địa chỉ Email<span class="req">*</span>
                            </label>
                            <input type="email" required autocomplete="off" />
                        </div> <!-- /email -->

                        <div class="field-wrap">
                            <label>
                                Tên đăng nhập<span class="req">*</span>
                            </label>
                            <input type="email" required autocomplete="off" />
                        </div> <!-- /user name -->

                        <div class="field-wrap">
                            <label>
                                Mật khẩu<span class="req">*</span>
                            </label>
                            <input type="password" required autocomplete="off" />
                        </div> <!-- /pass -->

                        <button type="submit" class="button button-block" />Tạo tài khoản</button>

                    </form> <!-- /form -->

                </div> <!-- /sign up -->
            </div><!-- tab-content -->

        </div> <!-- /taikhoan -->
    </div>`);
}

// Thêm plc (phần giới thiệu trước footer)
function addPlc() {
	document.write(`
    <div class="plc">
        <section>
            <ul class="flexContain">
                <li>Giao hàng hỏa tốc trong 1 giờ</li>
                <li>Thanh toán linh hoạt: tiền mặt, visa / master, trả góp</li>
                <li>Trải nghiệm sản phẩm tại nhà</li>
                <li>Lỗi đổi tại nhà trong 1 ngày</li>
                <li>Hỗ trợ suốt thời gian sử dụng.
                    <br>Hotline:
                    <a href="tel:12345678" style="color: #288ad6;">1234.5678</a>
                </li>
            </ul>
        </section>
    </div>`);
}

function checkLocalStorage() {
	if (typeof (Storage) == "undefined") {
		alert('Máy tính không hỗ trợ LocalStorage. Không thể lưu thông tin sản phẩm, khách hàng!!');
	} else {
		console.log('LocaStorage OKE!');
	}
}

// Di chuyển lên đầu trang
function gotoTop() {
	jQuery('html,body').animate({
		scrollTop: 0
	}, 300);
	// document.getElementsByClassName('top-nav')[0].scrollIntoView({
	// 	behavior: 'smooth',
	// 	block: 'start'
	// });
	// document.body.scrollTop = 0; // For Safari
	// document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


















// Test, not finished
function auto_Get_Database() {
	var ul = document.getElementsByClassName('homeproduct')[0];
	var li = ul.getElementsByTagName('li');
	for (var l of li) {
		var a = l.getElementsByTagName('a')[0];
		// name
		var name = a.getElementsByTagName('h3')[0].innerHTML;

		// price
		var price = a.getElementsByClassName('price')[0]
		price = price.getElementsByTagName('strong')[0].innerHTML;

		// img
		var img = a.getElementsByTagName('img')[0].src;
		console.log(img);

		// // rating
		// var rating = a.getElementsByClassName('ratingresult')[0];
		// var star = rating.getElementsByClassName('icontgdd-ystar').length;
		// var rateCount = parseInt(rating.getElementsByTagName('span')[0].innerHTML);

		// // promo
		// var tragop = a.getElementsByClassName('installment');
		// if(tragop.length) {

		// }

		// var giamgia = a.getElementsByClassName('discount').length;
		// var giareonline = a.getElementsByClassName('shockprice').length;
	}
}

function getThongTinSanPhamFrom_TheGioiDiDong() {
	javascript: (function () {
		var s = document.createElement('script');
		s.innerHTML = `
			(function () {
				var ul = document.getElementsByClassName('parameter')[0];
				var li_s = ul.getElementsByTagName('li');
				var result = {};
				result.detail = {};
	
				for (var li of li_s) {
					var loai = li.getElementsByTagName('span')[0].innerText;
					var giatri = li.getElementsByTagName('div')[0].innerText;
	
					switch (loai) {
						case "Màn hình:":
							result.detail.screen = giatri.replace('"', "'");
							break;
						case "Hệ điều hành:":
							result.detail.os = giatri;
							break;
						case "Camera sau:":
							result.detail.camara = giatri;
							break;
						case "Camera trước:":
							result.detail.camaraFront = giatri;
							break;
						case "CPU:":
							result.detail.cpu = giatri;
							break;
						case "RAM:":
							result.detail.ram = giatri;
							break;
						case "Bộ nhớ trong:":
							result.detail.rom = giatri;
							break;
						case "Thẻ nhớ:":
							result.detail.microUSB = giatri;
							break;
						case "Dung lượng pin:":
							result.detail.battery = giatri;
							break;
					}
				}
	
				console.log(JSON.stringify(result, null, "\t"));
			})();`;
		document.body.appendChild(s);
	})();
}

 // $('.taikhoan').find('input').on('keyup blur focus', function (e) {

    //     var $this = $(this),
    //         label = $this.prev('label');

    //     if (e.type === 'keyup') {
    //         if ($this.val() === '') {
    //             label.removeClass('active highlight');
    //         } else {
    //             label.addClass('active highlight');
    //         }
    //     } else if (e.type === 'blur') {
    //         if ($this.val() === '') {
    //             label.removeClass('active highlight');
    //         } else {
    //             label.removeClass('highlight');
    //         }
    //     } else if (e.type === 'focus') {

    //         if ($this.val() === '') {
    //             label.removeClass('highlight');
    //         } else if ($this.val() !== '') {
    //             label.addClass('highlight');
    //         }
    //     }

    // });

    // $('.tab a').on('click', function (e) {

    //     e.preventDefault();

    //     $(this).parent().addClass('active');
    //     $(this).parent().siblings().removeClass('active');

    //     target = $(this).attr('href');

    //     $('.tab-content > div').not(target).hide();

    //     $(target).fadeIn(600);

    // });