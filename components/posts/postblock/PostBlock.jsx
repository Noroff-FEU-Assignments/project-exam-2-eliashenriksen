import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../styles/PostBlock.module.css";
import { useState } from "react";
import moment from "moment/moment";
import { cloudinaryImageLoader } from "../../../constants/remoteimageloader";

export default function PostBlock({id, title, author, body, created, media, reactions, tags, updated, comments}) {


  const [avatarImageSrc, setAvatarImageSrc] = useState(author.avatar ? `${cloudinaryImageLoader}${author.avatar}` : "/profileplaceholder.png");
  const [postImageVisibility, setPostImageVisibility] = useState("");


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
              <p>{moment(created).format("DD. MMMM YYYY")}</p>
            </div>
            <hr></hr>
          </div>
        </div>
        <div className={styles.postBlockMiddle}>
          <p>{body ? body : ""}</p>
          {media ? <div className={`${styles.postBlockMiddleImageWrapper} ${postImageVisibility}`}>
            <Image src={`${cloudinaryImageLoader}${media}`} alt={`Post ${id} media.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setPostImageVisibility("hidden")}></Image>
          </div> : ""}
        </div>
      </section>
      <section>

      </section>
      <section>
        {/* {comments} */}
      </section>

    </Container>
  )
}