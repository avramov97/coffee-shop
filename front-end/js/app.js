let k = window.location.href;
let loggedIn = false;
let hiddenFlag = true;

let constants = {
    serviceUrl: "http://127.0.0.1:8000"
};

function loginMain() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: constants.serviceUrl + '/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    }).done((data, status, request) => {
        let authToken = data.split('Bearer ')[1];
        app.authorizationService.saveCredentials(authToken);
        loadNavbar();
        loggedIn = true;
        window.location.href = '#/';
    }).fail((err) => {
        if (err.status == 401 || err.status == 403) {
            document.getElementById("error_login").hidden = false;
        }
    });
}

function login() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: constants.serviceUrl + '/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    }).done((data, status, request) => {
        let authToken = data.split('Bearer ')[1];
        app.authorizationService.saveCredentials(authToken);
        loadNavbar();
    }).fail((err) => {
        if(err.status == 401 || err.status == 403) {
            document.getElementById("error_login").hidden = false;
        }
    });
}

function loginAndAddToCart(elem, inputQuantity) {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: constants.serviceUrl + '/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "username": username,
            "password": password
        })
    }).done((data, status, request) => {
        let authToken = data.split('Bearer ')[1];
        app.authorizationService.saveCredentials(authToken);
        loadNavbar();
        $("#login-modal").modal('hide');

        $.ajax({
            type: 'POST',
            url: constants.serviceUrl + '/save-order',
            headers: {
                'Content-Type': 'application/json',
                //  'Authorization': app.authorizationService.getCredentials()
            },
            data: JSON.stringify({
                "coffee": elem,
                "username": app.authorizationService.getUsername(),
                "quantity": 1
            })
        }).done((data, request) => {

            loadCartSizeForUser();
            $("#cart-success").modal();
            $(document).bind('keydown', function (e) {
                if (e.which == 27) {
                    $("#cart-success").modal('hide');
                }
            });
        }).fail((err) => {
            console.log(err);
            document.getElementById("error_register").hidden = false;
        });

    }).fail((err) => {
        if (err.status == 401 || err.status == 403) {
            document.getElementById("error_login").hidden = false;
        }
    });
}

function loadCartSizeForModerator() {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/cart-size?username=' + app.authorizationService.getUsername(),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done((data, request) => {
        loadOrdersSize();
        $("#cart-size").text(data);
    }).fail((err) => {
        console.log(err);
        alert(err.responseText);
        document.getElementById("error_register").hidden = false;
    });
}

function loadCartSizeForUser() {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/cart-size?username=' + app.authorizationService.getUsername(),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done((data, request) => {
        $("#cart-size").text(data);
        // alert($("#cart-size").text());
    }).fail((err) => {
        console.log(err);
        alert(err.responseText);
        document.getElementById("error_register").hidden = false;
    });
}

function loadOrdersSize() {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/waiting-size?username=' + app.authorizationService.getUsername(),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done((data, request) => {
        $("#waiting-size").text(data);
    }).fail((err) => {
        console.log(err);
        alert(err.responseText);
        document.getElementById("error_register").hidden = false;
    });

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/delivered-size?username=' + app.authorizationService.getUsername(),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done((data, request) => {
        $("#delivered-size").text(data);
    }).fail((err) => {
        console.log(err);
        alert(err.responseText);
        document.getElementById("error_register").hidden = false;
    });
}

function loadNavbar() {
    let username = app.authorizationService.getUsername();
    if (app.authorizationService.getRole() === 'ROOT-ADMIN') {
        app.templateLoader.loadTemplate('.navbar-holder', 'navbar-root-admin');
        loadCartSizeForModerator();
    } else if (app.authorizationService.getRole() === 'ADMIN') {
        app.templateLoader.loadTemplate('.navbar-holder', 'navbar-admin');
        loadCartSizeForModerator();
    } else if (app.authorizationService.getRole() === 'MODERATOR') {
        app.templateLoader.loadTemplate('.navbar-holder', 'navbar-moderator');
        loadCartSizeForModerator();
    } else if (app.authorizationService.getRole() === 'ROLE_USER') {
        app.templateLoader.loadTemplate('.navbar-holder', 'navbar-user');
        loadCartSizeForUser();
    } else {
        app.templateLoader.loadTemplate('.navbar-holder', 'navbar-guest');
    }
}

