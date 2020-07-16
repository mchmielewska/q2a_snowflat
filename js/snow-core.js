/*
	Q2A Market (c) Jatin Soni
	http://www.q2amarket.com/

	File:           js/snow-core.js
	Version:        Snow 1.4
	Description:    JavaScript helpers for SnowFlat theme

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.
*/


$(document).ready(function () {

	/**
	 * Account menu box toggle script
	 */
	$('#qam-account-toggle').click(function (e) {
		e.stopPropagation();
		$(this).toggleClass('account-active');
		$('.qam-account-items').slideToggle(100);
	});

	$(document).click(function () {
		$('#qam-account-toggle.account-active').removeClass('account-active');
		$('.qam-account-items:visible').slideUp(100);
	});

	$('.qam-account-items').click(function (event) {
		event.stopPropagation();
	});

	/**
	 * Main navigation toggle script
	 */
	$('.qam-menu-toggle').click(function () {
		$('.qa-nav-main').slideToggle(100);
		$(this).toggleClass('current');
	});

	/*
	 * Sidepannel Toggle Click Function
	 */
	$('#qam-sidepanel-toggle').click(function () {
		$('#qam-sidepanel-mobile').toggleClass('open');
		$(this).toggleClass('active');
		$(this).find('i').toggleClass('icon-right-open-big');
	});

	/**
	 * Toggle search box for small screen
	 */
	$('#qam-search-mobile').click(function () {
		$(this).toggleClass('active');
		$('#the-top-search').slideToggle('fast');
	});

	/*
	 * add wrapper to the message sent note 'td'
	 */
	$('.qa-part-form-message .qa-form-tall-ok').wrapInner('<div class="qam-pm-message"></div>');

	// fix the visible issue for main nav, top search-box
	$(window).resize(function () {
		if (window.matchMedia('(min-width: 980px)').matches) {
			$(".qam-search.the-top .qa-search").hide();
			$(".qa-nav-main").show('fast', function() { $(this).css('display','inline-block'); });
		} else {
			$(".qam-search.the-top .qa-search").show();
			$(".qa-nav-main").hide();
			$('.qam-menu-toggle').removeClass('current');
		}
	});


	if (window.matchMedia('(max-width: 979px)').matches) {
		let username = document.querySelector('#qam-account-toggle.qam-logged-in');
		let userImage = document.getElementsByClassName('qa-avatar-image')[0];
		if (username && !userImage) {
			let firstLetter = username.innerText.charAt(0);
			username.innerText = firstLetter;
		}
	}

	let headerElement = document.querySelector('.qa-main-heading h1');
	if (headerElement) {
		let firstSpace = headerElement.innerText.indexOf(' ');
		headerElement.innerHTML = `<span class="unbold">${headerElement.innerText.slice(0, firstSpace)}</span>`+ ' ' + headerElement.innerText.slice(firstSpace);
	}

	if (typeof(User) === "undefined") {
		var jsonObj =
			{
				"interfaceLanguage":
					{
						"current": "eng",
						"available":
							["pol", "eng"]
					},
				"contentLanguage":
					{
						"current": "eng",
						"available": ["pol", "eng"]
					},
				"service":
					{
						"current":  {
							"id": "shop",
							"name": "IdoSell Shop"
						}
						,
						"available": [
							{
								"id": "shop",
								"name": "IdoSell Shop"
							},
							{
								"id": "booking",
								"name": "IdoSell Booking"
							},
							{
								"id": "booking",
								"name": "IdoSell Booking Two"
							}
						]
					},
				"endpointUrl": "/change-language"
			};
	} else {
		var jsonObj = User;
	}

	const menuList = document.getElementsByClassName('qa-nav-main-list')[0];

	let functionBar = document.createElement('LI');
	functionBar.classList.add('qa-nav-main-item');
	functionBar.classList.add('dropdown');

    let contentLanguageSelect = '';
    for (i in jsonObj.contentLanguage.available) {
        let language = jsonObj.contentLanguage.available[i];

        if (language === jsonObj.contentLanguage.current) {
            contentLanguageSelect = contentLanguageSelect +
                `<label class='selectContainer ${language}'>
                <input type='radio' id='content_${language}' name='contentLanguage' value='${language}' checked>
                <span class='checkmark'></span></label>`;
        } else {
            contentLanguageSelect = contentLanguageSelect +
                `<label class='selectContainer ${language}'>
                <input type='radio' id='content_${language}' name='contentLanguage' value='${language}'>
                <span class='checkmark'></span>
                </label>`
        }
    };

    let interfaceLanguageSelect = '';
    for (i in jsonObj.interfaceLanguage.available) {
        let language = jsonObj.interfaceLanguage.available[i];

        if (language === jsonObj.interfaceLanguage.current) {
            interfaceLanguageSelect = interfaceLanguageSelect +
                `<label class='selectContainer ${language}'>
                <input type='radio' id='interface_${language}' name='interfaceLanguage' value='${language}' checked>
                <span class='checkmark'></span>
                </label>`;
        } else {
            interfaceLanguageSelect = interfaceLanguageSelect +
                `<label class='selectContainer ${language}'>
                <input type='radio' id='interface_${language}' name='interfaceLanguage' value='${language}'>
                <span class='checkmark'></span>
                </label>`;
        }
    };

    let serviceSelect = '';
    for (i in jsonObj.service.available) {
        let serviceId = jsonObj.service.available[i].id;

        if (serviceId === jsonObj.service.current.id) {
            serviceSelect = serviceSelect +
                `<label class='selectContainer ${serviceId}'>
                <input type='radio' id='${serviceId}' name='service' value='${serviceId}' checked>
                <span class='checkmark'></span>
                </label>`;
        } else if (serviceSelect.includes(serviceId)) {
            serviceSelect = serviceSelect;
        } else {
            serviceSelect = serviceSelect +
                `<label class='selectContainer ${serviceId}'>
                <input type='radio' id='${serviceId}' name='service' value='${serviceId}'>
                <span class='checkmark'></span>
                </label>`;
        }
    }

    let headersTranslated = [];
    let languageBar = 'Configuration';
    let submitButton = 'Submit';
    if (jsonObj.interfaceLanguage.current === 'pol') {
        headersTranslated[0] = 'Język interfejsu';
        headersTranslated[1] = 'Język treści';
        headersTranslated[2] = 'Typ serwisu';
        languageBar = 'Konfiguracja';
        submitButton = 'Wybierz';
    } else if (jsonObj.interfaceLanguage.current === 'eng') {
        headersTranslated[0] = 'Interface Language';
        headersTranslated[1] = 'Content Language';
        headersTranslated[2] = 'Service type';
    }

	let formHTML = `<form action='${jsonObj.endpointUrl}' method='POST' name='configuration'>`+
		`<h4>${headersTranslated[0]}</h4>` +
		"<div class='flex-form'>" +
           interfaceLanguageSelect +
		"</div>" +
        `<h4>${headersTranslated[1]}</h4>`+
		"<div class='flex-form'>" +
		    contentLanguageSelect +
		"</div>" +
        `<h4>${headersTranslated[2]}</h4>` +
		"<div class='flex-form'>" +
            serviceSelect +
		"</div>" +
		`<input type='submit' value='${submitButton}'>` +
		"</form>";

	functionBar.innerHTML =
		`<span id='functionBar' class='qa-nav-main-link'>${languageBar}</span>` +
		"<div class='dropdown-content'>" +
			formHTML +
		"</div>";

	menuList.appendChild(functionBar);

	if (window.matchMedia('(max-width: 979px)').matches) {
		let fBar = document.getElementById('functionBar');
		let dropdown = document.getElementsByClassName('dropdown-content')[0];

		let showDetails = false;
		fBar.addEventListener('click', (e) => {
			showDetails = !showDetails;
			if (showDetails === true) {
				dropdown.style.display = 'block';
			}
			else {
				dropdown.style.display = 'none';
			}
		});
	}

	if (document.getElementsByClassName('qa-part-q-view').length) {
		let heading = document.getElementsByClassName('qa-main-heading')[0];
		heading.classList.add('question');
	}

	if (document.getElementsByClassName('qa-template-favorites').length) {
		let favourites = document.getElementsByClassName('qa-q-favorited');
		for (i = 0; i<favourites.length; i++) {
			(favourites[i]).classList.add('border-none');
		}
	}
});

