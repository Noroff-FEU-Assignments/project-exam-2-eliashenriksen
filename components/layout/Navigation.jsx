import styles from '../../styles/Navigation.module.css'
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/legacy/image';
import intouchlogo from "../../public/intouchlogodark.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function Navigation() {

  const [auth, setAuth, user, setUser] = useContext(AuthContext);
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  function handleMyProfile() {
    router.push(`/profile/${user}`);
  }

  function handleEditProfile() {
    router.push(`/editprofile`);
  }

  function handleLogout() {
    setAuth(null);
    setUser(null);
    router.push("/");
  }

  //The responsive data NAV solution below took a while to figure out because it works differently in NextJS than regular React, i was getting hydration
  //errors by first trying to implement a regular React way of handling authenticated navigation updating because there was a mismatch between what was 
  //rendered on the server and the client, thankfully a good blog online gave me a better insight to the whole problem and how to solve it.

  if (!auth) {
    return(
      <div className={styles.navWholeWrapper}>
        <div className="logoWrapper">
          <Link href="/">
            <Image src={intouchlogo} alt="Intouch logo." layout="responsive"></Image>
          </Link>
        </div>
      </div>
    )
  }

  return(
    <>
      <div className={styles.navWholeWrapper}>
        <div className="logoWrapper">
          <Link href="/home">
            <Image src={intouchlogo} alt="Intouch logo." layout="responsive"></Image>
          </Link>
        </div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={styles.navbar}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.navbarToggler} />
            <Navbar.Collapse id="responsive-navbar-nav">
              {/* <div className="logoWrapper">
                <Link href="/home">
                  <Image src={intouchlogo} alt="Intouch logo." layout="responsive"></Image>
                </Link>
              </div> */}
              <Nav className={`${styles.navbarRightSide}`}>
                <Link href="/home">
                  Feed
                </Link>
                <Link href="/people">
                  People
                </Link>
                <Dropdown className={styles.profileDropdown}>
                  <Dropdown.Toggle id="dropdown-basic" className={styles.profileDropdown}>
                    <i className={`far fa-user ${styles.userIcon}`} aria-label="Profile"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={styles.dropdownMenu}>
                    <Dropdown.Item onClick={handleMyProfile}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleEditProfile}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}