app.router.on('#/coffees/product', ['id'], function (id) {
    // loadNavbar();
    $.ajax({
            type: 'GET',
            url: constants.serviceUrl + '/coffees/product?id=' + id,
            headers: {
                'Content-Type': 'application/json',
            }
        }).done((data) => {
            app.templateLoader.loadTemplate('.app', 'coffee', function () {
            let auth = app.authorizationService.getRole();
            let saving = data['oldPrice'] - data['newPrice'];
            let fullSize = '';
            let options = '<option value="">Избери величина</option>';
            let avgRating = data['ratingSum'] / data['timesRated'];
            $("#coffee-name").html('<b>' + data['name'] + '</b>');
            $("#modal-img").attr("src", data['img1']);
            $("#span-modal-img").zoom();
            $("#gallery").html(
                '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                        '<img' +
                            ' src="' + data['img1'] + '"' +
                            ' data-mdb-img="' + data['img1'] + '"' +
                            ' alt="Image 1"' +
                            ' onclick=changeImage("' + data['img1'] + '")' +
                            ' class="active w-100"' +
                        '/>' +
                    '</a>' +
                '</div>' +

                '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                        '<img' +
                        ' src="' + data['img2'] + '"' +
                        ' data-mdb-img="' + data['img2'] + '"' +
                        ' alt="Image 2"' +
                        ' onclick=changeImage("' + data['img2'] + '")' +
                        ' class="active w-100"' +
                        '/>' +
                    '</a>' +
                '</div>' +

                '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                        '<img' +
                        ' src="' + data['img3'] + '"' +
                        ' data-mdb-img="' + data['img3'] + '"' +
                        ' alt="Image 3"' +
                        ' onclick=changeImage("' + data['img3'] + '")' +
                        ' class="active w-100"' +
                        '/>' +
                    '</a>' +
                '</div>' +

                '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                        '<img' +
                        ' src="' + data['img4'] + '"' +
                        ' data-mdb-img="' + data['img4'] + '"' +
                        ' alt="Image 4"' +
                        ' onclick=changeImage("' + data['img4'] + '")' +
                        ' class="active w-100"' +
                        '/>' +
                    '</a>' +
                '</div>'
            );

            $("#rating-system").html
            (           '<p class="mt-2 ml-2" id="avg-rating-modal"><b>' + avgRating.toFixed(2) + '</b> (' + data['timesRated'] + ' гласа)' + '</p>'
                +       '<input type="radio" name="rating" value="5" id="five-star"><label for="five-star">☆</label>'
                +       '<input type="radio" name="rating" value="4" id="four-star"><label for="four-star">☆</label>'
                +       '<input type="radio" name="rating" value="3" id="three-star"><label for="three-star">☆</label>'
                +       '<input type="radio" name="rating" value="2" id="two-star"><label for="two-star">☆</label>'
                +       '<input type="radio" name="rating" value="1" id="one-star"><label for="one-star">☆</label>'
            );
            $("#order-col").html
            (
                '<form class="needs-validation" novalidate>'
                +       '<div class="input-group form-group">'
                +           '<div class="input-group-prepend">'
                +               '<span class="input-group-text"><i class="fas fa-user-tie"></i></span>'
                +           '</div>'
                +           '<input id="name" type="text" class="form-control rounded-right" placeholder="Име и презиме" minlength="5" maxlength="100" required>'
                +           '<div class="invalid-feedback">'
                +               'Името и презимето треба да е над 5 букви'
                +           '</div>'
                +       '</div>'
                +       '<div class="input-group form-group">'
                +           '<div class="input-group-prepend">'
                +               '<span class="input-group-text"><i class="fas fa-phone-alt"></i></span>'
                +           '</div>'
                +           '<input id="mobile-num" type="tel" class="form-control rounded-right" placeholder="Мобилен број" minlength="5" maxlength="100" required>'
                +           '<div class="invalid-feedback">'
                +               'Мобилниот број треба да е над 5 бројки'
                +           '</div>'
                +       '</div>'
                +       '<div class="input-group form-group">'
                +           '<div class="input-group-prepend">'
                +               '<span class="input-group-text"><i class="fas fa-city"></i></span>'
                +           '</div>'
                +           '<input id="city" type="text" class="form-control rounded-right" placeholder="Град" minlength="3" maxlength="100" required>'
                +           '<div class="invalid-feedback">'
                +               'Името на град треба да е над 3 букви'
                +           '</div>'
                +       '</div>'
                +       '<div class="input-group form-group">'
                +           '<div class="input-group-prepend">'
                +               '<span class="input-group-text"><i class="fas fa-map-marked-alt"></i></span>'
                +          '</div>'
                +           '<input id="address" type="text" class="form-control rounded-right" placeholder="Адреса" minlength="3" maxlength="100" required>'
                +           '<div class="invalid-feedback">'
                +              'Адресата треба да е над 3 букви'
                +           '</div>'
                +       '</div>'
                +       '<div class="input-group form-group">'
                +           '<div class="input-group-prepend">'
                +               '<span class="input-group-text"><i class="fas fa-envelope"></i></span>'
                +           '</div>'
                +           '<input id="mail" type="email" class="form-control rounded-right" placeholder="Е-маил" maxlength="100" required>'
                +           '<div class="invalid-feedback">'
                +               'Воведете валиден меил'
                +           '</div>'
                +       '</div>'
                +       '<div class="input-group form-group">'
                +              '<div class="col-xs-12 col-sm-6 col-md-6" style="padding-left: 0px; padding-right: 7px;">'
                +               '<div class="frb frb-warning">'
                +                 '<div class="frb frb-default">'
                +                   '<input type="radio" id="radio-button-0" name="radio-button" value="0" checked>'
                +                   '<label for="radio-button-0">'
                +                       '<span class="frb-title">Наложен платеж<i class="far fa-money-bill-alt ml-2" style="font-size: 1rem"></i></span>'
                +                   '</label>'
                +                 '</div>'
                +               '</div>'
                +              '</div>'
                +             '<div class="col-xs-12 col-sm-6 col-md-6" style="padding-left: 0px; padding-right: 0px;">'
                +               '<div class="frb frb-warning">'
                +                  '<div class="frb frb-default">'
                +                     '<input type="radio" id="radio-button-1" name="radio-button" value="1">'
                +                     '<label for="radio-button-1">'
                +                       '<span class="frb-title">Банкова карта<i class="fab fa-cc-visa ml-2" style="font-size: 1rem"></i></span>'
                +                     '</label>'
                +               '</div>'
                +              '</div>'
                +           '</div>'
                +        '</div>'
                +       '<div class="input-group form-group">'
                +           '<div class="row">'
                +               '<div class="col-4"></div>'
                +               '<span class="col-2 input-group-btn">'
                +                   '<button type="button" class="quantity-left-minus btn btn-outline-danger btn-number" data-type="minus" data-field="">'
                +                       '<i class="fas fa-minus"></i>'
                +                   '</button>'
                +               '</span>'
                +               '<input type="text" id="quantity" name="quantity" class="col-2 form-control input-number rounded" style="text-align: center" value="1" min="1" max="100">'
                +               '<div class="invalid-feedback">'
                +                   'Воведете валиден број на паковки'
                +               '</div>'
                +               '<span class="col-2 input-group-btn">'
                +                   '<button type="button" class="quantity-right-plus btn btn-outline-success btn-number" data-type="plus" data-field="">'
                +                       '<i class="fas fa-plus"></i>'
                +                   '</button>'
                +               '</span>'
                +           '</div>'
                +       '</div>'
                +       '<button type="click" id="submit-button" class="btn btn-success btn-block">Порачај</button>'
                +   '</form>'
            );

           let maxAvailable = data['rAvailability'];
            $('#quantity').keyup(function() {
                if (parseInt(this.value) > maxAvailable) {
                    this.value = maxAvailable;
                    return false;
                } else if (parseInt(this.value) == 0) {
                    this.value = 1;
                    return false;
                }
            });

            $('.quantity-right-plus').click(function(e) {
                e.preventDefault();
                var currentQuantity = parseInt($('#quantity').val());
                if (currentQuantity < maxAvailable) {
                    $('#quantity').val(currentQuantity + 1);
                }
            });

            $('.quantity-left-minus').click(function(e) {
                e.preventDefault();
                var currentQuantity = parseInt($('#quantity').val());
                if (currentQuantity > 1) {
                    $('#quantity').val(currentQuantity - 1);
                }
            });

            $("#intro-coffee-name").text(data['name']);
            $("#add-to-cart").html('<button id="add-to-cart-button" class="btn btn-dark btn-block">Добави в количката</button>');
            $("#old-price").text(data['oldPrice'] + 'лв.');
            $("#new-price").html('<b>' + data['newPrice'] + 'лв.</b>');
            $("#saving").text('Вие спестявате ' + saving.toFixed(2) + ' лв.');
            $("#lead").text(data['description']);
            $('#select-size').html(options);

            (function() {
                'use strict';
                var forms = document.getElementsByClassName('needs-validation');
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                        } else if (data['rAvailability'] <= 0) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                            $("#order-error-modal").modal();
                            $(document).bind('keydown', function(e) {
                                if (e.which == 27) {
                                    $("#order-error-modal").modal('hide');
                                }
                            });
                        } else if ($("#radio-button-1").is(':checked')) {
                            event.preventDefault();
                            event.stopPropagation();

                            $('#payment-modal').modal();
                            $("#example-3").removeClass("submitted");

                            (function() {
                                'use strict';
                                var forms = document.getElementsByClassName('payment-form');
                                var validation = Array.prototype.filter.call(forms, function(form) {
                                    var error = form.querySelector('#error-payment');

                                    form.addEventListener('submit', function(event2) {
                                        if (form.checkValidity() === false) {
                                            event2.preventDefault();
                                            event2.stopPropagation();
                                        } else if (error.classList.contains('visible')) {
                                            event2.preventDefault();
                                            event2.stopPropagation();
                                        } else {
                                            event2.preventDefault();
                                            event2.stopPropagation();

                                            $('#error-payment-message').text("");
                                            $("#order-error-modal").modal('hide');

                                            var formData = new FormData($('.payment-form')[0]);
                                            let inputName = $('#name').val();
                                            let inputCity = $('#city').val();
                                            let inputAddress = $('#address').val();
                                            let inputMobileNum = $('#mobile-num').val();
                                            let inputMail = $('#mail').val();
                                            let inputQuantity = $('#quantity').val();

                                            $.ajax({
                                                type: 'POST',
                                                url: constants.serviceUrl + '/orders/add',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': app.authorizationService.getCredentials()
                                                },
                                                data: JSON.stringify({
                                                    "name": inputName,
                                                    "number": inputMobileNum,
                                                    "city": inputCity,
                                                    "address": inputAddress,
                                                    "email": inputMail,
                                                    "quantity": inputQuantity,
                                                    "done": false,
                                                    "coffee": data
                                                })
                                            }).done((data, request) => {
                                                let waitingSize = parseInt($("#waiting-size").text());
                                                $("#waiting-size").text(waitingSize+1);
                                                $(document).bind('keydown', function(e) {
                                                    if (e.which == 27) {
                                                        $("#order-success-modal").modal('hide');
                                                    }
                                                });
                                            }).fail((err) => {
                                                console.log(err);
                                                alert(err.responseText);
                                            });
                                            form.classList.remove('was-validated');
                                        }
                                    }, false);
                                });
                            })();
                        } else {
                            event.preventDefault();
                            event.stopPropagation();

                            var formData = new FormData($('.needs-validation')[0]);
                            let inputName = $('#name').val();
                            let inputCity = $('#city').val();
                            let inputAddress = $('#address').val();
                            let inputMobileNum = $('#mobile-num').val();
                            let inputMail = $('#mail').val();
                            let inputQuantity = $('#quantity').val();

                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/orders/add',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': app.authorizationService.getCredentials()
                                },
                                data: JSON.stringify({
                                    "name": inputName,
                                    "number": inputMobileNum,
                                    "city": inputCity,
                                    "address": inputAddress,
                                    "email": inputMail,
                                    "quantity": inputQuantity,
                                    "done": false,
                                    "coffee": data
                                })
                            }).done((data, request) => {
                                // let availablePackages = $('#' + tempAviability).val() - inputQuantity;
                                // $('#' + tempAviability).text(availablePackages);
                                let waitingSize = parseInt($("#waiting-size").text());
                                $("#waiting-size").text(waitingSize+1);
                                $("#order-success-modal").modal();
                                $(document).bind('keydown', function(e) {
                                    if (e.which == 27) {
                                        $("#order-success-modal").modal('hide');
                                    }
                                });
                            }).fail((err) => {
                                console.log(err);
                                alert(err.responseText);
                            });
                            form.classList.remove('was-validated');
                        }
                    }, false);
                });
            })();

            $('#one-star').click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": data['id'],
                        "rating": 1
                    })
                }).done((result) =>
                {
                    data['timesRated']++;
                    $('#avg-rating-modal').html('<b>' + result + '</b> (' + data['timesRated'] + ' гласа)');

                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#two-star').click(function()
            {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": data['id'],
                        "rating": 2
                    })
                }).done((result) =>
                {
                    data['timesRated']++;
                    $('#avg-rating-modal').html('<b>' + result + '</b> (' + data['timesRated'] + ' гласа)');
                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#three-star').click(function()
            {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": data['id'],
                        "rating": 3
                    })
                }).done((result) =>
                {
                    data['timesRated']++;
                    $('#avg-rating-modal').html('<b>' + result + '</b> (' + data['timesRated'] + ' гласа)');
                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403)
                    {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#four-star').click(function()
            {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": data['id'],
                        "rating": 4
                    })
                }).done((result) =>
                {
                    data['timesRated']++;
                    $('#avg-rating-modal').html('<b>' + result + '</b> (' + data['timesRated'] + ' гласа)');
                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#five-star').click(function()
            {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": data['id'],
                        "rating": 5
                    })
                }).done((result) =>
                {
                    data['timesRated']++;
                    $('#avg-rating-modal').html('<b>' + result + '</b> (' + data['timesRated'] + ' гласа)');
                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#add-to-cart-button').click(function() {
                if(auth === "ROLE_USER" || auth === "MODERATOR" || auth === "ADMIN" || auth === "ROOT-ADMIN") {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/save-order',
                        headers: {
                            'Content-Type': 'application/json',
                            //  'Authorization': app.authorizationService.getCredentials()
                        },
                        data: JSON.stringify({
                            "coffee": data,
                            "username": app.authorizationService.getUsername(),
                            "quantity": 1
                        })
                    }).done((data, request) =>
                    {
                        let cartSize = parseInt($("#cart-size").text());
                        $("#cart-size").text(cartSize+1);
                        $("#cart-success").modal();
                        $(document).bind('keydown', function(e)
                        {
                            if (e.which == 27)
                            {
                                $("#cart-success").modal('hide');
                            }
                        });
                    }).fail((err) =>
                    {
                        alert("Failed saving order. Please try again later");
                        console.log(err);
                        alert(err.responseText);
                        document.getElementById("error_register").hidden = false;
                    });
                } else {
                    $('#login-modal').modal();
                    $(document).bind('keydown', function(e) {
                        if (e.which == 27) {
                            $("#login-modal").modal('hide');
                        }
                    });

                    $('#sign-up-link').click(function ()
                    {
                        $('#login-modal').modal('hide');
                        // $('#order-modal').modal('hide');
                        setTimeout(function(){ app.router.reload('#/users/register'); }, 150);
                    });

                    let inputQuantity = $('#quantity').val();
                    $('#login-user').click(function () {
                        loginAndAddToCart(data, inputQuantity);
                    });
                }
            });

            $.ajax({
                type: 'GET',
                url: constants.serviceUrl + '/comments?coffeeId=' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': app.authorizationService.getCredentials()
                }}).done((data) => {
                    if (data.length > 0) {
                        $('#comments-size').text('Comments: ' + data.length);
                    } else if (!auth && data.length === 0) {
                        $("#comments").remove();
                    }
                    for (let elem of data) {
                        let date = new Date(elem['date']);
                        let like = elem['id'] + 'button';
                        let likes = elem['id'];
                        let profilePictureUrl = "https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png";
                        $('#comments-section').append(
                            '<div class="media">'
                            + '<img class="pull-left media-object" src="' + profilePictureUrl + '" alt="https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png">'
                            + '<div class="media-body">'
                            + '<h4 class="media-heading">' + elem['user']['username'] + '</h4>'
                            + '<p>' + elem['text'] + '</p>'
                            + '<ul class="list-unstyled list-inline media-detail pull-left" style="display: flex;">'
                            + '<li><i class="fa fa-calendar"></i>' + date.toLocaleDateString() + '</li>'
                            + '<li>'
                            +   '<button class="border-0" style="background-color: white"><i id="' + like + '" class="fa fa-thumbs-up"></i></button>'
                            +   '<label id="' + likes + '" for="' + like + '">' + elem['likes'] + '</label>'
                            + '</li>'
                            + '</ul>'
                            + '<ul class="list-unstyled list-inline media-detail pull-right" style="display: flex;">'
                            // + '<li class=""><button id="' + like + '" class="btn-outline-primary" type="button">Like</button></li>'
                            + '</ul>'
                            + '</div>'
                            + '</div>'
                        );

                        if (!auth) {
                            // $('.add-comment-form').hide();
                            $('#' + like).prop( "disabled", true);
                        }

                        if (elem['likedByCurrentUser'] == true) {
                            $('#' + like).css('color', 'blue');
                        }

                        $('#' + like).click(function() {
                            if (auth) {
                                $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/comments/like?commentId=' + elem['id'],
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': app.authorizationService.getCredentials()
                                }
                            }).done((result) => {
                                if (result == true) {
                                    elem['likes']++;
                                    $('#' + like).css('color', 'blue');
                                } else {
                                    elem['likes']--;
                                    $('#' + like).css('color', '#666666');
                                }
                                $('#' + likes).text(elem['likes']);
                            }).fail((err) => {
                                console.log(err);
                                if (err.status == 401 || err.status == 403) {
                                    document.getElementById("error_login").hidden = false;
                                }
                            });
                            }
                        });
                    }

                    (function() {
                        'use strict';
                        var forms = document.getElementsByClassName('add-comment-form');
                        var validation = Array.prototype.filter.call(forms, function(form) {
                            form.addEventListener('submit', function(event) {
                                if (form.checkValidity() === false) {
                                    form.classList.add('was-validated');
                                    event.preventDefault();
                                    event.stopPropagation();
                                } else {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    var formData = new FormData($('.needs-validation')[0]);

                                    let text = $('#text').val();
                                    let username = app.authorizationService.getUsername();
                                    let today = new Date();

                                    $.ajax({
                                        type: 'POST',
                                        url: constants.serviceUrl + '/comments/add',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': app.authorizationService.getCredentials()
                                        },
                                        data: JSON.stringify({
                                            "text": text,
                                            "date": today,
                                            "likes": 0,
                                            "username": username,
                                            "coffeeId": id
                                        })
                                    }).done((data) => {
                                        $('#text').val('');
                                        // alert('#/coffees/product?id=' + id);
                                        $.ajax({
                                            type: 'GET',
                                            url: constants.serviceUrl + '/users/profile-picture?username=' + app.authorizationService.getUsername(),
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': app.authorizationService.getCredentials()
                                            }
                                        }).done((data) => {
                                            $('#comments-section').append(
                                                '<div class="media">'
                                                +  '<img class="pull-left media-object" src="https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png" alt="https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png">'
                                                + '<div class="media-body">'
                                                + '<h4 class="media-heading">' + app.authorizationService.getUsername() + '</h4>'
                                                + '<p>' + text +'</p>'
                                                + '<ul class="list-unstyled list-inline media-detail pull-left" style="display: flex;">'
                                                + '<li><i class="fa fa-calendar"></i>' + today.toLocaleDateString() + '</li>'
                                                + '<li><i class="fa fa-thumbs-up"></i>0</li>'
                                                + '</ul>'
                                                + '</div>'
                                                + '</div>'
                                            );
                                        }).fail((err) => {
                                            console.log(err);
                                            $('#comments-section').append(
                                                '<div class="media">'
                                                +  '<img class="pull-left media-object" src="https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png" alt ="https://medilab-bg.com/wp-content/uploads/2016/07/blank-profile-picture.png">'
                                                + '<div class="media-body">'
                                                + '<h4 class="media-heading">' + app.authorizationService.getUsername() + '</h4>'
                                                + '<p>' + text +'</p>'
                                                + '<ul class="list-unstyled list-inline media-detail pull-left" style="display: flex;">'
                                                + '<li><i class="fa fa-calendar"></i>' + today.toLocaleDateString() + '</li>'
                                                + '<li><i class="fa fa-thumbs-up"></i>0</li>'
                                                + '</ul>'
                                                + '</div>'
                                                + '</div>'
                                            );
                                        });
                                    }).fail((err) => {
                                        console.log(err);
                                        alert(err.responseText);
                                    });
                                    form.classList.remove('was-validated');
                                }
                            }, false);
                        });
                    })();
            }).fail((err) => {
                alert('Error while loading the comments');
                console.log(err.responseText);
            });

            if (!auth) {
                $('.add-comment-form').hide();
            }
        });

        }).fail((err) =>
        {
        alert('Error');
        console.log(err.responseText);
    });
});

