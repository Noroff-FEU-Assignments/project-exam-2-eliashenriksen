import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/PostBlock.module.css";
import { useState } from "react";
import moment from "moment/moment";
import { cloudinaryImageLoader } from "../../../../constants/remoteimageloader";
// import PostBlockBottom from "./PostBlockBottom";
// import PostBlockCreateComment from "./PostBlockCreateComment";
// import PostBlockComments from "./PostBlockComments";


export default function SinglePostPostBlock({ id, title, author, body, created, media, reactions, tags, updated, comments }) {


  const [avatarImageSrc, setAvatarImageSrc] = useState(author.avatar ? `${cloudinaryImageLoader}${author.avatar}` : "/profileplaceholder.png");
  const [postImageVisibility, setPostImageVisibility] = useState("");
  const [commentsToggled, setCommentsToggled] = useState(false);
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
        {/* <PostBlockBottom reactions={reactions} comments={comments} toggleComments={setCommentsToggled} postId={id}></PostBlockBottom> */}
      </section>
      <hr></hr>
      <section>
        {/* <PostBlockCreateComment postId={id} updateComments={setCommentsUpdated} commentsToggled={commentsToggled} toggleComments={setCommentsToggled} commentUpdateTracker={commentsUpdated}></PostBlockCreateComment> */}
      </section>
      {commentsToggled ? <section className={styles.postBlockCommentSection}>
        <h3 id={`comments${id}`}>Comments</h3>
        {/* <PostBlockComments postId={id} commentsToggled={commentsToggled} commentUpdateTracker={commentsUpdated}></PostBlockComments> */}
      </section> : ""}

    </Container>
  )
}