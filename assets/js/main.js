/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

			/************************************************************** */

		// ——————————————————————————————————————————————————
		// TextScramble
		// ——————————————————————————————————————————————————
		class TextScramble {
			constructor(el) {
			this.el = el
			this.chars = '!<>-_\\/[]{}—=+*^?#________'
			this.update = this.update.bind(this)
			}
			setText(newText) {
			const oldText = this.el.innerText
			const length = Math.max(oldText.length, newText.length)
			const promise = new Promise((resolve) => this.resolve = resolve)
			this.queue = []
			for (let i = 0; i < length; i++) {
				const from = oldText[i] || ''
				const to = newText[i] || ''
				const start = Math.floor(Math.random() * 40)
				const end = start + Math.floor(Math.random() * 40)
				this.queue.push({ from, to, start, end })
			}
			cancelAnimationFrame(this.frameRequest)
			this.frame = 0
			this.update()
			return promise
			}
			update() {
			let output = ''
			let complete = 0
			for (let i = 0, n = this.queue.length; i < n; i++) {
				let { from, to, start, end, char } = this.queue[i]
				if (this.frame >= end) {
				complete++
				output += to
				} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar()
					this.queue[i].char = char
				}
				output += `<span class="dud">${char}</span>`
				} else {
				output += from
				}
			}
			this.el.innerHTML = output
			if (complete === this.queue.length) {
				this.resolve()
			} else {
				this.frameRequest = requestAnimationFrame(this.update)
				this.frame++
			}
			}
			randomChar() {
			return this.chars[Math.floor(Math.random() * this.chars.length)]
			}
		}
		
		// ——————————————————————————————————————————————————
		// Example
		// ——————————————————————————————————————————————————
		
		const phrases = [
			'Junior Developer',
			'Web Developer',
			'Linux Environment',
			'Laravel PHP',
			'Fundamentals in Python,Java,C#,Xamarin.',
			'Adaptable to change',
			'In search of new opportunities'
		]
		
		const el = document.querySelector('.text')
		const fx = new TextScramble(el)
		
		let counter = 0
		const next = () => {
			fx.setText(phrases[counter]).then(() => {
			setTimeout(next, 800)
			})
			counter = (counter + 1) % phrases.length
		}
		
		next()
					

})(jQuery);