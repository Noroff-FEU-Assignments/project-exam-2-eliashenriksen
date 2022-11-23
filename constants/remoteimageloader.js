  //Due to the fact that NextJS does not allow you to refference img src domains that you do not specifically list in the nextconfig (due to security reasons),
  //I need to use a remote loader to fetch the images for me so, so I can whitelist a single domain name which is res.cloudinary.com in the next.config.js
  //A nice side effect of this is much faster and optimized image load times coming from cloudinary.

export const cloudinaryImageLoader = "https://res.cloudinary.com/dydyjwfwj/image/fetch/";