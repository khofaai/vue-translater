export default function (translateObj) {
	return function (el, binding) {
		const params = binding.rawName.split('.'); 
		let _get_value = (key) => translateObj.get(key);
		if (params.length > 1) {
			const attrs = binding.value;
			if (params[1] == 'attributes') {
				if (typeof attrs === 'object' && Object.keys(attrs).length > 0) {
					Object.keys(attrs).map( attr => {
						let translated = _get_value(attrs[attr].text);
						attrs[attr].values.map(toReplace => {
							translated = translated.replace(':attr', toReplace)
						});
						el.setAttribute(attr,translated);
					});
				} else if (typeof attrs.attributes === 'undefined') {
					el.textContent = _get_value(attrs);
				} else if( attrs.attributes.length == 0) {
					el.textContent = _get_value(attrs.text);
				} else {
					let to_replace = _get_value(attrs.text);
					attrs.attributes.forEach( attr => to_replace = to_replace.replace(':attr', attr) );
					el.textContent = to_replace;
				}
			} else if (params[1] == 'condition') {
				if (attrs.condition){
					el.textContent = _get_value(attrs.text);
				}
			} else {
				let val = _get_value(params[1]);
				if (val != params[1] && val != `[${params[1]}]`) {
					el.textContent = val;
				} else {
					if (typeof attrs === 'object') {
						let keyText = _get_value(attrs[0]);
						if (typeof attrs[1] === 'object') {
							attrs[1].map( attr => {
								keyText = keyText.replace(':attr', attr);
							});
						} else {
							keyText = keyText.replace(':attr', attr);
						}
						el.setAttribute(params[1], keyText)
					} else {
						el.setAttribute(params[1], _get_value(attrs))
					}
				}
			}
		} else {
			el.textContent = _get_value(binding.value);
		}
	}
}