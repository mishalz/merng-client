import React from "react";
import { Button, Form } from "semantic-ui-react";
import useForm from "../../hooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS } from "../../queries/fetch-posts";
import classes from "./PostForm.module.css";

function PostForm() {
  const { inputs, setInputs, onChangeHandler, onSubmitHandler } = useForm(
    { body: "" },
    createPostCallBack
  );
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: inputs,
    update(proxy, result) {
      proxy.updateQuery({ query: FETCH_POSTS }, (data) => ({
        getPosts: [result.data.createPost, ...data.getPosts],
      }));
      setInputs({ body: "" });
    },
  });
  function createPostCallBack() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmitHandler}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World"
          name="body"
          onChange={onChangeHandler}
          value={inputs.body}
          error={error ? true : false}
        />
        {error && <p className={classes["error-message"]}>{error.message}</p>}
        <Button type="submit" color="teal" style={{ marginBottom: 15 }}>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;
export default PostForm;
