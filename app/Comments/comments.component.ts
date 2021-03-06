import {Component, Input, Output, ViewEncapsulation, ViewChild, EventEmitter, OnInit} from '@angular/core';
import {Editor} from '../ui/editor/editor'
import {AuthService} from '../Shared/Services/auth.service'
import * as moment from "moment"

@Component({
  moduleId: module.id,
  selector: 'gg-comments',
  host: {
    'class': 'comments'
  },
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  @Input() comments;
  @Output() commentsUpdated = new EventEmitter();
  // We are using an editor for adding new comments and control it directly using a reference
  @ViewChild(Editor) newCommentEditor;

  
  constructor(private authService: AuthService) {
  }

  ngOnInit():void{
    if (!this.comments)
    {
      this.comments= [];
    }
  }

  onChanges(changes) {
    if (changes.comments && changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  addNewComment() {
    this.authService.getCurrentUserObjectForComment().first().subscribe(userrecord =>
    {
      var md = moment()
      const comments = this.comments.slice();
      comments.splice(0, 0, {
        user: userrecord,
        time: md.format('DD/MM/YYYY hh:mm:ss'),
        content: this.newCommentEditor.getEditableContent()
      });
      this.commentsUpdated.next(comments);
      this.newCommentEditor.setEditableContent('');
    });
  }

  onCommentEdited(comment, content) {
    const comments = this.comments.slice();
    if (content.length === 0) {
      comments.splice(comments.indexOf(comment), 1);
    } else {
      comments.splice(comments.indexOf(comment), 1, {
        user: comment.user,
        time: comment.time,
        content
      });
    }
    this.commentsUpdated.next(comments);
  }
}
