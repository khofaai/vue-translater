# vue-translater

[![npm](https://img.shields.io/npm/v/vue-translater.svg)](https://www.npmjs.com/package/vue-translater) ![license](https://img.shields.io/github/license/khofaai/vue-translater.svg) [![npm](https://img.shields.io/npm/dw/vue-translater.svg)](https://www.npmjs.com/package/vue-translater) [![npm](https://img.shields.io/npm/dt/vue-translater.svg)](https://www.npmjs.com/package/vue-translater) [![Build Status](https://travis-ci.org/khofaai/vue-translater.svg?branch=master)](https://travis-ci.org/khofaai/vue-translater)

### Description 

vuejs package helps you intergate translation with vuejs apps.

### Getting Started

```
npm i vue-translater
```

### Usage

Use `vue-translater` with your `vue` instance :
```javascript
import Vue from 'vue';
import VueTranslater from 'vue-translater';

let options = {
  name: 'storageItemName',
  translate: {
    en: {
      'hello': 'hello',
      'developer': 'developer'
    },
    fr: {
      'hello': 'bonjour',
      'developer': 'développeur'
    },
    es: {
      'hello': 'hola',
      'developer': 'desarrollador'
    }
  }
};

Vue.use(VueTranslater, options /* optional */);
```

Direct access from vue instance
```
this.$trans
```
Or by `v-trans` directive.

you can set your `json` object that contain all `key: value` translation :
```javascript
this.$trans.set(transObject)
```
`transObject` may be like : 
```javascript
{
  langIsoCode1: {
    keyword: "ValueLang1"
  },
  langIsoCode2: {
    keyword: "ValueLang2"
  }
}
```

inside you vue component :
```html
<label v-trans.keyword></label>
```
or
```html
<label v-trans="'keyword'"></label>
```
these example will be converted to ( displayed value is based on active language )
```
<label>ValueLang1</label>
```
inside vue instance :
```javascript
this.$trans.get('keyword')
```

### languages

To active a specific language :
```javascript
this.$trans.setLang(langIsoCode)
```

To get the active language :
```javascript
this.$trans.getLang()
```