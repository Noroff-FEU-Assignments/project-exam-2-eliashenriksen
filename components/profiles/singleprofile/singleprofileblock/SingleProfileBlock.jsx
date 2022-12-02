import Link from "next/link";
import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/SingleProfileBlock.module.css";
import { useState } from "react";
import { cloudinaryImageLoader } from "../../../../constants/remoteimageloader";


export default function SingleProfileBlock({ name, email, postcount, followercount, followingcount, avatar, banner }) {


  const [avatarImageSrc, setAvatarImageSrc] = useState(avatar ? `${cloudinaryImageLoader}${avatar}` : "/profileplaceholder.png");
  const [bannerImageSrc, setBannerImageSrc] = useState(banner ? `${cloudinaryImageLoader}${banner}` : "/bannerplaceholder.jpg");

  return(
    <Container className={styles.profileBlock}>
      <section className={styles.bannerImageHolder}>
        <div className={styles.bannerImageWrapper}>
          <Image src={bannerImageSrc} alt={`${name}'s banner.`} fill onError={() => setBannerImageSrc("/bannerplaceholder.jpg")}></Image>
        </div>
      </section>
      <section className={styles.profileBlockInfoWrapper}>
        <div className={styles.avatarImageWrapper}>
          <Image src={avatarImageSrc} alt={`${name}'s avatar.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setAvatarImageSrc("/profileplaceholder.jpg")}></Image>
        </div>
        <h1>{name}</h1>
        <p>{followercount} Followers</p>
        <p>{followingcount} Following</p>
        <p>{postcount} Posts</p>
      </section>
      <section>
        <button>Follow</button>
      </section>
    </Container>
  )
}