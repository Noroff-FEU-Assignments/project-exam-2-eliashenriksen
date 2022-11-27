import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/PostBlock.module.css";
import { useState } from "react";
import moment from "moment/moment";
import { cloudinaryImageLoader } from "../../../../constants/remoteimageloader";
import PostBlockBottom from "./PostBlockBottom";
import PostBlockCreateComment from "./PostBlockCreateComment";
import PostBlockComments from "./PostBlockComments";


export default function PostBlock({ id, title, author, body, created, media, reactions, tags, updated, comments }) {


  //I use state to handle author avatars, due to the way Next images work, there was a bit of work handling images and making sure any problem that could 
  //appear was handled. If the author image exists, we pre-pend the cloudinary image loader (to be able to fetch images from any URL) to the author image URL,
  //otherwise the author gets the placeholder image. Furthermore, below we also handle the possibility that the image returns an error, fails to load or what have it,
  //(this happens a fair bit due to the way the API is setup, being able to link URL's that dont ACTUALLY work), in that case the author also gets the placeholder image.
  //Regular images that can have the same problem are also handled in this way, except in that case, we just hide the image altogether if it throws errors.
  const [avatarImageSrc, setAvatarImageSrc] = useState(author.avatar ? `${cloudinaryImageLoader}${author.avatar}` : "/profileplaceholder.png");
  const [postImageVisibility, setPostImageVisibility] = useState("");
  const [commentsToggled, setCommentsToggled] = useState(false);
  //The solution below for handling the auto-updating of things is incorporated in several places. Basically the idea is that when something like a comment is posted,
  //a post is created or a reaction is added. We need to update the component to reflect the new changes. The easiest way that i found to do that was to use a state variable
  //and have my useEffect hooks watch that variable for changes. If it detects changes, then it refreshes the component. Changes are simply made to the variable by doing
  //something as simple as taking its current value and adding a +1 to it. The state variable and its setter is defined in a parent component and then its passed
  //down to children compotents through props as needed.
  const [commentsUpdated, setCommentsUpdated] = useState(0);


  return(
    <Container id={id} className={styles.postBlock}>
      <section>
        <div className={styles.postBlockTop}>
          <Link href="/">
            <div className={styles.avatarImageWrapper}>
              <Image src={avatarImageSrc} alt={`${author.name}'s avatar.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setAvatarImageSrc("/profileplaceholder.png")}></Image>
            </div>
          </Link>
          <div className={styles.postBlockTopInfoWrapper}>
            <div className={styles.postBlockTopInfo}>
              <h2>@{author.name}</h2>
              <p>{moment(created).format("DD. MMMM YYYY, h:mm")}</p>
              <div className={styles.postBlockTopInfoTitleWrapper}>
                <Link href={`/post/${id}`}>
                  <p>#{id}</p>
                  <p>| {title}</p>
                </Link>
              </div>
            </div>
            <hr></hr>
          </div>
        </div>
        <div className={styles.postBlockMiddle}>
          <p>{!body ? title : body}</p>
          {media ? <div className={`${styles.postBlockMiddleImageWrapper} ${postImageVisibility}`}>
            <Image src={`${cloudinaryImageLoader}${media}`} alt={`Post ${id} media.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setPostImageVisibility("hidden")}></Image>
          </div> : ""}
        </div>
        <PostBlockBottom reactions={reactions} comments={comments} toggleComments={setCommentsToggled} postId={id}></PostBlockBottom>
      </section>
      <hr></hr>
      <section>
        <PostBlockCreateComment postId={id} updateComments={setCommentsUpdated} commentsToggled={commentsToggled} toggleComments={setCommentsToggled} commentUpdateTracker={commentsUpdated}></PostBlockCreateComment>
      </section>
      {commentsToggled ? <section className={styles.postBlockCommentSection}>
        <h3 id={`comments${id}`}>Comments</h3>
        <PostBlockComments postId={id} commentsToggled={commentsToggled} commentUpdateTracker={commentsUpdated}></PostBlockComments>
      </section> : ""}

    </Container>
  )
}