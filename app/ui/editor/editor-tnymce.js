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
var EditorTinyMce = (function () {
    function EditorTinyMce() {
        this.editMode = false;
        this.editSaved = new core_1.EventEmitter();
    }
    EditorTinyMce.prototype.ngOnInit = function () {
        this.contentEdited = this.content;
    };
    EditorTinyMce.prototype.ngOnChanges = function (changes) {
        if (changes.content) {
            this.contentEdited = changes.content.currentValue;
        }
    };
    EditorTinyMce.prototype.save = function () {
        this.content = this.contentEdited;
        this.editSaved.next(this.content);
        this.editMode = false;
    };
    EditorTinyMce.prototype.cancel = function () {
        this.contentEdited = this.content;
        this.editMode = false;
    };
    EditorTinyMce.prototype.edit = function () {
        this.editMode = true;
    };
    EditorTinyMce.prototype.tinymceChanged = function (content) {
        this.contentEdited = content;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditorTinyMce.prototype, "content", void 0);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('class.editor--edit-mode'), 
        __metadata('design:type', Object)
    ], EditorTinyMce.prototype, "editMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditorTinyMce.prototype, "editSaved", void 0);
    EditorTinyMce = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gg-editor-tinymce',
            host: {
                'class': 'editor'
            },
            templateUrl: './editor-tnymce.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], EditorTinyMce);
    return EditorTinyMce;
}());
exports.EditorTinyMce = EditorTinyMce;
//# sourceMappingURL=editor-tnymce.js.map