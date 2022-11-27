import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";

export default function PostBlockBottomReactions({ postId, reactionUpdateTracker, reactionsOnLoad }) {

  const [reactions, setReactions] = useState(reactionsOnLoad);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    async function getReactions() {
      try {
        const firstCall = await api.get(`/api/v1/social/posts/${postId}?_reactions=true`);
        console.log("api reaction data >", firstCall.data);
        setReactions(firstCall.data.reactions);
        console.log(reactions);

      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
    }

    if (reactionUpdateTracker > 0) {
      getReactions();
    }

  }, [reactionUpdateTracker]);


  if (error) {
    console.log(error);
    return(
      <div>
        <p>An error has occured while loading the reactions! {error}</p>
      </div>
    )
  }

  return(
    <Container>
      {/* {reactionsOnLoad.map((reaction) => {
        return(
          <div key={reaction.symbol}>
            <p>{reaction.symbol}</p>
            <p>{reaction.count}</p>
          </div>
        )
      })} */}

      {/* {reactions ? reactions.map((reaction) => {
          return(
            <div key={reaction.symbol}>
              <p>{reaction.symbol}</p>
              <p>{reaction.count}</p>
            </div>
          )
        }) : ""} */}

        {reactions.map((reaction) => {
          return(
            <div key={reaction.symbol}>
              <p>{reaction.symbol}</p>
              <p>{reaction.count}</p>
            </div>
          )
        })}
    </Container>
  )
}