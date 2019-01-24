/*!
	* BiblioCss version 1.0.0
	* Copyright 2019-2020 Holson Mpangala (Hlone)
	* Copyright 2019-2020 Horsia Developpement
	* Lincense Git (Lien à venir)
*/
var Ecran = 'BiblioCss: ';
var Version_B = 'Version 1.0.0';
var ErrorJ = 'Pour mieux utiliser BiblioCss JavaScript, vous devez inclure jQuery.';
var ErrorJv = 'BiblioCss JavaScript requierd au moins la version 1.9.1. pour sa ';console.log(Ecran + 'BiblioCss est installé,' + Version_B);
if (typeof jQuery === 'undefined') {
	throw new Error(Ecran + ErrorJ)
}
+function ($) {
	var version = $.fn.jquery.split(' ')[0].split('.')
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
		throw new Error(ErrorJv,Version_B)
	}
}(jQuery);
+function () {
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructeur, protoProps, staticProps) { if (protoProps) defineProperties(Constructeur.prototype, protoProps); if (staticProps) defineProperties(Constructeur, staticProps); return Constructeur; }; }();
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("Ceci n'a pas été initialisé - le super() ne s'est pas appelé "); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("L'expression superbe doit être nulle ou une fonction, pas " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	function ControlDAppelDeClass(instance, Constructeur) { if (!(instance instanceof Constructeur)) { throw new TypeError("Ne peut pas appeler une classe comme fonction"); } }
	/*
	*	Fixateur des plugins
	*/
	var BiblioCssFixateur = function ($) {
		var transition = false;
		var MAX_UID = 1000000;
		var TransitionEndEvent = {
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'transitionend',
			OTransition: 'oTransitionEnd otransitionend',
			transition: 'transitionend'
		};
		function toType(obj) {
			return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
		}
		function isElement(obj) {
			return (obj[0] || obj).nodeType;
		}
		function getSpecialTransitionEndEvent() {
			return {
				bindType: transition.end,
				delegateType: transition.end,
				handle: function handle(event) {
					if ($(event.target).is(this)) {
						return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
					}
					return undefined;
				}
			};
		}
		function transitionEndTest() {
			if (window.QUnit) {
				return false;
			}
			var el = document.createElement('bibliocss');
			for (var name in TransitionEndEvent) {
				if (el.style[name] !== undefined) {
					return {
						end: TransitionEndEvent[name]
					};
				}
			}
			return false;
		}
		function transitionEndEmulator(duration) {
			var _this = this;
			var called = false;
			$(this).one(BiblioCssFixateur.TRANSITION_END, function () {
				called = true;
			});
			setTimeout(function () {
				if (!called) {
					BiblioCssFixateur.triggerTransitionEnd(_this);
				}
			}, duration);
			return this;
		}
		function setTransitionEndSupport() {
			transition = transitionEndTest();
			$.fn.emulateTransitionEnd = transitionEndEmulator;
			if (BiblioCssFixateur.supportsTransitionEnd()) {
				$.event.special[BiblioCssFixateur.TRANSITION_END] = getSpecialTransitionEndEvent();
			}
		}
		/*! Fixateur API */
		var BiblioCssFixateur = {
			TRANSITION_END: 'bibliocssTransitionEnd',
			getUID: function getUID(prefix) {
				do {
					prefix += ~~(Math.random() * MAX_UID);
				} while (document.getElementById(prefix));
				return prefix;
			},
			getSelectorFromElement: function getSelectorFromElement(element) {
				var selector = element.getAttribute('data-target');

				if (!selector) {
					selector = element.getAttribute('href') || '';
					selector = /^#[a-z]/i.test(selector) ? selector : null;
				}
				return selector;
			},
			reflow: function reflow(element) {
				return element.offsetHeight;
			},
			triggerTransitionEnd: function triggerTransitionEnd(element) {
				$(element).trigger(transition.end);
			},
			supportsTransitionEnd: function supportsTransitionEnd() {
				return Boolean(transition);
			},
			typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
				for (var property in configTypes) {
					if (configTypes.hasOwnProperty(property)) {
						var expectedTypes = configTypes[property];
						var value = config[property];
						var valueType = value && isElement(value) ? 'element' : toType(value);

						if (!new RegExp(expectedTypes).test(valueType)) {
							throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
						}
					}
				}
			}
		};
		setTransitionEndSupport();
		return BiblioCssFixateur;
	}(jQuery);
	/*
		Construction des PLUGIN
	*/
	var Navbar = function ($) {
		if ($('#nav-menu-contenu').length) {
			var $mobile_nav = $('#nav-menu-contenu').clone().prop({
				id: 'mobile-nav'
			});
			$mobile_nav.find('> ul').attr({
				'class': '',
				'id': ''
			});
			$('body').append($mobile_nav);
			$('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
			$('body').append('<div id="mobile-body-overly"></div>');
			$('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
			$(document).on('click', '.menu-has-children i', function(e) {
				$(this).next().toggleClass('menu-item-active');
				$(this).nextAll('ul').eq(0).slideToggle();
				$(this).toggleClass("fa-chevron-up fa-chevron-down");
			});
			$(document).on('click', '#mobile-nav-toggle', function(e) {
				$('body').toggleClass('mobile-nav-active');
				$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
				$('#mobile-body-overly').toggle();
			});
			$(document).click(function(e) {
				var contenu = $("#mobile-nav, #mobile-nav-toggle");
				if (!contenu.is(e.target) && contenu.has(e.target).length === 0) {
					if ($('body').hasClass('mobile-nav-active')) {
						$('body').removeClass('mobile-nav-active');
						$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
						$('#mobile-body-overly').fadeOut();
					}
				}
			});
		} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
			$("#mobile-nav, #mobile-nav-toggle").hide();
		}
		$('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				if (target.length) {
					var top_space = 0;
					if ($('.navbar').length) {
						top_space = $('.navbar').outerHeight();
						if(!$('.navbar').hasClass('navbar-fixed') ) {
							top_space = top_space - 20;
						}
					}
					$('html, body').animate({
						scrollTop: target.offset().top - top_space
					}, 1500, 'easeInOutExpo');
					if ($(this).parents('.nav-menu').length) {
						$('.nav-menu .menu-active').removeClass('menu-active');
						$(this).closest('li').addClass('menu-active');
					}

					if ($('body').hasClass('mobile-nav-active')) {
						$('body').removeClass('mobile-nav-active');
						$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
						$('#mobile-body-overly').fadeOut();
					}
					return false;
				}
			}
		});	
	return Navbar;
	}(jQuery);
	
		/* Alerte */
	var Alerte = function ($) {
		var NOM = 'alerte';
		var VERSION = Version_B;
		var DATA_KEY = 'bibliocss.alerte';
		var EVENT_KEY = '.' + DATA_KEY;
		var DATA_API_KEY = '.data-api';
		var JQUERY_NO_CONFLICT = $.fn[NOM];
		var TRANSITION_DURATION = 150;
		var Selector = {
			DISMISS: '[data-dismiss="alerte"]'
		};
		var Event = {
			CLOSE: 'fermer' + EVENT_KEY,
			CLOSED: 'closed' + EVENT_KEY,
			CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
		};
		var ClassName = {
			ALERTE: 'alerte',
			FADE: 'fane',
			SHOW: 'dedans'
		};
		var Alerte = function () {
			function Alerte(element) {
				ControlDAppelDeClass(this, Alerte);

				this._element = element;
			}
			Alerte.prototype.close = function close(element) {
				element = element || this._element;
				var rootElement = this._getRootElement(element);
				var customEvent = this._triggerCloseEvent(rootElement);
				if (customEvent.isDefaultPrevented()) {
					return;
				}
				this._removeElement(rootElement);
			};
			Alerte.prototype.dispose = function dispose() {
				$.removeData(this._element, DATA_KEY);
				this._element = null;
			};
			Alerte.prototype._getRootElement = function _getRootElement(element) {
				var selector = BiblioCssFixateur.getSelectorFromElement(element);
				var parent = false;
				if (selector) {
					parent = $(selector)[0];
				}
				if (!parent) {
					parent = $(element).closest('.' + ClassName.ALERTE)[0];
				}
				return parent;
			};
			Alerte.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
				var closeEvent = $.Event(Event.CLOSE);
				$(element).trigger(closeEvent);
				return closeEvent;
			};
			Alerte.prototype._removeElement = function _removeElement(element) {
				var _this2 = this;
				$(element).removeClass(ClassName.SHOW);
				if (!BiblioCssFixateur.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
					this._destroyElement(element);
					return;
				}
				$(element).one(BiblioCssFixateur.TRANSITION_END, function (event) {
					return _this2._destroyElement(element, event);
				}).emulateTransitionEnd(TRANSITION_DURATION);
			};
			Alerte.prototype._destroyElement = function _destroyElement(element) {
				$(element).detach().trigger(Event.CLOSED).remove();
			};
			Alerte._jQueryInterface = function _jQueryInterface(config) {
				return this.each(function () {
					var $element = $(this);
					var data = $element.data(DATA_KEY);
					if (!data) {
						data = new Alerte(this);
						$element.data(DATA_KEY, data);
					}
					if (config === 'fermer') {
						data[config](this);
					}
				});
			};
			Alerte._handleDismiss = function _handleDismiss(alertInstance) {
				return function (event) {
					if (event) {
						event.preventDefault();
					}
					alertInstance.close(this);
				};
			};
			_createClass(Alerte, null, [{
				key: 'VERSION',
				get: function get() {
					return VERSION;
				}
			}]);
			return Alerte;
		}();
		$(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alerte._handleDismiss(new Alerte()));
		$.fn[NOM] = Alerte._jQueryInterface;
		$.fn[NOM].Constructeur = Alerte;
		$.fn[NOM].noConflict = function () {
			$.fn[NOM] = JQUERY_NO_CONFLICT;
			return Alerte._jQueryInterface;
		};

		return Alerte;
	}(jQuery);
	/* D'autres PLUGIN ICI */
	
}();