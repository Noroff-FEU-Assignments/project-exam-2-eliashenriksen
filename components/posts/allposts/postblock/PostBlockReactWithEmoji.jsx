import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "../../../../styles/PostBlockReactWithEmoji.module.css";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useAxios from "../../../../hooks/useAxios";

export default function PostBlockReactWithEmoji({ postId, reactionUpdateTracker, updateReactions }) {

  const api = useAxios();

  async function sendEmoji(event) {

    if (event.native) {
      try {
        const response = await api.put(`/api/v1/social/posts/${postId}/react/${event.native}`);
        updateReactions(reactionUpdateTracker + 1);

      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      key="top"
      placement="top"
      overlay={
        <Popover id={`popover-positioned-top`} className={styles.emojiPopover}>
          <div className={styles.emojiPicker}>
            <Picker perLine={7} data={data} onEmojiSelect={sendEmoji} maxFrequentRows={0}/>
          </div>
        </Popover>
      }
    >
      <Button variant="secondary"><i className="far fa-smile"></i></Button>
    </OverlayTrigger>
  );

}