app.router.on('#/', null, function () {
    if(!loggedIn) {
        loadNavbar();
    }

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        allCoffees(data, "");
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on('#/filter-type', ['type'], function (type) {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/filter-type/?type=' + type,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        allCoffees(data, type);
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on('#/filter-brand', ['brand'], function (brand) {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/filter-brand/?brand=' + brand,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        allCoffees(data, brand);
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on("#/users/all", null, function () {

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/users/all',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        app.templateLoader.loadTemplate('.app', 'users-all', function () {
            let loggedUsername = app.authorizationService.getUsername();

            let i = 1;
            for (let elem of data) {

                var formatDateBirth = new Date(elem['birthDate']).toLocaleDateString();

                if (elem['role'] === 'ROOT-ADMIN') {
                    $('.all-users')
                        .append('<tr>'
                            // + '<td class="id" style="display:none;">' + elem['id'] + '</td>'
                            + '<td class="first-name">' + elem['firstName'] + '</td>'
                            + '<td class="last-name">' + elem['lastName'] + '</td>'
                            + '<td class="username">' + elem['username'] + '</td>'
                            + '<td class="email">' + elem['email'] + '</td>'
                            + '<td class="date-birth">' + formatDateBirth + '</td>'
                            + '<td class="text-center">'
                            + '<div class="d-flex justify-content-center">'
                            + '<button type="button" class="edit-btn btn" disabled>'
                            + '<i class="fa fa-edit"></i>'
                            + '</button>'
                            + '<button type="button" class="delete-btn btn" disabled>'
                            + '<i class="fas fa-trash-alt"></i>'
                            + '</button>'
                            + '</div>'
                            + '</td>'
                            + '</tr>');
                } else {
                    $('.all-users')
                        .append('<tr>'
                            // + '<td class="id" style="display:none;">' + elem['id'] + '</td>'
                            + '<td class="first-name">' + elem['firstName'] + '</td>'
                            + '<td class="last-name">' + elem['lastName'] + '</td>'
                            + '<td class="username">' + elem['username'] + '</td>'
                            + '<td class="email">' + elem['email'] + '</td>'
                            + '<td class="date-birth">' + formatDateBirth + '</td>'
                            + '<td class="text-center">'
                            + '<div class="d-flex justify-content-center">'
                            + '<button type="button" class="edit-btn btn">'
                            + '<i class="fa fa-edit"></i>'
                            + '</button>'
                            + '<button type="button" class="delete-btn btn">'
                            + '<i class="fas fa-trash-alt"></i>'
                            + '</button>'
                            + '</div>'
                            + '</td>'
                            + '</tr>');
                }

                i++;
            }

            if (app.authorizationService.getRole() === 'ROLE_USER') {
                $( ".edit-btn" ).prop( "disabled", true );
                $( ".delete-btn" ).prop( "disabled", true );
            } else if (app.authorizationService.getRole() === 'MODERATOR') {
                $( ".delete-btn" ).prop( "disabled", true );
            }

            $('#refresh-users-button').click(function() {
                app.router.reload('#/users/all');
            });

            $('#create_account').click( function () {
                $("#create_modal").modal();
            });

            $('.edit-btn').click( function () {
                var $row = $(this).closest("tr");
                var $firstName = $row.find(".first-name").text();
                var $lastName = $row.find(".last-name").text();
                var $username = $row.find(".username").text();
                var $email = $row.find(".email").text();
                var $dateBirth = $row.find(".date-birth").text();

                $modal = $('#edit_modal');
                $editor = $('#editor');

                $editor.find('#firstName').val($firstName);
                $editor.find('#lastName').val($lastName);
                $editor.find('#username_edit').val($username);
                $editor.find('#email').val($email);
                $editor.find('#datetimepicker_modal').val($dateBirth);
                $modal.data('row', $row);
                $modal.modal('show');
            });

            $('.delete-btn').click( function () {
                var result = confirm("Наистина ли искате да изтриете този потребител?");
                if (result) {

                    var $row = $(this).closest("tr");
                    let username = $row.find(".username").text();

                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/users/delete?username=' + username,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': app.authorizationService.getCredentials()
                        }
                    }).done(() => {
                        app.router.reload('#/users/all');
                    }).fail((err) => {
                        console.log(err);
                        // alert(err.responseText);
                    }).always(function () {
                        //    app.router.reload('#/users/all');
                    });
                }
            });


            (function() {
                'use strict';
                var forms = document.getElementsByClassName('needs-validation');
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        let birthDate = $('#datetimepicker_modal').val();
                        var birthDateFormat = new Date(birthDate);
                        var currentDate = new Date();
                        if (form.checkValidity() === false) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                        } else if (currentDate.getFullYear() - birthDateFormat.getFullYear() < 18) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                            $("#datetimepicker_modal").val('');
                            document.getElementById("error_register-edit").textContent = "Трябва да имате 18 години за да направите регистрация.";
                            document.getElementById("error_register-edit").hidden = false;
                        } else {
                            event.preventDefault();
                            event.stopPropagation();

                            var formData = new FormData($('.needs-validation')[0]);

                            let firstName = $('#firstName').val();
                            let lastName = $('#lastName').val();
                            let username = $('#username_edit').val();
                            let email = $('#email').val();
                            let birthDate = $('#datetimepicker_modal').val();
                            let getBirthDate = new Date(birthDate);

                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/users/edit',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': app.authorizationService.getCredentials()
                                },
                                data: JSON.stringify({
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "username": username,
                                    "email": email,
                                    "birthDate": getBirthDate,
                                })
                            }).done(() => {
                                $('#edit_modal').modal('hide');
                                setTimeout(function(){ app.router.reload('#/users/all'); }, 150);
                            }).fail((err) => {
                                console.log(err);
                                alert(err.responseText);
                            }).always(function () {
                                //    app.router.reload('#/users/all');
                            });
                            form.classList.remove('was-validated');
                        }
                    }, false);
                });
            })();
            // Create Modal
            (function() {
                'use strict';
                var forms = document.getElementsByClassName('needs-validation-create');
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        let birthDate = $('#datetimepicker_modal_create').val();
                        var birthDateFormat = new Date(birthDate);
                        var currentDate = new Date();
                        if (form.checkValidity() === false) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                        } else if (currentDate.getFullYear() - birthDateFormat.getFullYear() < 18) {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                            $("#datetimepicker_modal_create").val('');
                            document.getElementById("error_register").textContent = "Трябва да имате 18 години за да направите регистрация.";
                            document.getElementById("error_register").hidden = false;
                        } else {
                            event.preventDefault();
                            event.stopPropagation();

                            var formData = new FormData($('.needs-validation')[0]);

                            let firstName = $('#first-name-create').val();
                            let lastName = $('#last-name-create').val();
                            let username = $('#username-create').val();
                            let email = $('#email-create').val();
                            let birthDate = $('#datetimepicker_modal_create').val();
                            let password = $('#password-create').val();
                            let confirmPassword = $('#confirm-password-create').val();

                            let formatBirthDate = new Date(birthDate);

                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/users/register',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': app.authorizationService.getCredentials()
                                },
                                data: JSON.stringify({
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "username": username,
                                    "email": email,
                                    "birthDate": formatBirthDate,
                                    "password": password,
                                    "confirmPassword": confirmPassword,
                                })
                            }).done(() => {
                                $('#create_modal').modal('hide');
                                setTimeout(function(){ app.router.reload('#/users/all'); }, 150);
                            }).fail((err) => {
                                console.log(err);
                                alert(err.responseText);
                            }).always(function () {
                                //    app.router.reload('#/users/all');
                            });
                            form.classList.remove('was-validated');
                        }
                    }, false);
                });
            })();

        });
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on("#/organization", null, function () {
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/organization',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        app.templateLoader.loadTemplate('.app', 'organization', function () {
            let i = 1;

            for (let elem of data) {
                let uniqueElementId = elem['id'];
                let actionsId = 'actions-' + uniqueElementId;

                $('.all-users-organization')
                    .append('<tr>'
                        + '<td class="id">' + i + '</td>'
                        + '<td class="first-name">' + elem['firstName'] + '</td>'
                        + '<td class="last-name">' + elem['lastName'] + '</td>'
                        + '<td class="username">' + elem['username'] + '</td>'
                        + '<td class="role">' + elem['role'] + '</td>'
                        + '<td id="' + actionsId + '" class="col-md-7 d-flex justify-content-between" scope="col">'
                        + '</td>'
                        + '</tr>');
                if (elem['username'] === app.authorizationService.getUsername()) {
                    $('#' + actionsId)
                        .append('<h5><button class="btn btn-secondary btn-sm px-4" disabled>Own Unchangeable</button></h5>');
                    uniqueElementId = null;
                }
                else {
                    if (elem['role'] === 'ROLE_USER') {
                        $('#' + actionsId)
                            .append('<h5><button class="btn btn-primary btn-sm promote-button">Promote</button></h5>')
                    } else if (elem['role'] === 'ROOT-ADMIN') {
                        $('#' + actionsId)
                            .append('<h5><button class="btn btn-secondary btn-sm px-4" disabled>Owner Unchangeable</button></h5>');
                        uniqueElementId = null;
                    } else if (elem['role'] === 'ADMIN') {
                        $('#' + actionsId)
                            .append('<h5><button class="btn btn-danger btn-sm demote-button">Demote</button></h5>');
                    } else {
                        $('#' + actionsId)
                            .append('<h5><button class="btn btn-primary btn-sm promote-button mr-2">Promote</button></h5>')
                            .append('<h5><button class="btn btn-danger btn-sm demote-button">Demote</button></h5>');
                    }
                }

                $('#' + actionsId + '>h5>.promote-button').click(function (e) {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/organization/promote?id=' + uniqueElementId,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': app.authorizationService.getCredentials()
                        }
                    }).done(function (data) {
                        console.log(data);
                    }).fail(function (err) {
                        console.log(err);
                    }).always(function () {
                        app.router.reload('#/organization');
                    })
                });

                $('#' + actionsId + '>h5>.demote-button').click(function (e) {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/organization/demote?id=' + uniqueElementId,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': app.authorizationService.getCredentials()
                        }
                    }).done(function (data) {
                        console.log(data);
                    }).fail(function (err) {
                        console.log(err);
                    }).always(function () {
                        app.router.reload('#/organization');
                    });
                });

                $('#refresh-users-button').click(function() {
                    app.router.reload('#/organization');
                });

                i++;
            }
        });
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on("#/logs/all", null, function () {

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/logs/all',
        headers: {
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) => {
        app.templateLoader.loadTemplate('.app', 'logs-all', function () {
            let i = 1;
            for (let elem of data) {
                $('.all-logs')
                    .append('<tr>'

                        + '<td class="first-name" style="display:none;">' + elem['id'] + '</td>'
                        + '<td class="user">' + elem['user'] + '</td>'
                        + '<td class="operation">' + elem['operation'] + '</td>'
                        + '<td class="table-name">' + elem['tableName'] + '</td>'
                        + '<td class="date">' + elem['date'] + '</td>'
                        + '</tr>');

                i++;
            }

            if(app.authorizationService.getRole() === 'MODERATOR') {
                $( "#clear_selected" ).prop( "disabled", true );
                $( "#clear_all" ).prop( "disabled", true )
            }

            var table = $('#example').DataTable();
            var selectedRows = new Array();

            $('#example tbody').on( 'click', 'tr', function () {
                $(this).toggleClass('selected');
            });

            $('#clear_selected').click( function () {
                var rows = table.rows('.selected').data();

                for(var i=0;i<rows.length;i++)
                {
                    selectedRows[i] = rows[i][0];
                }

                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/logs/delete?logs=' + selectedRows,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': app.authorizationService.getCredentials()
                    }
                }).done(() => {
                    app.router.reload('#/logs/all');
                }).fail((err) => {
                    console.log(err);
                    alert('Err: ' + err);
                }).always(function () {
                });
            });

            $('#clear_all').click( function () {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/logs/delete/all',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': app.authorizationService.getCredentials()
                    }
                }).done(() => {
                    app.router.reload('#/`logs/all`');
                }).fail((err) => {
                    console.log(err);
                    alert(err);
                }).always(function () {
                });
            });
        });
    }).fail((err) => {
        console.log(err);
    });

    $('#refresh-logs-button').click(function() {
        app.router.reload('#/logs/all');
    });

});

