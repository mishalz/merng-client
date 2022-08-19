import { gql } from "@apollo/client";
export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
