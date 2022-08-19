import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { DELETE_POST } from "../../queries/delete-post";
import { DELETE_COMMENT } from "../../queries/delete-comment";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS } from "../../queries/fetch-posts";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        proxy.updateQuery({ query: FETCH_POSTS }, (data) => ({
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        }));
      }
      if (callback) {
        callback();
      }
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <Popup
        content={commentId ? "Delete comment" : "Delete Post"}
        trigger={
          <Button
            as="div"
            color="red"
            basic
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      ></Popup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;