app.router.on("#/orders/waiting", null, function () {
    // loadNavbar();
    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/orders/waiting',
        headers:
       {
            'Content-Type': 'application/json',
            'Authorization': app.authorizationService.getCredentials()
        }
    }).done((data) =>
    {
        app.templateLoader.loadTemplate('.app', 'orders-list', function () {
         //   let loggedUsername = app.authorizationService.getUsername();
         //   $('#logged-user').text('Welcome, ' + loggedUsername);

            let i = 1;

            for (let elem of data) {
                let uniqueElementId = elem['id'];

                if (elem['coffeeName'] === null) {
                    elem['coffeeId'] = 'Deleted';
                    elem['coffeeName'] = 'Deleted';
                }

                $('.all-waiting-orders')
                    .append('<tr>'
                        + '<td class="order-id" style="display:none;">' + elem['id'] + '</td>'
                        + '<td class="coffee-id">' + elem['coffeeId'] + '</td>'
                        + '<td class="coffee-name">' + elem['coffeeName'] + '</td>'
                        + '<td class="quantity">' + elem['quantity'] + '</td>'
                        + '<td class="name">' + elem['name'] + '</td>'
                        + '<td class="address">' + elem['address'] + '</td>'
                        + '<td class="email">' + elem['email'] + '</td>'
                        + '<td class="city">' + elem['city'] + '</td>'
                        + '<td class="number">' + elem['number'] + '</td>'
                        + '<td class="text-center">'
                        + '<div class="d-flex justify-content-center">'
                        + '<input id="' + uniqueElementId + '"type="checkbox" name="deliver" value="deliver">'
                        + '</div>'
                        + '</td>'
                        + '</tr>');

                $('#' + uniqueElementId).click(function (e) {
                    $('#approve-deliver-modal').modal();

                    $('#approve-deliver-button').click(function (e) {
                        $.ajax({
                            type: 'POST',
                            url: constants.serviceUrl + '/orders/deliver?id=' + uniqueElementId,
                            headers: {
                                'Content-Type': 'application/json'
                        //      'Authorization': app.authorizationService.getCredentials()
                            }
                        }).done(function (data)
                        {
                            let deliveredSize = parseInt($("#delivered-size").text());
                            $("#delivered-size").text(deliveredSize+1);
                            let waitingSize = parseInt($("#waiting-size").text());
                            $("#waiting-size").text(waitingSize-1);
                            setTimeout(function()
                            {
                                app.router.reload('#/orders/waiting');
                            }, 150);

                        }).fail(function (err)
                        {
                            alert("FAIL");
                            console.log(err);
                        }).always(function ()
                        {
                            $('#approve-deliver-modal').modal('hide');
                        });
                    });

                    $('#approve-deliver-modal').on('hidden.bs.modal', function ()
                    {
                        $('#' + uniqueElementId).prop('checked', false);
                    })
                });

                i++;
            }

            var table = $('#orders-table').DataTable();
            var selectedRows = new Array();

            $('#orders-table tbody').on( 'click', 'tr', function () {
                $(this).toggleClass('selected');
            });

            $('#pdf-selected').click( function () {
                let rows = table.rows('.selected').data();

                for(let i=0;i<rows.length;i++)
                {
                    $('.temp-table-data')
                        .append('<tr>'
                            + '<td>' + rows[i][1] + '</td>'
                            + '<td>' + rows[i][2]  + '</td>'
                            + '<td>' + rows[i][3]  + '</td>'
                            + '<td>' + rows[i][4]  + '</td>'
                            + '<td>' + rows[i][5]  + '</td>'
                            + '<td>' + rows[i][6]  + '</td>'
                            + '<td>' + rows[i][7]  + '</td>'
                            + '<td>' + rows[i][8]  + '</td>'
                            + '</tr>');
                }

                var doc =new jsPDF();
                // doc.text("Title", 10, 10)
                doc.autoTable({ html: '#temp-table' });
                doc.save('Selected-Waiting-Orders.pdf');
                doc.languages
                $('#temp-table tbody').empty();
            });

            $('#pdf-all').click( function () {
                var doc =new jsPDF();
                doc.autoTable({ html: '#orders-table' });
                doc.save('All-Waiting-Orders.pdf');
            });

            $('#delete-selected').click( function () {
                let rows = table.rows('.selected').data();
                var selectedRows = new Array();

                for(let i=0;i<rows.length;i++)
                {
                    selectedRows[i] = rows[i][0];
                }

                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/orders/remove-selected?selectedOrders=' + selectedRows,
                    headers:
                        {
                            'Content-Type': 'application/json',
                            'Authorization': app.authorizationService.getCredentials()
                        }
                }).done(() =>
                {
                    let waitingSize = parseInt($("#waiting-size").text());
                    $("#waiting-size").text(waitingSize-selectedRows.length);
                    app.router.reload('#/orders/waiting');
                }).fail((err) =>
                {
                    console.log(err);
                    alert("Error: " + err);
                })
            });
        });
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on("#/orders/delivered", null, function () {
    // loadNavbar();

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/orders/delivered',
        headers:
            {
                'Content-Type': 'application/json',
                'Authorization': app.authorizationService.getCredentials()
            }
    }).done((data) => {
        app.templateLoader.loadTemplate('.app', 'orders-list', function () {
            //   let loggedUsername = app.authorizationService.getUsername();
            //   $('#logged-user').text('Welcome, ' + loggedUsername);

            $('#header-deliver').text("Return Delivery");
            $('#footer-deliver').text("Return Delivery");

            let i = 1;

            for (let elem of data) {
                let uniqueElementId = elem['id'];

                $('.all-waiting-orders')
                    .append('<tr>'
                        + '<td class="order-id" style="display:none;">' + elem['id'] + '</td>'
                        + '<td class="coffee-id">' + elem['coffeeId'] + '</td>'
                        + '<td class="coffee-name">' + elem['coffeeName'] + '</td>'
                        + '<td class="quantity">' + elem['quantity'] + '</td>'
                        + '<td class="name">' + elem['name'] + '</td>'
                        + '<td class="address">' + elem['address'] + '</td>'
                        + '<td class="email">' + elem['email'] + '</td>'
                        + '<td class="city">' + elem['city'] + '</td>'
                        + '<td class="number">' + elem['number'] + '</td>'
                        + '<td class="text-center">'
                        + '<div class="d-flex justify-content-center">'
                        + '<input id="' + uniqueElementId + '"type="checkbox" name="deliver" value="true" checked>'
                        + '</div>'
                        + '</td>'
                        + '</tr>');

                $('#' + uniqueElementId).click(function (e) {
                    $('#return-waiting-modal').modal();

                    $('#approve-waiting-button').click(function (e)
                    {
                      //  $('#return-waiting-modal').hide();
                        $.ajax({
                            type: 'POST',
                            url: constants.serviceUrl + '/orders/remove-delivered-flag?id=' + uniqueElementId,
                            headers:
                            {
                                'Content-Type': 'application/json'
                                //      'Authorization': app.authorizationService.getCredentials()
                            }
                        }).done(function (data)
                        {
                            let deliveredSize = parseInt($("#delivered-size").text());
                            $("#delivered-size").text(deliveredSize-1);
                            let waitingSize = parseInt($("#waiting-size").text());
                            $("#waiting-size").text(waitingSize+1);
                            setTimeout(function()
                            {
                                app.router.reload('#/orders/delivered');
                            }, 150);

                        }).fail(function (err)
                        {
                            alert("FAIL");
                            console.log(err);
                        }).always(function ()
                        {
                             $('#return-waiting-modal').modal('hide');
                        });

                    });

                    $('#approve-deliver-modal').on('hidden.bs.modal', function ()
                    {
                        //  alert("Hidden."); // this alert shows many times?
                        $('#' + uniqueElementId).prop('checked', true);
                    })

                });

                i++;
            }

            var table = $('#orders-table').DataTable();

            $('#orders-table tbody').on( 'click', 'tr', function () {
                $(this).toggleClass('selected');
            });

            $('#pdf-selected').click( function () {
                let rows = table.rows('.selected').data();

                for(let i=0;i<rows.length;i++) {
                    $('.temp-table-data')
                        .append('<tr>'
                            + '<td>' + rows[i][1] + '</td>'
                            + '<td>' + rows[i][2] + '</td>'
                            + '<td>' + rows[i][3]  + '</td>'
                            + '<td>' + rows[i][4]  + '</td>'
                            + '<td>' + rows[i][5]  + '</td>'
                            + '<td>' + rows[i][6]  + '</td>'
                            + '<td>' + rows[i][7]  + '</td>'
                            + '<td>' + rows[i][8]  + '</td>'
                            + '<td>' + rows[i][9]  + '</td>'
                            + '</tr>');
                }

                var doc =new jsPDF();
                doc.autoTable({ html: '#temp-table' });
                doc.save('Selected-Delivered-Orders.pdf');
                doc.languages
                $('#temp-table tbody').empty();
            });

            $('#pdf-all').click( function ()
            {
                var doc = new jsPDF();
                doc.autoTable({ html: '#orders-table' });
                doc.save('All-Delivered-Orders.pdf');
            });

            $('#delete-selected').click( function ()
            {
                let rows = table.rows('.selected').data();
                var selectedRows = new Array();

                for(let i=0;i<rows.length;i++)
                {
                    selectedRows[i] = rows[i][0];
                }

                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/orders/remove-selected?selectedOrders=' + selectedRows,
                    headers:
                        {
                        'Content-Type': 'application/json',
                        'Authorization': app.authorizationService.getCredentials()
                    }
                }).done(() =>
                {
                    let deliveredSize = parseInt($("#delivered-size").text());
                    $("#delivered-size").text(deliveredSize-selectedRows.length);
                    app.router.reload('#/orders/delivered');
                }).fail((err) =>
                {
                    console.log(err);
                })
            });
        });
    }).fail((err) => {
        console.log(err);
    });
});

