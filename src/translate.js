export default function ( Vue, options ) {
	let storageName = 'vtranslate';
	let selectedLang = 'en';
	const translateObj = {
		set(translate) {
			localStorage.setItem(storageName,JSON.stringify(translate));
		},
		setLang(lang) {
			selectedLang = lang;
			localStorage.setItem(`${storageName}-lang`,lang);
		},
		getLang(lang) {
			selectedLang = localStorage.getItem(`${storageName}-lang`,lang);
		},
		get(key,attributes){
			let obj = localStorage.getItem(storageName);
			if (obj !== null) {
				obj = JSON.parse(obj);
				if (typeof attributes !== 'undefined' && attributes.length > 0) {
					attributes.forEach(attr => key = key.replace(':attr',attr));
					if (typeof obj[selectedLang][key] !== 'undefined') {
						return obj[selectedLang][key];
					}
				} else {

					if (typeof obj[selectedLang][key] !== 'undefined') {
						return obj[selectedLang][key];
					}
				}
			}
			return `[${key}]`;
		}
	};
	Vue.trans = translateObj;


	Object.defineProperties(Vue.prototype, {
		$trans: {
			get: () => Vue.trans
		}
	});

	if (typeof options !== 'undefined') {
		if (typeof options.name !== 'undefined' && options.name.trim() != '') {
			storageName = options.name;
		}
		if (typeof options.translate !== 'undefined' && Object.keys(options.translate).length > 0) {
			Vue.trans.set(options.translate);
		}
		if (typeof options.defaultLang !== 'undefined') {
			Vue.trans.setLang(options.defaultLang);
		} else {
			Vue.trans.setLang(selectedLang);
		}
	}

	Vue.directive('trans', {
		bind: (el,binding) => {
			const params = binding.rawName.split('.'); 
			let _get_value = (key) => translateObj.get(key);
			if (params.length > 1) {
				const attrs = binding.value;
				if (params[1] == 'attribute') {
					if (typeof attrs.attributes === 'undefined') {
						el.textContent = _get_value(attrs);
					} else if( attrs.attributes.length == 0) {
						el.textContent = _get_value(attrs.text);
					} else {
						let to_replace = _get_value(attrs.text);
						attrs.attributes.forEach(attr => to_replace = to_replace.replace(':attr',attr));
						el.textContent = to_replace;
					}
				} else if (params[1] == 'condition') {
					if (attrs.condition){
						el.textContent = _get_value(attrs.text);
					}
				} else {
					let val = _get_value(params[1]);
					if (val != params[1]) {
						el.textContent = val;
					} else {
						el.setAttribute(params[1],_get_value(attrs))
					}
				}
			} else {
				el.textContent = _get_value(binding.value);
			}
		}
	});
}