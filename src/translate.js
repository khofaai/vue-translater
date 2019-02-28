import Directive from './lib/directive';

export default function ( Vue, options ) {
	
	let storageName = 'vtranslate';
	let translationObject = null;
	let selectedLang;

	const translateObj = {
		set(translate) {
			translationObject = translate;
			localStorage.setItem(storageName,JSON.stringify(translate));
		},
		setLang(lang) {
			selectedLang = lang;
			localStorage.setItem(`${storageName}-lang`,lang);
		},
		getCurrentLang() {
			selectedLang = localStorage.getItem(`${storageName}-lang`);
			return selectedLang;
		},
		getAvailableLanguages() {
			if (translationObject == null) {
				this.getTranslationObject();
			}
			return Object.keys(translationObject);
		},
		getTranslationObject() {
			if (translationObject == null) {
				translationObject = localStorage.getItem(storageName);
			}
			return typeof translationObject === 'object' ? translationObject : JSON.parse(translationObject);
		},
		get(key, attributes) {
			let obj = this.getTranslationObject();
			if (obj !== null) {
				if (typeof attributes !== 'undefined' && attributes.length > 0) {
					if (typeof obj[selectedLang][key] !== 'undefined') {
						key = obj[selectedLang][key];
						attributes.forEach( attr => key = key.replace(':attr', attr) );
						return key;
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
			let storageselectedLang = localStorage.getItem(`${storageName}-lang`);
			selectedLang = storageselectedLang == null ? 'en' : storageselectedLang;
			Vue.trans.setLang(selectedLang);
		}
	}

	Vue.directive('trans', {
		bind: Directive(translateObj)
	});
}