app.router.on("#/cart", null, function () {
    // loadNavbar();
    $.ajax(
        {
            type: 'GET',
            url: constants.serviceUrl + '/cart?username=' + app.authorizationService.getUsername(),
            headers: {
               'Content-Type': 'application/json',
               // 'Authorization': app.authorizationService.getCredentials()
        }
        }).done((data) => {
        app.templateLoader.loadTemplate('.app',
            'cart', function () {
                var sum = 0;
                let i = 0;
                for (let elem of data) {
                    i++;
                    let total = 'total' + i;
                    let quantityId = 'quantity' + i;
                    let quantityValue = elem['quantity'];
                    let removeSavedOrder = 'remove' + i;
                    if (quantityValue == 0) {
                        quantityValue = 1;
                    } else if (quantityValue > elem['coffee']['rAvailability']) {
                        quantityValue = elem['coffee']['rAvailability'];
                    }

                    $('#list-orders')
                        .append('<tr>'
                            + '<td class="col-sm-8 col-md-6">'
                            + '<div class="media">'
                            + '<a class="thumbnail pull-left" href="#"> '
                            + '<img class="media-object" src=' + elem['coffee']['img1'] + ' style="width: 72px; height: 72px;"> </a>'
                            + '<div class="media-body ml-3">'
                            + '<h4 class="media-heading"><a href="#/coffees/product?id=' + elem['coffee']['id'] + '">' + elem['coffee']['name'] + '</a></h4>'
                            + '<span>Налични: </span><span class="text-success"><strong>' + elem['coffee']['rAvailability'] + '</strong></span>'
                            + '</div>'
                            + '</div>'
                            + '</td>'
                            + '<td class="col-sm-1 col-md-1" style="text-align: center">'
                            + '<input type="number" class="form-control" id="' + quantityId + '" value="' + quantityValue + '" min="1" max="' + elem['coffee']['rAvailability'] + '" required>'
                            + '</td>'
                            + '<td class="col-sm-1 col-md-1 text-center"><strong>' + elem['coffee']['newPrice'] + '</strong></td>'
                            + '<td class="col-sm-1 col-md-1 text-center"><strong id="' + total + '"></strong></td>'
                            + '<td class="col-sm-1 col-md-1">'
                            + '<button id="' + removeSavedOrder + '" type="click" class="btn btn-danger">'
                            + '<span class="glyphicon glyphicon-remove"></span> Изтрий'
                            + '</button></td>'
                            + '</tr>');


                    $('#' + quantityId).keyup(function() {
                        let maxAvailable = elem['coffee']['rAvailability'];
                        if (parseInt(this.value) > maxAvailable) {
                            this.value = maxAvailable;
                            return false;
                        }
                    });

                    $('#' + quantityId).on('change', function() {
                        let newQuantityValue = $('#' + quantityId).val();

                        sum -= +$('#' + total).text();
                        let sumInRow = elem['coffee']['newPrice'] * newQuantityValue;
                        $('#' + total).text(sumInRow.toFixed(2));

                        sum += +sumInRow;
                        $('#order_summary').text(sum.toFixed(2));

                        $.ajax({
                            type: 'POST',
                            url: constants.serviceUrl + '/cart/update-quantity',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': app.authorizationService.getCredentials()
                            },
                            data: JSON.stringify({
                                "id": elem['id'],
                                "quantity": newQuantityValue
                            })
                        }).done((data, request) => {

                        }).fail((err) => {
                            alert('Error while trying to update the quantity' + err.responseText);
                            console.log(err);
                        });
                    });

                    let rowSum = elem['coffee']['newPrice'] * $('#' + quantityId).val();
                    $('#' + total).text(rowSum.toFixed(2));
                    sum += +$('#' + total).text();

                    $('#' + removeSavedOrder).click(function () {
                        $('#approve-remove').modal();

                        $('#approve-button').click(function (e) {
                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/delete-saved-order?id=' + elem['id'],
                                headers: {
                                    'Content-Type': 'application/json',
                                    //   'Authorization': app.authorizationService.getCredentials()
                                }
                            }).done((data, request) => {
                                let cartSize = parseInt($("#cart-size").text());
                                $("#cart-size").text(cartSize - 1);
                                $('#approve-remove').modal('hide')
                                setTimeout(function () {
                                    app.router.reload('#/cart');
                                }, 150);
                            }).fail((err) => {
                                alert('Грешка при бришењето од картичката while deleting from cart' + err.responseText);
                                console.log(err);
                            });
                        });
                    });

                }

                $('#order_summary').text((Math.round(sum * 100) / 100).toFixed(2));

                $('#order-from-cart').click(function () {
                    $('#order-modal').modal();
                    $(document).bind('keydown', function (e) {
                        if (e.which == 27) {
                            $("#login-modal").modal('hide');
                        }
                    });

                    let name = data[0]['user']['firstName'] + ' ' + data[0]['user']['lastName'];
                    $('#name').val(name);
                    $('#mail').val(data[0]['user']['email']);

                    (function () {
                        'use strict';
                        var forms = document.getElementsByClassName('needs-validation');
                        var validation = Array.prototype.filter.call(forms, function (form) {
                            form.addEventListener('submit', function (event) {
                                if (form.checkValidity() === false) {
                                    form.classList.add('was-validated');
                                    event.preventDefault();
                                    event.stopPropagation();
                                } else {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    var formData = new FormData($('.needs-validation')[0]);

                                    let inputName = $('#name').val();
                                    let inputMail = $('#mail').val();
                                    let inputMobileNum = $('#mobile-num').val();
                                    let inputCity = $('#city').val();
                                    let inputAddress = $('#address').val();

                                    for (let i=0;i<data.length;i++) {
                                        data[i]['quantity'] = 1;
                                    }

                                    $.ajax({
                                        type: 'POST',
                                        url: constants.serviceUrl + '/cart-order',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': app.authorizationService.getCredentials()
                                        },
                                        data: JSON.stringify({
                                            "name": inputName,
                                            "email": inputMail,
                                            "number": inputMobileNum,
                                            "city": inputCity,
                                            "address": inputAddress,
                                            "done": false,
                                            "cartViewModelList": data,
                                        })
                                    }).done((data2, request) => {
                                        // TODO: To be improved - to show correct avaailable coffees
                                        // let availablePackages = $('#' + tempAviability).val() - inputQuantity;
                                        // $('#' + tempAviability).text(availablePackages);
                                        $('#order-modal').modal('hide');
                                        let waitingSize = parseInt($("#waiting-size").text());
                                        $("#waiting-size").text(waitingSize + data.length);
                                        $("#order-success-modal").modal();
                                        $(document).bind('keydown', function (e) {
                                            if (e.which == 27) {
                                                $("#order-success-modal").modal('hide');
                                            }
                                        });
                                    }).fail((err) => {
                                        $('#order-modal').modal('hide');
                                        $("#order-error-modal").modal();
                                        $(document).bind('keydown', function (e) {
                                            if (e.which == 27) {
                                                $("#order-error-modal").modal('hide');
                                            }
                                        });
                                        console.log(err);
                                    });
                                    form.classList.remove('was-validated');
                                }
                            });
                        });
                    })();
                });
            });
    }).fail((err) => {
        alert('Error while loading cart');
        console.log(err.responseText);
    });
});

