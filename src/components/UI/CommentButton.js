import React from "react";
import { Button, Label, Icon, Popup } from "semantic-ui-react";

function CommentButton({ user, post: { id, comments, commentCount } }) {
  return (
    <Popup
      content="Comment on post"
      trigger={
        <Button as="div" labelPosition="right">
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      }
    />
  );
}

export default CommentButton;
