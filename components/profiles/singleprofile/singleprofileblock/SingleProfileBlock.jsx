import { Container } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/SingleProfileBlock.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import { cloudinaryImageLoader } from "../../../../constants/remoteimageloader";
import { useRouter } from "next/router";
import FollowUnfollowButton from "../../FollowUnfollowButton";
import Link from "next/link";


export default function SingleProfileBlock({ name, email, postcount, followercount, followingcount, avatar, banner, followers, followUpdate, setFollowUpdate }) {


  const [auth, setAuth, user, setUser] = useContext(AuthContext);
  const [avatarImageSrc, setAvatarImageSrc] = useState(avatar ? `${cloudinaryImageLoader}${avatar}` : "/profileplaceholder.png");
  const [bannerImageSrc, setBannerImageSrc] = useState(banner ? `${cloudinaryImageLoader}${banner}` : "/bannerplaceholder.jpg");
  const router = useRouter();

  function moveToEditProfile() {
    router.push("/editprofile");
  }

  return(
    <Container className={styles.profileBlock}>
      <section className={styles.bannerImageHolder}>
        <div className={styles.bannerImageWrapper}>
          <Image src={bannerImageSrc} alt={`${name}'s banner.`} fill onError={() => setBannerImageSrc("/bannerplaceholder.jpg")}></Image>
        </div>
        {name === user ? <i className="fas fa-user-edit" onClick={moveToEditProfile}></i> : ""}
      </section>
      <section className={styles.profileBlockInfoWrapper}>
        <div className={styles.avatarImageWrapper}>
          <Image src={avatarImageSrc} alt={`${name}'s avatar.`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setAvatarImageSrc("/profileplaceholder.jpg")}></Image>
        </div>
        <h1 className={styles.singleProfileBlockH1}>{name}</h1>
        <Link className={styles.singleProfileInfoLinks} href={`/followers/${name}`}>
          <p><b>{followercount}</b> Followers</p>
        </Link>
        <Link className={styles.singleProfileInfoLinks} href={`/following/${name}`}>
          <p><b>{followingcount}</b> Following</p>
        </Link>
        <Link className={styles.singleProfileInfoLinks} href={`#postBy${name}`}>
          <p><b>{postcount}</b> Posts</p>
        </Link>
      </section>
      <section>
        {name === user ? "" : <FollowUnfollowButton profileId={name} followers={followers} followUpdate={followUpdate} setFollowUpdate={setFollowUpdate}></FollowUnfollowButton>}
      </section>
    </Container>
  )
}