app.router.on("#/users/login", null, function () {
    loadNavbar();
    app.templateLoader.loadTemplate('.app', 'login', function () {
        document.getElementById("registered_successfully").hidden = hiddenFlag;
        hiddenFlag = true;
        $('#login-user').click(function (e)
        {
            loginMain();
        });
    });
});

app.router.on("#/users/register", null, function () {
    loadNavbar();
    app.templateLoader.loadTemplate('.app', 'register', function () {
        (function() {
            'use strict';
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    let birthDate = $('#datetimepicker').val();
                    var birthDateFormat = new Date(birthDate);
                    var currentDate = new Date();

                    if (form.checkValidity() === false) {
                        form.classList.add('was-validated');
                        event.preventDefault();
                        event.stopPropagation();
                    } else if (currentDate.getFullYear() - birthDateFormat.getFullYear() < 18) {
                        form.classList.add('was-validated');
                        event.preventDefault();
                        event.stopPropagation();
                        $("#datetimepicker").val('');
                        document.getElementById("error_register").textContent = "Трябва да имате 18 години за да направите регистрация.";
                        document.getElementById("error_register").hidden = false;
                    } else {
                            event.preventDefault();
                            event.stopPropagation();

                            var formData = new FormData($('.needs-validation')[0]);
                            let firstName = $('#firstName').val();
                            let lastName = $('#lastName').val();
                            let username = $('#username').val();
                            let email = $('#email').val();
                            let password = $('#password').val();
                            let confirmPassword = $('#confirmPassword').val();

                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/users/register',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': app.authorizationService.getCredentials()
                                },
                                data: JSON.stringify({
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "username": username,
                                    "email": email,
                                    "birthDate": birthDateFormat,
                                    "password": password,
                                    "confirmPassword": confirmPassword
                                })
                            }).done((data, request) => {
                                hiddenFlag = false;
                                window.location.href = '#/users/login';
                            }).fail((err) => {
                                if (err.responseText === 'Error: Username already exists. Please try with another one.') {
                                    $("#username").val('');
                                    document.getElementById("error_register").textContent = "Потребителското име вече съществува.";
                                }
                                else if (err.responseText === 'Error: Passwords do not match!') {
                                    document.getElementById("error_register").textContent = "Паролите не съвпадат.";
                                }
                                console.log(err);
                                document.getElementById("error_register").hidden = false;
                                $("#password").val('');
                                $("#confirmPassword").val('');
                            });
                        form.classList.remove('was-validated');
                    }
                }, false);
            });
        })();
    });
});

app.router.on("#/users/logout", null, function () {
    app.authorizationService.evictCredentials();
    // loggedIn = false; TODO: SHOULD THIS BE SET?
    window.location.href = '#/users/login';
});

