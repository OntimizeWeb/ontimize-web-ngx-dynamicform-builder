## 3.0.0-rc.1 (2018-07-02)
### Bug Fixes
* **ontimize-web-ngx**: fixing bugs for updating to '*ontimize-web-ngx@3.0.0-rc.1*' and '*ontimize-web-ngx-dynamicform@3.0.0-rc.1*'

## 2.0.2

### Features
* **o-dynamic-form-builder:** adding '*automatic-registering*' input.

### PEER-DEPENDENCY UPDATES ###
* **Updated**:   ontimize-web-ngx-dynamicform@2.0.2
* **Updated**:   ontimize-web-ngx@2.1.0-rc.3
* **Updated**:   ontimize-web-ngx-datatable@1.0.6

### Features
* **o-dynamic-form-builder:** new '*automatic-registering*' input for specifying that a component will not be not registered on its parent form ([eb62c17](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/eb62c17))
* **o-dynamic-form-builder:**: implementing '*IFormControlComponent*' methods ([eb62c17](https://github.com/OntimizeWeb/ontimize-web-ngx/commit/eb62c17))

## 2.0.1 (2017-10-05)
### Bug Fixes
* **templates**: updating components templates for adapting to AoT requirements.
* **o-date-input**: fixing '*o-date-input*' build bugs ([#14](https://github.com/OntimizeWeb/ontimize-web-ng2-dynamicform-builder/issues/14)) ([cdaa0b0](https://github.com/OntimizeWeb/ontimize-web-ng2-dynamicform-builder/commit/cdaa0b0))

## 2.0.0 (2017-09-29)
### BREAKING CHANGES
* **DynamicFormBuilderModule**: '*ontimize-web-ng2-dynamicform-builder*' is now called '*ontimize-web-ngx-dynamicform-builder*'.

### Features
* **ontimize-web-ngx-dynamicform-builder**: '*DynamicFormBuilderModule*' is now AoT compatible.

### PEER-DEPENDENCY UPDATES ###
* **Added**:   core-js@^2.4.1
* **Added**:   lodash@^4.17.4
* **Added**:   rxjs@^5.4.2
* **Added**:   zone.js@^0.8.12

### Features
* **styles**: exporting '*o-dynamic-form-builder-theme*'.

## 0.0.3 (2017-03-31)

### PEER-DEPENDENCY UPDATES ###
* **Updated**: ontimize-web-ng2@1.2.2
* **Updated**: ontimize-web-ng2-dynamicform@0.0.4

## 0.0.2 (2017-03-29)

### Features
* **Components menu**: disabling drag and drop when builder is not in edition mode.
* **o-dynamic-form-builder**: disabling dragging when builder is not in edition mode.
* **o-dynamic-form-builder**: adding '*definitionToString*' method.
* **o-dynamic-form-builder**: adding '*render*' output.
* **o-dynamic-form-builder**: adding '*attr*' and '*automatic-binding*' inputs.
* **o-dynamic-form-builder**: implementing ontimize-web-ng2 '*IComponent*', '*IFormDataTypeComponent*' and '*IFormDataComponent*' interfaces.

### PEER-DEPENDENCY UPDATES ###
* **Updated**: ontimize-web-ng2@1.2.1
* **Updated**: ontimize-web-ng2-dynamicform@0.0.3

### BREAKING CHANGES

### Bug Fixes
* **styles**: fixing '*o-dynamic-form-builder*' styles ([#4](https://github.com/OntimizeWeb/ontimize-web-ng2-dynamicform-builder/issues/4)) ([e90518f](https://github.com/OntimizeWeb/ontimize-web-ng2-dynamicform-builder/commit/e90518f))
* **o-dynamic-form-builder**: edition mode bugs fixed ([#1](https://github.com/OntimizeWeb/ontimize-web-ng2/issues/1)) ([0ea691e](https://github.com/OntimizeWeb/ontimize-web-ng2/commit/0ea691e))
