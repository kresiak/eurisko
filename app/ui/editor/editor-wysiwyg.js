"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SimpleTinyComponent = (function () {
    function SimpleTinyComponent() {
        this.content = '';
        this.onEditorKeyup = new core_1.EventEmitter();
    }
    SimpleTinyComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table'],
            skin_url: 'assets/skins/lightgray',
            setup: function (editor) {
                _this.editor = editor;
                editor.on('keyup', function () {
                    var content = editor.getContent();
                    _this.onEditorKeyup.emit(content);
                });
            },
        });
    };
    SimpleTinyComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    SimpleTinyComponent.prototype.resetContent = function () {
        this.content = '';
        tinymce.get(this.elementId).setContent('');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleTinyComponent.prototype, "elementId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleTinyComponent.prototype, "content", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SimpleTinyComponent.prototype, "onEditorKeyup", void 0);
    SimpleTinyComponent = __decorate([
        core_1.Component({
            selector: 'simple-tiny',
            template: "<textarea id=\"{{elementId}}\">{{content}}</textarea>"
        }), 
        __metadata('design:paramtypes', [])
    ], SimpleTinyComponent);
    return SimpleTinyComponent;
}());
exports.SimpleTinyComponent = SimpleTinyComponent;
//# sourceMappingURL=editor-wysiwyg.js.map