function allCoffees(data, category) {
    app.templateLoader.loadTemplate('.app', 'coffees-all', function () {
        let auth = app.authorizationService.getRole();
        let i = 0;
        let k = 0;
        if (category == "") {
            category = "Категория";
        } else {
            // category = category.charAt(0).toUpperCase() + category.substring(1).toLowerCase();
            switch(category) {
                case "CAPSULE":
                    category = "Капсули";
                    break;
                case "PODS":
                    category = "Дози";
                    break;
                case "GROUND":
                    category = "Мляно";
                    break;
                case "BEANS":
                    category = "Кафе на зърна";
                    break;
                case "INSTANT":
                    category = "Инстант";
                    break;
                default:
                    category = category.charAt(0).toUpperCase() + category.substring(1).toLowerCase();
            }
        }
        $("#categories-name").text(category);
        for (let elem of data) {
            let uniqueElementId = elem['id'];
            let currentAviability = elem['rAvailability'];
            let actionsId = 'actions-' + uniqueElementId;
            let uniqueElementIdFirst = uniqueElementId + '1';
            let uniqueElementIdSecond = uniqueElementId + '2';
            let uniqueElementIdThird = uniqueElementId + '3';
            let uniqueElementIdFourth = uniqueElementId + '4';
            let uniqueElementIdFifth = uniqueElementId + '5';
            let avg_rating = 'avg_rating_' + uniqueElementId;
            let uniqueElementIdFirstModal = uniqueElementId + 'Modal1';
            let uniqueElementIdSecondModal = uniqueElementId + 'Modal2';
            let uniqueElementIdThirdModal = uniqueElementId + 'Modal3';
            let uniqueElementIdFourthModal = uniqueElementId + 'Modal4';
            let uniqueElementIdFifthModal = uniqueElementId + 'Modal5';
            let name = uniqueElementId + 'Name';
            let selectedSize = uniqueElementId + 'Size';
            let mobileNum = uniqueElementId + 'MobileNum';
            let city = uniqueElementId + 'City';
            let address = uniqueElementId + 'Address';
            let mail = uniqueElementId + 'Mail';
            let quantity = uniqueElementId + 'Quantity';
            let quantityIncreaseClass = uniqueElementId + 'QuantityIncrease';
            let quantityDecreaseClass = uniqueElementId + 'QuantityDecrease';
            let submitButtonId = uniqueElementId + 'Submit';
            let deleteButtonId = uniqueElementId + 'Delete';
            let increaseProductAviability = uniqueElementId + 'Increase';
            let decreaseProductAviability = uniqueElementId + 'Descrease';
            let saveProductAviability = uniqueElementId + 'Save';
            let tempAviability = uniqueElementId + 'tempAviability';
            let avgRatingModal = 'avg_rating_modal' + uniqueElementId;
            let order = 'order' + uniqueElementId;
            let addToCart = 'addToCart' + uniqueElementId;
            let sizesId = 'sizes' + i;
            let saving = elem['oldPrice'] - elem['newPrice'];
            let fullSize = '';
            let options = '<option value="">Избери величина</option>';
            let selectedRating = 5;
            let ratingFlag = false;
            let loginUser = 'login' + uniqueElementId;
            let currentAvgRating = elem['ratingSum'] / elem['timesRated'];
            const weekday = ["Неделя", "Понеделник", "Вторник", "Среда", "Четвъртък", "Петък", "Събота"];
            const dateAfterThreeDays = new Date();
            dateAfterThreeDays.setDate(dateAfterThreeDays.getDate() + 3);

            if(i%3 == 0 || i==0) {
                k++;
                $('.card-container').append('<div id="' + k + '" class="row active-with-click">');
            }

            $('#' + k)
                .append('<div class="kard col-md-4 col-sm-6 col-xs-12">'
                    +      '<article class="material-card Grey">'
                    +               '<h2>'
                    +                     '<span><a style="color:rgb(255,255,255);" href="#/coffees/product?id=' + elem['id'] + '">' + elem['name'] + '</a>'
                    +                        '<button class="btn btn-outline-success btn-sm ml-2" id="' + increaseProductAviability + '" hidden="true"><i class="fas fa-plus"></i></button>'
                    +                        '<button class="btn btn-outline-danger btn-sm ml-1" type="click" id="' + decreaseProductAviability + '" hidden="true"><i class="fas fa-minus"></i></button>'
                    +                        '<button class="btn btn-outline-info btn-sm ml-1" type="click" id="' + saveProductAviability + '" hidden="true"><i class="fas fa-save"></i></button>'
                    +                     '</span>'
                    +                     '<strong>'
                    +                     '<div class="row pl-3">'
                    +                       '<span class="price old-price">'
                    +                              elem['oldPrice'] + 'лв. </span>'
                    +                       '<span class="price promo-price ml-2"> <b>'
                    +                              elem['newPrice'] + ' лв.</b></span>'
                    +                       '<button id="' + order + '" class="btn btn-danger ml-auto mr-1"><b>Бърз Преглед</b></button>'
                    +                     '</div>'
                    +                     '</strong>'
                    +                '</h2>'
                    +                '<div class="mc-content product-grid8">'
                    +                   '<div class="img-container product-image8">'
                    // +                       '<img class="img-responsive" src="' + elem['img'] + '">'
                    +                       '<img class="pic-1 img-responsive" src="' + elem['img1'] + '">'
                    +                       '<img class="pic-2 img-responsive" src="' + elem['img2'] + '">'
                    +                   '</div>'
                    +                   '<div class="mc-type">Тип: '
                    +                         '<b>'
                    +                            elem['typeValue']
                    +                         '</b>'
                    +                   '</div>'
                    +                   '<div class="mc-quantity">Количина: '
                    +                         '<b>'
                    +                            elem['quantity']
                    +                         '</b>'
                    +                   '</div>'
                    +                   '<div class="mc-leftovers">Налични: '
                    +                         '<b id="' + tempAviability + '">'
                    +                             elem['rAvailability']
                    +                         '</b>'
                    +                   '</div>'
                    +                   '<div class="mc-rating">Оцена: '
                    +                        '<b id="' + avg_rating + '"></b>'
                    +                   '</div>'
                    +                '</div>'
                    +                '<a class="mc-btn-action">'
                    +                    '<i class="fa fa-bars"></i>'
                    +                '</a>'
                    +                '<button type="click" id="' + deleteButtonId + '" hidden="true">x</button>'
                    +                '<div class="mc-footer">'
                    +                    '<div class="wrp">'
                    +                         '<a href="www.facebook.com" class="icon icon-facebook"><i class="fab fa-facebook-f"></i></a>'
                    +                         '<a href="www.instagram.com" class="icon icon-instagram mr-2"><i class="fab fa-instagram"></i></a>'
                    +                         '<a>'
                    +                           '<div class="rating" id="' + actionsId + '" style="margin-left: 80px;">'
                    +                               '<input type="radio" name="rating" value="5" id="' + uniqueElementIdFifth + '"><label for="' + uniqueElementIdFifth + '">☆</label>'
                    +                               '<input type="radio" name="rating" value="4" id="' + uniqueElementIdFourth + '"><label for="' + uniqueElementIdFourth + '">☆</label>'
                    +                               '<input type="radio" name="rating" value="3" id="' + uniqueElementIdThird + '"><label for="' + uniqueElementIdThird + '">☆</label>'
                    +                               '<input type="radio" name="rating" value="2" id="' + uniqueElementIdSecond + '"><label for="' + uniqueElementIdSecond + '">☆</label>'
                    +                               '<input type="radio" name="rating" value="1" id="' + uniqueElementIdFirst + '"><label for="' + uniqueElementIdFirst + '">☆</label>'
                    +                           '</div>'
                    +                         '</a>'
                    +                    '</div>'
                    +                '</div>'
                    +            '</article>'
                    +            '</div>');

            $('#' + avg_rating).text(currentAvgRating.toFixed(2));

            if ((i+1)%3 == 0) {
                $('.card-container').append('</div');
            }

            if (auth === 'ROOT-ADMIN' || auth === 'ADMIN') {
                document.getElementById(increaseProductAviability).hidden = false;
                document.getElementById(decreaseProductAviability).hidden = false;
                document.getElementById(saveProductAviability).hidden = false;
                document.getElementById(deleteButtonId).hidden = false;

                $('#' + increaseProductAviability).click(function() {
                    currentAviability++;
                    $('#' + tempAviability).text(currentAviability);
                });

                $('#' + decreaseProductAviability).click(function() {
                    currentAviability--;
                    $('#' + tempAviability).text(currentAviability);
                });

                $('#' + saveProductAviability).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/update-availability',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": elem['id'],
                            "availability": currentAviability
                        })
                    }).done((data) =>
                    {
                        console.log('Success');
                    }).fail((err) =>
                    {
                        console.log('Fail');
                    });
                });

                $('#' + deleteButtonId).click(function() {
                    var result = confirm("Сигурни ли сте, че искате да изтриете това кафе?");
                    if(result)
                    {
                        $.ajax({
                            type: 'POST',
                            url: constants.serviceUrl + '/coffees/remove?id=' + uniqueElementId,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': app.authorizationService.getCredentials()
                            }
                        }).done((data) => {
                            console.log(data);
                            app.router.reload('#/');
                        }).fail((err) => {
                            alert('Грешка при изтриването на това кафе');
                            console.log(err);
                        });
                    }
                });
            }

            $('#' + order).click(function() {
                let avgRating = elem['ratingSum'] / elem['timesRated'];
                // $("#order-success-modal").modal();
                $("#coffee-name").html('<b>' + elem['name'] + '</b>');
                $("#modal-img").attr("src", elem['img1']);
                $('#span-modal-img').zoom();
                $("#gallery").html(
                    '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                    '<img' +
                    ' src="' + elem['img1'] + '"' +
                    ' data-mdb-img="' + elem['img1'] + '"' +
                    ' alt="Image 1"' +
                    ' onclick=changeImage("' + elem['img1'] + '")' +
                    ' class="active w-100"' +
                    '/>' +
                    '</a>' +
                    '</div>' +

                    '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                    '<img' +
                    ' src="' + elem['img2'] + '"' +
                    ' data-mdb-img="' + elem['img2'] + '"' +
                    ' alt="Image 2"' +
                    ' onclick=changeImage("' + elem['img2'] + '")' +
                    ' class="active w-100"' +
                    '/>' +
                    '</a>' +
                    '</div>' +

                    '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                    '<img' +
                    ' src="' + elem['img3'] + '"' +
                    ' data-mdb-img="' + elem['img3'] + '"' +
                    ' alt="Image 3"' +
                    ' onclick=changeImage("' + elem['img3'] + '")' +
                    ' class="active w-100"' +
                    '/>' +
                    '</a>' +
                    '</div>' +

                    '<div class="col-3 mt-1">' +
                    '<a href="#!">' +
                    '<img' +
                    ' src="' + elem['img4'] + '"' +
                    ' data-mdb-img="' + elem['img4'] + '"' +
                    ' alt="Image 4"' +
                    ' onclick=changeImage("' + elem['img4'] + '")' +
                    ' class="active w-100"' +
                    '/>' +
                    '</a>' +
                    '</div>'
                );
                $("#rating-system").html
                (           '<p class="mt-2 ml-2" id="' + avgRatingModal + '"><b>' + avgRating.toFixed(2) + '</b> (' + elem['timesRated'] + ' гласа)' + '</p>'
                    +       '<input type="radio" name="rating" value="5" id="' + uniqueElementIdFifthModal + '"><label for="' + uniqueElementIdFifthModal + '">☆</label>'
                    +       '<input type="radio" name="rating" value="4" id="' + uniqueElementIdFourthModal + '"><label for="' + uniqueElementIdFourthModal + '">☆</label>'
                    +       '<input type="radio" name="rating" value="3" id="' + uniqueElementIdThirdModal + '"><label for="' + uniqueElementIdThirdModal + '">☆</label>'
                    +       '<input type="radio" name="rating" value="2" id="' + uniqueElementIdSecondModal + '"><label for="' + uniqueElementIdSecondModal + '">☆</label>'
                    +       '<input type="radio" name="rating" value="1" id="' + uniqueElementIdFirstModal + '"><label for="' + uniqueElementIdFirstModal + '">☆</label>'
                );
                $("#order-col").html(
                    '<form class="needs-validation" novalidate>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="input-group-prepend">'
                    +               '<span class="input-group-text"><i class="fas fa-user-tie"></i></span>'
                    +           '</div>'
                    +           '<input id="' + name + '" type="text" class="form-control rounded-right" placeholder="Име и презиме" minlength="5" maxlength="50" required>'
                    +           '<div class="invalid-feedback">'
                    +               'Името и презимето трябва да са над 5 букви'
                    +           '</div>'
                    +       '</div>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="input-group-prepend">'
                    +               '<span class="input-group-text"><i class="fas fa-phone-alt"></i></span>'
                    +           '</div>'
                    +           '<input id="' + mobileNum + '" type="tel" class="form-control rounded-right" placeholder="Мобилен телефон" minlength="5" maxlength="30" required>'
                    +           '<div class="invalid-feedback">'
                    +               'Мобилния телефон трябва да е над 5 номера'
                    +           '</div>'
                    +       '</div>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="input-group-prepend">'
                    +               '<span class="input-group-text"><i class="fas fa-city"></i></span>'
                    +           '</div>'
                    +           '<input id="' + city + '" type="text" class="form-control rounded-right" placeholder="Град" minlength="3" maxlength="50" required>'
                    +           '<div class="invalid-feedback">'
                    +               'Името на града трябва да е над 3 букви'
                    +           '</div>'
                    +       '</div>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="input-group-prepend">'
                    +               '<span class="input-group-text"><i class="fas fa-map-marked-alt"></i></span>'
                    +          '</div>'
                    +           '<input id="' + address + '" type="text" class="form-control rounded-right" placeholder="Адреса" minlength="3" maxlength="100" required>'
                    +           '<div class="invalid-feedback">'
                    +              'Адресата трябва да е над 3 букви'
                    +           '</div>'
                    +       '</div>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="input-group-prepend">'
                    +               '<span class="input-group-text"><i class="fas fa-envelope"></i></span>'
                    +           '</div>'
                    +           '<input id="' + mail + '" type="email" class="form-control rounded-right" placeholder="Имейл" maxlength="100" required>'
                    +           '<div class="invalid-feedback">'
                    +               'Моля, въведете валиден имеил'
                    +           '</div>'
                    +       '</div>'
                    +       '<div class="input-group form-group">'
                    +           '<div class="row">'
                    +               '<div class="col-3"></div>'
                    +               '<span class="col-2 input-group-btn">'
                    +                   '<button type="button" id="' + quantityDecreaseClass + '" class="btn btn-outline-danger btn-number" data-type="minus" data-field="">'
                    +                       '<i class="fas fa-minus"></i>'
                    +                   '</button>'
                    +               '</span>'
                    +               '<input type="text" id="' + quantity + '" name="quantity" class="col-2 form-control input-number rounded" style="text-align: center" value="1" min="1" max="100">'
                    +               '<div class="invalid-feedback">'
                    +                   'Воведете валиден број на паковки'
                    +               '</div>'
                    +               '<span class="col-2 input-group-btn">'
                    +                   '<button type="button" id="' + quantityIncreaseClass + '" class="btn btn-outline-success btn-number" data-type="plus" data-field="">'
                    +                       '<i class="fas fa-plus"></i>'
                    +                   '</button>'
                    +               '</span>'
                    +           '</div>'
                    +       '</div>'
                    +       '<button type="click" id="' + submitButtonId + '" class="btn btn-success btn-block">Поръчай</button>'
                    +       '<p class="order-arrival mt-2"><b>Порачайте сега и ще получите в ' + weekday[dateAfterThreeDays.getDay()] + ' ('
                    +       dateAfterThreeDays.getDate() + '.' + dateAfterThreeDays.getMonth()+1 + ')'
                    +       '</b></p>'
                    +       '</form>'
                );

                let maxAvailable = elem['rAvailability'];
                $('#' + quantity).keyup(function() {
                    if (parseInt(this.value) > maxAvailable) {
                        this.value = maxAvailable;
                        return false;
                    } else if (parseInt(this.value) == 0) {
                        this.value = 1;
                        return false;
                    }
                });

                $('#' + quantityIncreaseClass).click(function(e) {
                    e.preventDefault();
                    var currentQuantity = parseInt($('#' + quantity).val());
                    if (currentQuantity < maxAvailable) {
                        $('#' + quantity).val(currentQuantity + 1);
                    }
                });

                $('#' + quantityDecreaseClass).click(function(e) {
                    e.preventDefault();
                    var currentQuantity = parseInt($('#' + quantity).val());
                    if (currentQuantity > 1) {
                        $('#' + quantity).val(currentQuantity - 1);
                    }
                });

                $("#order-modal").modal('show');
                $("#add-to-cart").html('<button  id="' + addToCart + '" class="btn btn-dark btn-block">Добави в количката</button>');
                $("#old-price").text(elem['oldPrice'] + 'лв.');
                $("#new-price").html('<b>' + elem['newPrice'] + 'лв.</b>');
                $("#saving").text('Вие спестявате ' + saving.toFixed(2) + ' лв.');
                $("#lead").text(elem['description']);
                let inputQuantity = $('#' + quantity).val();

                (function() {
                    'use strict';
                    var forms = document.getElementsByClassName('needs-validation');
                    var validation = Array.prototype.filter.call(forms, function(form) {
                        form.addEventListener('submit', function(event) {
                            if (form.checkValidity() === false) {
                                form.classList.add('was-validated');
                                event.preventDefault();
                                event.stopPropagation();
                            } else if (elem['rAvailability'] <= 0) {
                                form.classList.add('was-validated');
                                event.preventDefault();
                                event.stopPropagation();
                                $("#order-error-modal").modal();
                                $(document).bind('keydown', function(e) {
                                    if (e.which == 27) {
                                        $("#order-error-modal").modal('hide');
                                    }
                                });
                            } else {
                                event.preventDefault();
                                event.stopPropagation();

                                var formData = new FormData($('.needs-validation')[0]);

                                let inputName = $('#' + name).val();
                                let inputCity = $('#' + city).val();
                                let inputAddress = $('#' + address).val();
                                let inputMobileNum = $('#' + mobileNum).val();
                                let inputMail = $('#' + mail).val();
                                let inputQuantity = $('#' + quantity).val();

                                $.ajax({
                                    type: 'POST',
                                    url: constants.serviceUrl + '/orders/add',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': app.authorizationService.getCredentials()
                                    },
                                    data: JSON.stringify({
                                        "name": inputName,
                                        "number": inputMobileNum,
                                        "city": inputCity,
                                        "address": inputAddress,
                                        "email": inputMail,
                                        "quantity": inputQuantity,
                                        "done": false,
                                        "coffee": elem
                                    })
                                }).done((data, request) => {
                                    let currentAviability = $('#' + tempAviability).text();
                                    let availablePackages = currentAviability - inputQuantity;
                                    $('#' + tempAviability).text(availablePackages);
                                    let waitingSize = parseInt($("#waiting-size").text());
                                    $("#waiting-size").text(waitingSize+1);
                                    $("#order-success-modal").modal();
                                    $(document).bind('keydown', function(e) {
                                        if (e.which == 27) {
                                            $("#order-success-modal").modal('hide');
                                        }
                                    });
                                }).fail((err) => {
                                    console.log(err);
                                    alert(err.responseText);
                                    // document.getElementById("error_register").hidden = false;
                                });

                                form.classList.remove('was-validated');
                            }
                        }, false);
                    });
                })();

                $('#' + uniqueElementIdFirstModal).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/change-rating',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": uniqueElementId,
                            "rating": 1
                        })
                    }).done((data) =>
                    {
                        elem['timesRated']++;
                        $('#' + avgRatingModal).html('<b>' + data + '</b> (' + elem['timesRated'] + ' гласа)');

                    }).fail((err) =>
                    {
                        console.log(err);
                        if (err.status == 401 || err.status == 403) {
                            document.getElementById("error_login").hidden = false;
                        }
                    });
                });

                $('#' + uniqueElementIdSecondModal).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/change-rating',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": uniqueElementId,
                            "rating": 2
                        })
                    }).done((data) =>
                    {
                        elem['timesRated']++;
                        $('#' + avgRatingModal).html('<b>' + data + '</b> (' + elem['timesRated'] + ' гласа)');
                    }).fail((err) =>
                    {
                        console.log(err);
                        if (err.status == 401 || err.status == 403) {
                            document.getElementById("error_login").hidden = false;
                        }
                    });
                });

                $('#' + uniqueElementIdThirdModal).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/change-rating',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": uniqueElementId,
                            "rating": 3
                        })
                    }).done((data) =>
                    {
                        elem['timesRated']++;
                        $('#' + avgRatingModal).html('<b>' + data + '</b> (' + elem['timesRated'] + ' гласа)');
                    }).fail((err) =>
                    {
                        console.log(err);
                        if (err.status == 401 || err.status == 403)
                        {
                            document.getElementById("error_login").hidden = false;
                        }
                    });
                });

                $('#' + uniqueElementIdFourthModal).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/change-rating',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": uniqueElementId,
                            "rating": 4
                        })
                    }).done((data) =>
                    {
                        elem['timesRated']++;
                        $('#' + avgRatingModal).html('<b>' + data + '</b> (' + elem['timesRated'] + ' гласа)');
                    }).fail((err) =>
                    {
                        console.log(err);
                        if (err.status == 401 || err.status == 403) {
                            document.getElementById("error_login").hidden = false;
                        }
                    });
                });

                $('#' + uniqueElementIdFifthModal).click(function() {
                    $.ajax({
                        type: 'POST',
                        url: constants.serviceUrl + '/coffees/change-rating',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            "id": uniqueElementId,
                            "rating": 5
                        })
                    }).done((data) =>
                    {
                        elem['timesRated']++;
                        $('#' + avgRatingModal).html('<b>' + data + '</b> (' + elem['timesRated'] + ' гласа)');
                    }).fail((err) =>
                    {
                        console.log(err);
                        if (err.status == 401 || err.status == 403) {
                            document.getElementById("error_login").hidden = false;
                        }
                    });
                });

                $('#' + addToCart).click(function() {
                    document.getElementById("error_login").hidden = true;
                    auth = app.authorizationService.getRole();
                    if(auth === "ROLE_USER" || auth === "MODERATOR" || auth === "ADMIN" || auth === "ROOT-ADMIN") {
                        $.ajax({
                            type: 'POST',
                            url: constants.serviceUrl + '/save-order',
                            headers: {
                                'Content-Type': 'application/json',
                                //  'Authorization': app.authorizationService.getCredentials()
                            },
                            data: JSON.stringify({
                                "coffee": elem,
                                "username": app.authorizationService.getUsername(),
                                "quantity": 1
                            })
                        }).done((data, request) =>
                        {
                            let cartSize = parseInt($("#cart-size").text());
                            if (cartSize == undefined) {
                                cartSize = 0;
                            }
                            $("#cart-size").text(cartSize+1);
                            $("#cart-success").modal();
                            $(document).bind('keydown', function(e)
                            {
                                if (e.which == 27)
                                {
                                    $("#cart-success").modal('hide');
                                }
                            });
                        }).fail((err) =>
                        {
                            console.log(err);
                            alert(err.responseText);
                            document.getElementById("error_register").hidden = false;
                        });
                    } else {
                        $('#login-modal').modal();
                        $("#button-div").html('<button id="' + loginUser + '"'
                            + ' type="button" class="btn float-right login_btn">Вход</button>');
                        $('#sign-up-link').click(function ()
                        {
                            $('#login-modal').modal('hide');
                            $('#order-modal').modal('hide');
                            setTimeout(function(){ app.router.reload('#/users/register'); }, 150);
                        });
                        $('#' + loginUser).click(function () {
                            loginAndAddToCart(elem, inputQuantity);
                        });
                    }
                });

                $(document).bind('keydown', function(e)
                {
                    if (e.which == 27)
                    {
                        var isCartModalOn = $('#cart-success').is(':visible');
                        var isOrderSuccessModalOn = $('#order-success-modal').is(':visible');
                        var isLoginModalOn = $('#login-modal').is(':visible');
                        if(isCartModalOn == false && isOrderSuccessModalOn == false && isLoginModalOn == false)
                        {
                            $("#order-modal").modal('hide');
                        }
                    }
                });
            });

            $('#' + uniqueElementIdFirst).click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": uniqueElementId,
                        "rating": 1
                    })
                }).done((data) =>
                {
                    elem['timesRated']++;
                    $('#' + avg_rating).text(data);
                }).fail((err) =>
                {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#' + uniqueElementIdSecond).click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": uniqueElementId,
                        "rating": 2
                    })
                }).done((data) => {
                    elem['timesRated']++;
                    $('#' + avg_rating).text(data);
                }).fail((err) => {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#' + uniqueElementIdThird).click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": uniqueElementId,
                        "rating": 3
                    })
                }).done((data) => {
                    elem['timesRated']++;
                    $('#' + avg_rating).text(data);
                }).fail((err) => {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#' + uniqueElementIdFourth).click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": uniqueElementId,
                        "rating": 4
                    })
                }).done((data) => {
                    elem['timesRated']++;
                    $('#' + avg_rating).text(data);
                }).fail((err) => {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            $('#' + uniqueElementIdFifth).click(function() {
                $.ajax({
                    type: 'POST',
                    url: constants.serviceUrl + '/coffees/change-rating',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        "id": uniqueElementId,
                        "rating": 5
                    })
                }).done((data) => {
                    elem['timesRated']++;
                    $('#' + avg_rating).text(data);
                }).fail((err) => {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                        document.getElementById("error_login").hidden = false;
                    }
                });
            });

            i++;
        }

        $('.card-container').append('</div');

        if(auth === "MODERATOR" || auth === "ADMIN" || auth === "ROOT-ADMIN")
        {
            (function () {
                'use strict';
                var forms = document.getElementsByClassName('add-coffee');
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false)
                        {
                            form.classList.add('was-validated');
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        else
                        {
                            event.preventDefault();
                            event.stopPropagation();

                            var formData = new FormData($('.add-coffee')[0]);

                            let name = $('#name').val();
                            let img1 = $('#img1').val();
                            let img2 = $('#img2').val();
                            let img3 = $('#img3').val();
                            let img4 = $('#img4').val();
                            let newPrice = $('#new_price_input').val();
                            let oldPrice = $('#old_price_input').val();
                            let quantity = $('#quantity').val();
                            let type = $('#type').val();
                            let availability = $('#availability_input').val();
                            let rAvailability = $('#r_availability_input').val();
                            let description = $('#description').val();

                            $.ajax({
                                type: 'POST',
                                url: constants.serviceUrl + '/coffees/add',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                data: JSON.stringify({
                                    "name": name,
                                    "img1": img1,
                                    "img2": img2,
                                    "img3": img3,
                                    "img4": img4,
                                    "newPrice": newPrice,
                                    "oldPrice": oldPrice,
                                    "quantity": quantity,
                                    "type": type,
                                    "аvailability": availability,
                                    "rAvailability": rAvailability,
                                    "description": description
                                })
                            }).done((data) => {
                                app.router.reload('#/');
                                setTimeout(function () {
                                    $('#add_success').modal();
                                }, 1000);
                                $(document).bind('keydown', function(e)
                                {
                                    if (e.which == 27)
                                    {
                                        $("#add_success").modal('hide');
                                    }
                                });
                            }).fail((err) => {
                                alert('err');
                            });

                            form.classList.remove('was-validated');
                        }
                    }, false);
                });
            })();
        }
        else
        {
            $("#add-coffee").hide();
        }
    });
}

function searchCoffee() {
    var searchInput = $(".search_input").val();

    $.ajax({
        type: 'GET',
        url: constants.serviceUrl + '/search/?input=' + searchInput,
        headers: {
            'Content-Type': 'application/json',
        }
    }).done((data) => {
        allCoffees(data, "");
    }).fail((err) => {
        console.log(err);
    });
}

function changeImage(src) {
    $("#modal-img").attr("src", src);
    $('#span-modal-img').trigger('zoom.destroy');
    $('#span-modal-img').zoom();
    // document.getElementById("modal-img").src = src;
}

function changeImage2(src) {
    $("#span-modal-img").html('<img id="modal-img" class="img-responsive" src="' + src + '">');
    // ' onclick=changeImage("' + data['img1'] + '")' +
    // document.getElementById("modal-img").src = src;
}

app.router.on('#/payment', null, function () {
    app.templateLoader.loadTemplate('.app', 'payment');

    $('#show-payment-modal').click(function() {

    });
});


window.location.href = '#/';