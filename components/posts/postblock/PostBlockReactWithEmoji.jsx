import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "../../../styles/PostBlockReactWithEmoji.module.css";

export default function PostBlockReactWithEmoji() {
  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      key="top"
      placement="top"
      overlay={
        <Popover id={`popover-positioned-top`} className={styles.emojiPopover}>
          <Popover.Header as="h3">{`Popover top`}</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="secondary"><i className="far fa-smile"></i></Button>
    </OverlayTrigger>
  );
}
