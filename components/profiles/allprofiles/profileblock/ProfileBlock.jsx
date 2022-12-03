import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/ProfileBlock.module.css";
import { useState } from "react";
import { cloudinaryImageLoader } from "../../../../constants/remoteimageloader";


export default function ProfileBlock({ name, email, postcount, followercount, followingcount, avatar, banner }) {


  const [avatarImageSrc, setAvatarImageSrc] = useState(avatar ? `${cloudinaryImageLoader}${avatar}` : "/profileplaceholder.png");

  return(
    <Container className={styles.profileBlock}>
      <section className={styles.profileBlockLeft}>
        <div className={styles.profileBlockImageHolder}>
          <Link href={`/profile/${name}`}>
            <div className={styles.avatarImageWrapper}>
              <Image src={avatarImageSrc} alt={`${name}'s avatar.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setAvatarImageSrc("/profileplaceholder.png")}></Image>
            </div>
          </Link>
        </div>
        <div className={styles.profileBlockInfo}>
          <Link href={`/profile/${name}`}>
            <h2>@{name}</h2>
          </Link>
          <p>{followercount} Followers</p>
          <p>{followingcount} Following</p>
          <p>{postcount} Posts</p>
        </div>
      </section>
    </Container>
  )
}